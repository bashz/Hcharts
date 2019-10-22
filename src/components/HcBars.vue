<template>
  <g>
    <hc-bar v-for="value in output" :key="value.id" :value="value" />
  </g>
</template>

<script>
import HcBar from "./shapes/HcBar";
export default {
  name: "Bars",
  components: {
    HcBar
  },
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
    x: {
      type: String,
      required: true
    },
    y: {
      type: String,
      required: true
    },
    orientation: {
      type: String,
      default: "vertical"
    }
  },
  data() {
    return {
      X: this.chart.scales[this.x],
      Y: this.chart.scales[this.y]
    };
  },
  watch: {
    x() {
      this.X = this.chart.scales[this.x];
    },
    y() {
      this.Y = this.chart.scales[this.y];
    },
    "chart.scales"() {
      this.X = this.chart.scales[this.x];
      this.Y = this.chart.scales[this.y];
    }
  },
  computed: {
    output() {
      if (!this.X || !this.Y) {
        return [];
      }
      return this.chart.data.map((d, index) => {
        const y = this.Y(d.value);
        const x = this.X(d.name || index);
        return this.orientation === "vertical"
          ? {
              x: x,
              y: y,
              width: this.X.bandwidth(),
              height: this.chart.height - y,
              id: d.id || index
            }
          : {
              x: 0,
              y: x,
              width: y,
              height: this.X.bandwidth(),
              id: d.id || index
            };
      });
    }
  }
};
</script>

<style>
</style>
