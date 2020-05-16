<template>
  <div class="overlay-container md-layout md-alignment-top-center">
    <MapDisplay
      class="md-layout-item"
      v-for="(mapName) in selectedMaps"
      :key="mapName"
      :map-name="mapName"
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
  },
  watch: {
    selectedMaps(newVal) {
      this.$store.commit("addMapState", newVal);
      this.$store.commit("pruneMapState", newVal);
      console.log(this.selectedMaps);
      // add any new map to mapstates, remove old maps
    }
  }
};
</script>

<style language="scss">
</style>
