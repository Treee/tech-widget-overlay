<template>
  <div class="animated-media-list-wrapper">
    <AnimatedMediaOverlay :class="{right: position === 'right'}" />
    <AnimatedMediaOverlay :class="{right: position === 'right'}" />
    <AnimatedMediaOverlay :class="{right: position === 'right'}" />
    <AnimatedMediaOverlay :class="{right: position === 'right'}" />
  </div>
</template>

<script>
import AnimatedMediaOverlay from "./AnimatedMediaOverlay.vue";
export default {
  name: "AnimatedMediaListOverlay",
  props: {
    position: String
  },
  components: {
    AnimatedMediaOverlay
  }
};
</script> 

<style language="scss">
.animated-media-list-wrapper {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.right {
  float: right;
  left: 60%;
  position: relative;
}
</style>
