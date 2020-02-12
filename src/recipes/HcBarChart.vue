<template>
  <hc-chart :data="data" :scales="scales" :offset="offset" :colors="colors" :animation="animation">
    <hc-bars x="linear" y="band" />
    <hc-axis position="bottom" scale="linear" />
    <hc-axis position="left" scale="band" />
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
  name: "HcBarChart",
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
          orientation: "vertical"
        },
        linear: {
          type: "linear",
          orientation: "horizontal",
          nice: 2,
          marginMin: 5
        }
      },
      offset: {
        left: 100,
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