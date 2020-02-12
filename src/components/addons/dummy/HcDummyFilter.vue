<template>
  <div class="hc-filter"></div>
</template>

<script>
export default {
  name: "HcDummyFilter",
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  created() {
    this.chart.data = this.chart.unfiltredData;
  },
  watch: {
    "chart.unfiltredData"(newData) {
      this.chart.data = newData;
    }
  }
};
</script>

<style>
</style>
