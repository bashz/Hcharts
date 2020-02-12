<template>
  <div class="hc-chart" :id="DomId">
    <svg class="hc-svg" :style="style" :id="SvgId">
      <g :transform="transform">
        <slot />
      </g>
    </svg>
  </div>
</template>

<script>
import computeScales from "./lib/scales";
import bus from "./lib/bus"
export default {
  name: "HcChart",
  provide() {
    Object.defineProperties(this.chart, {
      data: {
        enumerable: true,
        get: () => this.Data,
        set: (data) => {
          bus.$emit('original-data', this.pipeline(data))
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
        set: (tooltip) => { tooltip && bus.$emit('tooltip-show', tooltip) || bus.$emit('tooltip-hide')}
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
  mounted() {
    this.chart.data = this.data
    if (!this.width || !this.height) {
      this.resize();
      window.addEventListener("resize", this.resize);
    }
  },
  watch: {
    data(newData) {
      this.chart.data = newData
    },
    colors() {
      bus.$emit('original-data', this.pipeline(this.data, true))
    }
  },
  methods: {
    resize() {
      this.available.width = this.$el.offsetWidth;
      this.available.height = this.$el.offsetHeight - 4; // must cosider border and stuff
    },
    pipeline(data, force = false) {
      return data.map((d, index) => {
        d.color = (!force && d.color) || this.chart.colors.length && this.chart.colors[index % this.chart.colors.length] || "#1f77b4"
        d.id = d.id || index.toString()
        return d
      })
    },
    setData(data) {
      this.Data = data
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
  created() {
    bus.$on("filtered-data", this.setData);
  },
  destroyed() {
    bus.$off("filtered-data", this.setData);
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
