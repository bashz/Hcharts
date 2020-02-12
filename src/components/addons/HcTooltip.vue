<template>
  <div
    class="hc-tooltip"
    :style="style"
  >
    <div v-html="content" />
  </div>
</template>

<script>
import bus from "../../lib/bus";
export default {
  name: "HcTooltip",
  props: {
    offset: {
      type: Object,
      default () { return {x: -20, y: -50} }
    }
  },
  data() {
    return {
      display: "none",
      x: 0,
      y: 0,
      content: ""
    };
  },
  methods: {
    show(data) {
      this.x = data.x;
      this.y = data.y;
      this.content = data.content;
      this.display = "block";
    },
    hide() {
      this.display = "none";
    }
  },
  computed: {
    style() {
      return {
        display: this.display,
        left: (this.x + this.offset.x)  + "px",
        top: (this.y + this.offset.y) + "px"
      };
    }
  },
  created() {
    bus.$on("tooltip-show", this.show);
    bus.$on("tooltip-hide", this.hide);
  },
  destroyed() {
    bus.$off("tooltip-show", this.show);
    bus.$off("tooltip-hide", this.hide);
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
  box-shadow: 1px 1px 16px rgba(0, 0, 0, .6);
}
</style>
