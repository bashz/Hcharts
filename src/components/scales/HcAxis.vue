<template>
  <g class="hc-axis" :text-anchor="textAnchor" :transform="transform">
    <path class="hc-axis-path" :d="drawPath(axis.path)"></path>
    <g
      v-for="(tick, index) in axis.ticks"
      :key="index"
      class="hc-axis-tick"
      :transform="transformTick(tick.transform)"
    >
      <line class="hc-axis-tick-line" :x2="getTick(tick.line.x2)" :y2="getTick(tick.line.y2)" />
      <text
        class="hc-axis-tick-text"
        :x="tick.text.x"
        :y="tick.text.y"
        :dy="tick.text.dy + 'em'"
      >{{tick.text.text.replace(/(\.\d{1}).*$/, (a, c) => c)}}</text>
    </g>
  </g>
</template>

<script>
import { axis } from "d3-axis-norender";
import animation from "./../../lib/animation";
export default {
  name: "HcAxis",
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  props: {
    position: {
      type: String,
      default: "left"
    },
    scale: {
      type: String,
      required: true
    },
    tickLength: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      axis: {
        path: "",
        ticks: [],
        x: 0,
        y: 0
      },
      positions: {
        top: 1,
        right: 2,
        bottom: 3,
        left: 4
      },
      textAnchors: ["middle", "start", "middle", "end"],
      cancelAnimation: null
    };
  },
  methods: {
    transformTick(tick) {
      return `translate(${tick.x}, ${tick.y})`;
    },
    getTick(tick) {
      return tick * this.tickLength || 0;
    },
    drawPath(path) {
      if (this.position === "top" || this.position === "bottom") {
        return `M${path.range0},${path.tick}V${-path.tick}V-0.5H${
          path.range1
        }V${path.tick}V${-path.tick}`;
      }
      return `M${-path.tick},${path.range0}H${path.tick}H-0.5V${
        path.range1
      }H${-path.tick},${path.tick}`;
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.chart.scales[this.scale]) {
        const ax = axis(
          this.positions[this.position] || 3,
          this.chart.scales[this.scale]
        )();
        ax.x = (this.position === "right" && this.chart.width) || 0;
        ax.y = (this.position === "bottom" && this.chart.height) || 0;
        this.axis = ax;
      }
    });
  },
  watch: {
    "chart.scales"() {
      if (this.chart.scales[this.scale]) {
        this.cancelAnimation && this.cancelAnimation();
        const ax = axis(
          this.positions[this.position] || 3,
          this.chart.scales[this.scale]
        )();
        ax.x = (this.position === "right" && this.chart.width) || 0;
        ax.y = (this.position === "bottom" && this.chart.height) || 0;
        this.cancelAnimation = animation(
          this.axis,
          ax,
          this.chart.animation,
          v => (this.axis = v)
        );
      }
    },
    scales() {
      if (this.chart.scales[this.scale]) {
        this.cancelAnimation && this.cancelAnimation();
        const ax = axis(
          this.positions[this.position] || 3,
          this.chart.scales[this.scale]
        )();
        ax.x = (this.position === "right" && this.chart.width) || 0;
        ax.y = (this.position === "bottom" && this.chart.height) || 0;
        this.cancelAnimation = animation(
          this.axis,
          ax,
          this.chart.animation,
          v => (this.axis = v)
        );
      }
    },
    position() {
      if (this.chart.scales[this.scale] && this.cancelAnimation) {
        this.cancelAnimation && this.cancelAnimation();
        const ax = axis(
          this.positions[this.position] || 3,
          this.chart.scales[this.scale]
        )();
        ax.x = (this.position === "right" && this.chart.width) || 0;
        ax.y = (this.position === "bottom" && this.chart.height) || 0;
        this.cancelAnimation = animation(
          this.axis,
          ax,
          this.chart.animation,
          v => (this.axis = v)
        );
      }
    }
  },
  computed: {
    textAnchor() {
      return this.textAnchors[this.positions[this.position] - 1];
    },
    transform() {
      return `translate(${this.axis.x}, ${this.axis.y})`;
    }
  }
};
</script>

<style>
.hc-axis {
  fill: none;
  stroke: #000;
}
.hc-axis-tick-text {
  stroke: none;
  fill: #000;
}
</style>
