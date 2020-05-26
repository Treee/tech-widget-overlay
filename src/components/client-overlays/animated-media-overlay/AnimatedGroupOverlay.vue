<template>
  <div class="animated-group-overlay">
    <AnimatedMediaListOverlay />
    <AnimatedMediaListOverlay :position="'right'" />
  </div>
</template>

<script>
import AnimatedMediaListOverlay from "./AnimatedMediaListOverlay.vue";
export default {
  name: "AnimatedGroupOverlay",
  components: {
    AnimatedMediaListOverlay
  }
};
</script> 

<style language="scss">
</style>
