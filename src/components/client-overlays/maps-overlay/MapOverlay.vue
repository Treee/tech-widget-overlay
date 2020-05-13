<template>
  <div class="overlay-container md-layout md-alignment-top-center">
    <ClientMapDisplay
      class="md-layout-item"
      v-for="({mapName, mapState, homeMapPlayer, winner}, index) in selectedMapsAndState"
      :key="index"
      :map-name="mapName"
      :map-state="'open'"
      :home-map-player="''"
      :winner="''"
    />
  </div>
</template>

<script>
import ClientMapDisplay from "./ClientMapDisplay.vue";

export default {
  name: "MapListDisplay",
  props: {
    selectedMapsAndState: Array
  },
  components: {
    ClientMapDisplay
  }
};
</script>

<style language="scss">
</style>
