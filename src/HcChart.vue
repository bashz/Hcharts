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
export default {
  name: "HcChart",
  provide() {
    Object.defineProperties(this.chart, {
      data: {
        enumerable: true,
        get: () => this.data
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
      width: {
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
        return {};
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
      available: {
        width: 960,
        height: 540
      },
      DomId: `chart-${this.domId || this._uid}`,
      SvgId: `chart-svg-${this.domId || this._uid}`
    };
  },
  mounted() {
    if (!this.width || !this.height) {
      this.resize();
      window.addEventListener("resize", this.resize);
    }
  },
  methods: {
    resize() {
      this.available.width = this.$el.offsetWidth;
      this.available.height = this.$el.offsetHeight - 4; // must cosider border and stuff
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
