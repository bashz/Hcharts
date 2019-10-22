<template>
  <g class="hc-axis" text-anchor="middle" :transform="transform">
    <path class="hc-axis-path" :d="drawPath(axis.path)"></path>
    <g
      v-for="(tick, index) in axis.ticks"
      :key="index"
      class="hc-axis-tick"
      :transform="transformTick(tick.transform)"
    >
      <line
        class="hc-axis-tick-line"
        :x2="tick.line.x2"
        y2="-7"
      />
      <text
        class="hc-axis-tick-text"
        :x="tick.text.x"
        :y="tick.text.y"
        :dy="tick.text.dy"
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
      default() {
        return {
          data: [],
          animation: {},
          scales: {},
          width: 0,
          height: 0
        };
      }
    }
  },
  props: {
    direction: {
      type: String,
      default: "left"
    },
    scale: {
      type: String,
      required: true
    },
    offset: {
      type: Object,
      default() {
        return {
          top: 30,
          right: 370,
          bottom: 370,
          left: 30
        };
      }
    }
  },
  data() {
    return {
      directions: {
        top: 1,
        right: 2,
        bottom: 3,
        left: 4
      }
    };
  },
  methods: {
    transformTick(tick) {
      return `translate(${tick.x}, ${tick.y})`;
    },
    drawPath(path) {
      return (
        "M" +
        path.tick +
        "," +
        (path.range0 - this.offset.left + 18) +
        "V" +
        -path.tick +
        "V-0.5H" +
        (path.range1 + this.offset.right - 18) +
        "V" +
        path.tick +
        "V" +
        -path.tick
      );
    }
  },
  computed: {
    // Scale() {
    //   return this.chart.scales[this.scale];
    // },
    axis() {
      if (this.chart.scales[this.scale]) {
        return axis(this.directions[this.direction] || 3, this.chart.scales[this.scale])();
      }
      return {path: '', ticks: []}
      // .ticks(this.chart.data.length)
      // .tickFormat(d => d.name)();
    },
    transform() {
      const x =
        this.direction === "right" ? this.offset.right : this.offset.left;
      const y =
        this.direction === "bottom" ? this.offset.bottom : this.offset.top;
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
