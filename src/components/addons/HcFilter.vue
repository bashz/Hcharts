<template>
  <div class="hc-filter">
    <div v-for="(d, i) in data" :key="d.id" class="hc-filter-key" @click="toggle(d, i)">
      <div
        class="hc-filter-box"
        :style="{
          'background-color': d.isActive ? d.color : 'rgba(255, 255, 255, 0)',
          'border': d.color + ' 2px solid'  
        }"
      ></div>
      <span class="hc-filter-text"> {{d.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HcFilter",
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data: [],
      dataIds: []
    };
  },
  created() {
    this.data = this.chart.unfiltredData.map(d => {
      d.isActive = true;
      return d;
    });
    this.dataIds = this.data.map(d => d.id);
    this.setData();
  },
  watch: {
    "chart.unfiltredData"(newData) {
      this.data = newData.map(d => {
        const index = this.dataIds.indexOf(d.id);
        d.isActive = ~index ? this.data[index].isActive : true;
        return d;
      });
      this.dataIds = this.data.map(d => d.id);
      this.setData();
    }
  },
  methods: {
    toggle(d, i) {
      d.isActive = !d.isActive;
      this.$set(this.data, i, d);
      this.setData();
    },
    setData() {
      this.chart.data = this.data.filter(d => d.isActive);
    }
  }
};
</script>

<style>
.hc-filter {
  text-align: center;
  margin-top: 12px;
}
.hc-filter-key {
  display: inline-block;
  cursor: pointer;
  margin-right: 14px;
}
.hc-filter-box {
  width: 13px;
  height: 13px;
  display: inline-block;
  vertical-align: sub;
}
</style>
