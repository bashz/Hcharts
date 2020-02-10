<template>
  <g>
    <hc-bar v-for="(value, index) in output" :key="value.id" :value="value" :index="index"/>
  </g>
</template>

<script>
import mixins from "../lib/mixins"
import HcBar from "./shapes/HcBar";
export default {
  name: "HcBars",
  mixins: [mixins],
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
  isLeaf: false,
  canOverwrite: true,
  hasTooltip: false,
  data() {
    return {
      X: null,
      Y: null
    };
  },
  mounted() {
    this.X = this.scales[this.x];
    this.Y = this.scales[this.y];
  },
  watch: {
    x() {
      this.X = this.scales[this.x];
    },
    y() {
      this.Y = this.scales[this.y];
    },
    "chart.scales"() {
      this.X = this.scales[this.x];
      this.Y = this.scales[this.y];
    }
  },
  computed: {
    output() {
      if (!this.X || !this.Y) {
        return [];
      }
      if (this.X.bandwidth) {
        return this.data.map(d => {
          const value = d[this.Y.definition.discriminator] || d.value
          const label = d[this.X.definition.discriminator] || d.name || d.id
          const y = this.Y(value);
          const x = this.X(label);
          return {
            x,
            y,
            width: this.X.bandwidth(),
            height: this.height - y,
            color: d.color,
            id: d.id,
            label,
            value
          };
        });
      } else {
        return this.data.map(d => {
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
