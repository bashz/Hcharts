<template>
  <div class="hc-legend">
    <div v-for="d in chart.data" :key="d.id" class="hc-legend-key">
      <div class="hc-legend-box" :style="{'background-color': d.color}"></div>
      <span class="hc-legend-text">{{d.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HcLegend",
  inject: {
    chart: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.hc-legend {
  width: max-content;
  text-align: left;
  border: 1px solid #000;
  padding: 4px 8px;
}
.hc-legend-box {
  width: 15px;
  height: 15px;
  display: inline-block;
  vertical-align: sub;
}
</style>
