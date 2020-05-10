<template>
  <div>
    <div class="map-frame" />
    <div class="map-images" />
    <div class="map-name"></div>
  </div>
</template>

<script>
export default {
  name: "MapDisplay",
  props: {
    rawMapName: String,
    mapState: String
  }
};
</script>

<style language="scss">
</style>
