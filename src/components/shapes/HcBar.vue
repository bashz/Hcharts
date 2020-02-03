<template>
  <rect
    :fill="animated.color"
    :x="animated.x"
    :width="animated.width"
    :y="animated.y"
    :height="animated.height"
  ></rect>
</template>

<script>
import animation from "./../../lib/animation";
export default {
  name: "HcBar",
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
        return { x: 0, y: 0, width: 0, height: 0, color: "#999" };
      }
    }
  },
  data() {
    return {
      animated: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        color: "#999"
      },
      cancelAnimation: null
    };
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

<style>
</style>
