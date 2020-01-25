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
      >{{tick.text.text}}</text>
    </g>
  </g>
</template>

<script>
import { axis } from "d3-axis-norender";
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
      positions: {
        top: 1,
        right: 2,
        bottom: 3,
        left: 4
      },
      textAnchors: ['middle', 'start', 'middle', 'end']
    };
  },
  methods: {
    transformTick(tick) {
      return `translate(${tick.x}, ${tick.y})`;
    },
    getTick(tick) {
      return tick * this.tickLength || 0
    },
    drawPath(path) {
      if (this.position === "top" || this.position === "bottom") {
        return `M${path.range0},${path.tick}V${-path.tick}V-0.5H${path.range1}V${path.tick}V${-path.tick}`
      }
      return `M${-path.tick},${path.range0}H${path.tick}H-0.5V${path.range1}H${-path.tick},${path.tick}`
    }
  },
  computed: {
    axis() {
      if (this.chart.scales[this.scale]) {
        return axis(
          this.positions[this.position] || 3,
          this.chart.scales[this.scale]
        )();
      }
      return { path: "", ticks: [] };
    },
    textAnchor() {
      return this.textAnchors[this.positions[this.position] - 1]
    },
    transform() {
      const x = this.position === "right" ? this.chart.width : 0;
      const y = this.position === "bottom" ? this.chart.height : 0;
      return `translate(${x}, ${y})`;
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
