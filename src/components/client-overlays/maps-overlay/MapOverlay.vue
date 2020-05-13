<template>
  <div class="overlay-container md-layout md-alignment-top-center">
    <MapDisplay
      class="md-layout-item"
      v-for="(mapName, index) in selectedMaps"
      :key="index"
      :map-name="mapName"
    />
  </div>
</template>

<script>
import MapDisplay from "./MapDisplay.vue";

export default {
  name: "MapListDisplay",
  props: {
    selectedMaps: Array
  },
  components: {
    MapDisplay
  }
};
</script>

<style language="scss">
</style>
