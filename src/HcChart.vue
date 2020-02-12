<template>
  <div class="hc-chart" :id="DomId">
    <svg class="hc-svg" :style="style" :id="SvgId">
      <g :transform="transform">
        <slot />
      </g>
    </svg>
    <slot name="HcFilter">
      <hc-dummy-filter />
    </slot>
    <slot name="HcLegend"></slot>
    <slot name="HcTooltip"></slot>
  </div>
</template>

<script>
import computeScales from "./lib/scales";
import HcDummyFilter from "./components/addons/dummy/HcDummyFilter";
export default {
  name: "HcChart",
  components: {
    HcDummyFilter
  },
  provide() {
    Object.defineProperties(this.chart, {
      unfiltredData: {
        enumerable: true,
        get: () => this.unfiltredData,
        set: data => {
          this.unfiltredData = this.pipeline(data);
        }
      },
      data: {
        enumerable: true,
        get: () => this.Data,
        set: data => {
          this.Data = data;
        }
      },
      animation: {
        enumerable: true,
        get: () => this.animation
      },
      scales: {
        enumerable: true,
        get: () =>
          computeScales(
            this.scales,
            this.chart.data,
            this.chart.width,
            this.chart.height
          )
      },
      offset: {
        enumerable: true,
        get: () => this.offset
      },
      colors: {
        enumerable: true,
        get: () => this.colors
      },
      width: {
        enumerable: true,
        get: () =>
          (this.width || this.available.width || 960) -
          this.chart.offset.left -
          this.chart.offset.right
      },
      height: {
        enumerable: true,
        get: () =>
          (this.height || this.available.height || 540) -
          this.chart.offset.top -
          this.chart.offset.bottom
      },
      tooltip: {
        enumerable: true,
        get: () => this.tooltip,
        set: tooltip => {
          this.tooltip = tooltip;
        }
      }
    });
    return { chart: this.chart };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    animation: {
      type: Object,
      default() {
        return {
          easing: "Linear",
          duration: 1000,
          delay: 0
        };
      }
    },
    scales: {
      type: Object,
      default() {
        return {};
      }
    },
    offset: {
      type: Object,
      default() {
        return { top: 0, left: 0, bottom: 0, right: 0 };
      }
    },
    colors: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    domId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      chart: {},
      unfiltredData: [],
      Data: [],
      tooltip: null,
      available: {
        width: 960,
        height: 540
      },
      DomId: `chart-${this.domId || this._uid}`,
      SvgId: `chart-svg-${this.domId || this._uid}`
    };
  },
  created() {
    this.chart.unfiltredData = this.pipeline(this.data);
  },
  mounted() {
    if (!this.width || !this.height) {
      this.resize();
      window.addEventListener("resize", this.resize);
    }
  },
  watch: {
    data(newData) {
      this.chart.unfiltredData = newData;
    },
    colors() {
      this.unfiltredData = this.pipeline(this.data, true);
    }
  },
  methods: {
    resize() {
      this.available.width = this.$el.offsetWidth;
      this.available.height = this.$el.offsetHeight - 4; // must cosider border and stuff
    },
    pipeline(data, force = false) {
      return data.map((d, index) => {
        d.color =
          (!force && d.color) ||
          (this.chart.colors.length &&
            this.chart.colors[index % this.chart.colors.length]) ||
          "#1f77b4";
        d.id = d.id || index.toString();
        return d;
      });
    }
  },
  computed: {
    style() {
      return {
        height: `${this.height || this.available.height}px`,
        width: `${this.width || this.available.width}px`
      };
    },
    transform() {
      return `translate(${this.chart.offset.left}, ${this.chart.offset.top})`;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style scoped>
.hc-svg {
  width: 100%;
  height: 100%;
}
</style>
