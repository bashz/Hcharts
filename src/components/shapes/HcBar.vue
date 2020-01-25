<template>
  <rect :fill="color" :x="value.x" :width="value.width" :y="value.y" :height="value.height"></rect>
</template>

<script>
export default {
  name: "HcBar",
  props: {
    value: {
      type: Object,
      default() {
        return { x: 0, y: 0, width: 0, height: 0 };
      }
    },
    color: {
      type: String,
      default: "#999999"
    }
  }
};
</script>

<style>
</style>
