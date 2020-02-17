<template>
  <path class="hc-line" :d="d" />
</template>

<script>
import animation from "./../../lib/animation";
import { line } from "d3-shape"
export default {
  name: "HcLine",
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      d: "",
      cancelAnimation: null
    };
  },
  mounted() {
    this.cancelAnimation = animation(
      this.d,
      line()(this.value.map(d => ([d.x, d.y]))),
      this.chart.animation,
      v => (this.d = v)
    );
  },
  watch: {
    value(newVal) {
      this.cancelAnimation && this.cancelAnimation();
      this.cancelAnimation = animation(
        this.d,
        line()(newVal.map(d => ([d.x, d.y]))),
        this.chart.animation,
        v => (this.d = v)
      );
    }
  }
};
</script>

<style>
.hc-line {
  fill: none;
  stroke: #000000;
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>