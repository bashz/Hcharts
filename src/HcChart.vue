<template>
  <div class="hc-chart" :id="DomId">
    <svg class="hc-svg" ref="chart" :style="style" :id="SvgId">
      <slot />
    </svg>
  </div>
</template>

<script>
import computeScales from './lib/scales'
console.log(computeScales)
export default {
  name: "HcChart",
  provide() {
    const chart = {
      data: [],
      animation: {},
      scales: {},
      offsets: {top: 0, left: 0, bottom: 0, right: 0},
      width: 0,
      height: 0
    };
    Object.defineProperty(chart, "data", {
      enumerable: true,
      get: () => this.Data
    });
    Object.defineProperty(chart, "animation", {
      enumerable: true,
      get: () => this.Animation
    });
    Object.defineProperty(chart, "scales", {
      enumerable: true,
      get: () => this.Scales
    });
    Object.defineProperty(chart, "width", {
      enumerable: true,
      get: () => this.Width
    });
    Object.defineProperty(chart, "height", {
      enumerable: true,
      get: () => this.Height
    });
    return { chart };
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
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    processData: {
      type: Function,
      default: data => data
    },
    domId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      Data: this.processData(this.data),
      Animation: this.animation,
      Width: Number(this.width) || 960,
      Height: Number(this.height) || 540,
      Scales: {},
      DomId: `chart-${this.domId || this._uid}`,
      SvgId: `chart-svg-${this.domId || this._uid}`
    };
  },
  mounted() {
    if (!this.width || !this.height) {
      this.resize();
      window.addEventListener("resize", this.resize);
    }
    this.Scales = computeScales(this.scales, this.Data, this.Width, this.Height)
  },
  watch: {
    data(newData) {
      this.Data = this.processData(newData)
    }
  },
  methods: {
    resize() {
      if (!this.width) {
        this.Width = this.$el.offsetWidth;
      }
      if (!this.height) {
        this.Height = this.$el.offsetHeight - 4; // must cosider border and stuff
      }
      this.Scales = computeScales(this.scales, this.Data, this.Width, this.Height)
    }
  },
  computed: {
    style() {
      return { height: `${this.Height}px`, width: `${this.Width}px` };
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
