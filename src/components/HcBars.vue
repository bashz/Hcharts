<template>
  <g>
    <hc-bar v-for="value in output" :key="value.id" :value="value" />
  </g>
</template>

<script>
import HcBar from "./shapes/HcBar";
export default {
  name: "HcBars",
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
        return this.chart.data.map(d => {
          const value = d[this.Y.definition.discriminator] || d.value
          const label = d[this.X.definition.discriminator] || d.name || d.id
          const y = this.Y(value);
          const x = this.X(label);
          return {
            x,
            y,
            width: this.X.bandwidth(),
            height: this.chart.height - y,
            color: d.color,
            id: d.id,
            label,
            value
          };
        });
      } else {
        return this.chart.data.map(d => {
          const value = d[this.Y.definition.discriminator] || d.value
          const label = d[this.X.definition.discriminator] || d.name || d.id
          const x = this.X(value);
          const y = this.Y(label);
          return {
            x: 0,
            y,
            width: x,
            height: this.Y.bandwidth(),
            color: d.color,
            id: d.id,
            label,
            value
          };
        });
      }
    }
  }
};
</script>

<style>
</style>
