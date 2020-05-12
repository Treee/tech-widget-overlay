<template>
  <div class="overlay-container md-layout md-gutter md-alignment-top-center">
    <MapDisplay
      class="md-layout-item"
      v-for="(value, index) in selectedMaps"
      :key="index"
      :map-name="value"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapDisplay from "./MapDisplay.vue";

export default {
  name: "MapListDisplay",
  props: {
    mapName: String
  },
  computed: {
    ...mapState({
      selectedMaps: state =>
        state.mapPickAndBanOverlayControlOptions.selectedMaps
    })
  },
  components: {
    MapDisplay
  }
};
</script>

<style language="scss">
</style>
