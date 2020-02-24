<template>
  <g class="hc-points">
    <slot :output="output">
      <hc-line :value="output" />
      <hc-point v-for="value in output" :key="value.id" :value="value" />
    </slot>
  </g>
</template>

<script>
import HcPoint from "./shapes/HcPoint";
import HcLine from "./shapes/HcLine";
export default {
  name: "HcPoints",
  components: {
    HcPoint,
    HcLine
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
      return this.chart.data.map(d => ({
        x: this.X(d[this.X.definition.discriminator]),
        y: this.Y(d[this.Y.definition.discriminator]),
        color: d.color,
        id: d.id,
        label: d[this.X.definition.discriminator],
        value: d[this.Y.definition.discriminator]
      }));
    }
  }
};
</script>

<style>
</style>
