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
      required: true
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
      if (this.X.bandwidth) {
        return this.chart.data.map((d, index) => {
          const y = this.Y(d[this.Y.definition.discriminator] || d.value);
          const x = this.X(d[this.X.definition.discriminator] || d.name || index);
          return {
            x,
            y,
            width: this.X.bandwidth(),
            height: this.chart.height - y,
            id: d.id || index
          };
        });
      } else {
        return this.chart.data.map((d, index) => {
          const x = this.X(d[this.X.definition.discriminator] || d.value);
          const y = this.Y(d[this.Y.definition.discriminator] || d.name || index);
          return {
            x: 0,
            y,
            width: x,
            height: this.Y.bandwidth(),
            id: d.id || index
          };
        });
      }
    }
  }
};
</script>

<style>
</style>
