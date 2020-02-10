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
import animation from "../../lib/animation";
import chartOverwrites from "../../lib/mixins/chartOverwrites"
export default {
  name: "HcBar",
  mixins: [chartOverwrites],
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
  methods: {

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
