<template>
  <div class="hc-tooltip" :style="style">
    <div v-if="chart.tooltip" v-html="chart.tooltip.content" />
  </div>
</template>

<script>
export default {
  name: "HcTooltip",
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  props: {
    offset: {
      type: Object,
      default() {
        return { x: -20, y: -50 };
      }
    }
  },
  computed: {
    style() {
      return this.chart.tooltip
        ? {
            left: this.chart.tooltip.x + this.offset.x + "px",
            top: this.chart.tooltip.y + this.offset.y + "px"
          }
        : { display: "none" };
    }
  }
};
</script>

<style>
.hc-tooltip {
  position: fixed;
  background-color: #fff;
  pointer-events: none;
  padding: 6px 10px;
  white-space: nowrap;
  color: #000;
  border-radius: 15px;
  box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.6);
}
</style>
