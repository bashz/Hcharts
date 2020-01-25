<template>
  <div id="app">
    <hc-chart :data="data" :scales="scales" :offset="offset">
      <hc-bars x="band" y="linear" />
      <hc-axis position="bottom" scale="band"/>
      <hc-axis position="right" scale="linear"/>
      <hc-axis position="left" scale="linear"/>
      <hc-axis position="top" scale="band"/>
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
          orientation: 'horizontal'
        },
        linear: {
          type: 'linear',
          orientation: 'vertical',
          nice: 4
        }
      },
      offset: {
        left: 60,
        bottom: 30,
        right: 100,
        top: 30
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.data = [{value: 29, name: 'alpha'}, {value : 45, name: 'beta'}, {value: -29, name: 'delta'}]
    }, 2000)
    setTimeout(() => {
      this.data.push({value: 29, name: 'charlie'})
    }, 4000)
    setTimeout(() => {
      this.data[0].value = 60
    }, 6000)
  }
};
</script>

<style>
.hc-svg {
  background-color: #c499ee;
}
</style>
