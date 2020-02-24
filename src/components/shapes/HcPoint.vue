<template>
  <circle
    class="hc-point"
    :stroke="animated.color"
    :fill="animated.color"
    :r="r"
    :cx="animated.x"
    :cy="animated.y"
    @mousemove="tooltipOn"
    @mouseout="tooltipOff"
  />
</template>

<script>
import animation from "./../../lib/animation";
export default {
  name: "HcPoint",
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0,
          color: "#1f77b4",
          label: "",
          value: 0
        };
      }
    },
    r: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      animated: {
        x: 0,
        y: 0,
        color: "#1f77b4",
        label: "",
        value: 0
      },
      cancelAnimation: null
    };
  },
  methods: {
    tooltipOn(event) {
      this.chart.tooltip = {
        x: event.clientX,
        y: event.clientY,
        content: `${this.animated.label}: <b>${this.animated.value}</b>`
      };
    },
    tooltipOff() {
      this.chart.tooltip = null;
    }
  },
  mounted() {
    this.cancelAnimation = animation(
      this.animated,
      this.value,
      this.chart.animation,
      v => (this.animated = v)
    );
  },
  watch: {
    value(newVal) {
      this.cancelAnimation && this.cancelAnimation();
      this.cancelAnimation = animation(
        this.animated,
        newVal,
        this.chart.animation,
        v => (this.animated = v)
      );
    }
  }
};
</script>

<style scoped>
.hc-point {
  stroke-width: 1;
}
</style>