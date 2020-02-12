<template>
  <hc-chart :data="data" :scales="scales" :offset="offset" :colors="colors" :animation="animation">
    <hc-bars x="band" y="linear" />
    <hc-axis position="bottom" scale="band" />
    <hc-axis position="left" scale="linear" />
    <template v-slot:HcFilter>
      <hc-filter />
    </template>
    <template v-slot:HcTooltip>
      <hc-tooltip />
    </template>
  </hc-chart>
</template>

<script>
import HcChart from "../HcChart";
import HcBars from "../components/HcBars";
import HcAxis from "../components/scales/HcAxis";
import HcFilter from "../components/addons/HcFilter";
import HcTooltip from "../components/addons/HcTooltip";
export default {
  name: "HcColumnChart",
  components: {
    HcChart,
    HcBars,
    HcAxis,
    HcFilter,
    HcTooltip
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    colors: {
      type: Array,
      default() {
        return ["#339999", "#993399", "#333399"];
      }
    }
  },
  data() {
    return {
      scales: {
        band: {
          type: "band",
          orientation: "horizontal"
        },
        linear: {
          type: "linear",
          orientation: "vertical",
          nice: 2,
          marginMin: 5
        }
      },
      offset: {
        left: 60,
        bottom: 30,
        right: 20,
        top: 30
      },
      animation: {
        easing: "Linear",
        duration: 400
      }
    };
  }
};
</script>

<style>
</style>