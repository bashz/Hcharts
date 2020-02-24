<template>
  <div id="app">
    <hc-chart
      :data="data"
      :scales="scales"
      :offset="offset"
      :colors="colors"
      :animation="animation"
    >
      <hc-bars x="band" y="linear" />
      <hc-points x="band" y="lines">
        <template v-slot="points">
          <hc-point v-for="point in points.output" :r="10" :key="point.id" :value="point"/>
        </template>
      </hc-points>
      <hc-axis position="bottom" scale="band" />
      <hc-axis position="right" scale="linear" />
      <hc-axis position="left" scale="lines" />
      <!-- <hc-axis position="top" scale="band"/> -->
      <template v-slot:HcFilter>
        <hc-filter />
      </template>
      <template v-slot:HcLegend>
        <hc-legend />
      </template>
      <template v-slot:HcTooltip>
        <hc-tooltip />
      </template>
    </hc-chart>
  </div>
</template>

<script>
import HcChart from "./HcChart";
import HcBars from "./components/HcBars";
import HcPoints from "./components/HcPoints";
import HcAxis from "./components/scales/HcAxis";
import HcFilter from "./components/addons/HcFilter";
import HcLegend from "./components/addons/HcLegend";
import HcTooltip from "./components/addons/HcTooltip";
import HcPoint from "./components/shapes/HcPoint"
export default {
  name: "app",
  components: {
    HcChart,
    HcBars,
    HcPoints,
    HcAxis,
    HcFilter,
    HcLegend,
    HcTooltip,
    HcPoint
  },
  data() {
    return {
      position: "top",
      data: [
        { value: -89, name: "alpha", id: "2", v: -9  },
        { value: 45, name: "beta", id: "3", v: 5  },
        { value: 29, name: "delta", id: "4", v: 3  }
      ],
      scales: {
        band: {
          type: "band",
          orientation: "horizontal"
        },
        linear: {
          type: "linear",
          orientation: "vertical",
          nice: 4
        },
        lines: {
          type: "linear",
          orientation: "vertical",
          nice: 4,
          discriminator: "v"
        }
      },
      offset: {
        left: 60,
        bottom: 30,
        right: 100,
        top: 30
      },
      colors: ["#339999", "#993399", "#333399"],
      animation: {
        easing: "Bounce",
        duration: 1000
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.data = [
        { value: 29, name: "alpha", id: "2", v: 3 },
        { value: 45, name: "beta", id: "3", v: 5  },
        { value: -29, name: "delta", id: "4", v: -3  }
      ];
    }, 1100);
    setTimeout(() => {
      this.data.push({ value: 29, name: "charlie", id: "5", v: 3  });
    }, 2200);
    setTimeout(() => {
      this.data[3].value = 60;
    }, 3300);
    setTimeout(() => {
      this.data.unshift({ value: 29, name: "zeta", id: "1", v: 7 });
    }, 4400);
    setTimeout(() => {
      this.position = "left";
      this.data[1].value = -25;
    }, 5500);
    setTimeout(() => {
      this.data[3].value = 20;
    }, 6600);
  }
};
</script>

<style scoped>
.hc-svg {
  background-color: #dfe5f0;
}
.hc-point {
  stroke: #000;
  stroke-width: 3;
}
</style>
