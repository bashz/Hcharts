<template>
  <div class="hc-filter">
    <div 
      v-for="(d, i) in data"
      :key="d.id"
      class="hc-filter-key"
      @click="toggle(d, i)"
    >
      <div
        class="hc-filter-box"
        :style="{
          'background-color': d.isActive ? d.color : 'rgba(255, 255, 255, 0)',
          'border': d.color + ' 2px solid'  
        }"
      ></div>
      <span>{{d.name}}</span>
    </div>
  </div>
</template>

<script>
import bus from "../../lib/bus";
export default {
  name: "HcFilter",
  data() {
    return {
      data: [],
      dataIds: []
    };
  },
  methods: {
    toggle(d, i) {
      d.isActive = !d.isActive
      this.$set(this.data, i, d);
      this.sendData()
    },
    updateData(data) {
      this.data = data.map(d => {
        const index = this.dataIds.indexOf(d.id);
        if (~index) {
          return this.data[index];
        }
        d.isActive = true;
        return d;
      });
      this.dataIds = this.data.map(d => d.id);
      this.sendData()
    },
    sendData() {
      bus.$emit(
        "filtered-data",
        this.data.filter(d => d.isActive)
      );
    }
  },
  created() {
    bus.$on("original-data", this.updateData);
  },
  destroyed() {
    bus.$off("original-data", this.updateData);
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
