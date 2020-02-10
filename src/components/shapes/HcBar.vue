<template>
  <rect
    :fill="animated.color"
    :x="animated.x"
    :width="animated.width"
    :y="animated.y"
    :height="animated.height"
    @mousemove="tooltipOn"
    @mouseout="tooltipOff"
  ></rect>
</template>

<script>
import mixins from "../../lib/mixins"
import animation from "../../lib/animation";

export default {
  name: "HcBar",
  mixins: [mixins],
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
        return { x: 0, y: 0, width: 0, height: 0, color: "#1f77b4", label: '', value: 0 };
      }
    }
  },
  isLeaf: true,
  canOverwrite: false,
  hasTooltip: true,
  data() {
    return {
      animated: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        color: "#1f77b4",
        label: '',
        value: 0
      },
      cancelAnimation: null
    };
  },
  mounted() {
    this.cancelAnimation = animation(
      this.animated,
      this.value,
      this.animation,
      v => (this.animated = v)
    );
  },
  watch: {
    value(newVal) {
      this.cancelAnimation && this.cancelAnimation();
      this.cancelAnimation = animation(
        this.animated,
        newVal,
        this.animation,
        v => (this.animated = v)
      );
    }
  }
};
</script>

<style>
</style>
