<template>
  <div id="app">
    <hc-chart :data="data" :process-data="processData" :scales="scales">
      <hc-bars x="band" y="linear" orientation="horizontal"/>
      <hc-axis direction="left" scale="band"/>
    </hc-chart>
  </div>
</template>

<script>
import HcChart from "./HcChart";
import HcBars from "./components/HcBars";
import HcAxis from "./components/scales/HcAxis"
export default {
  name: "app",
  components: {
    HcChart,
    HcBars,
    HcAxis
  },
  data () {
    return {
      data: [{value: -89, name: 'alpha'}, {value : 45, name: 'beta'}, {value: 29, name: 'delta'}],
      scales: {
        band: {
          type: 'band',
          orientation: 'vertical'
        },
        linear: {
          type: 'linear',
          orientation: 'horizontal',
          nice: 4
        }
      }
    }
  },
  methods: {
    processData(data) {
      return data.map(d => {
        d.value = Math.abs(d.value)
        return d
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.data = [{value: 29, name: 'alpha'}, {value : 45, name: 'beta'}, {value: -29, name: 'delta'}]
    }, 2000)
  }
};
</script>

<style>
.hc-svg {
  background-color: #c499ee;
}
</style>
