<template>
  <div class="overlay-container md-layout md-alignment-top-center">
    <MapDisplay
      v-on:mapStateChanged="childMapStateChanges"
      class="md-layout-item"
      v-for="(mapName, index) in selectedMaps"
      :key="index"
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
  methods: {
    childMapStateChanges(dataObj) {
      this.$store.commit("updateMapState", dataObj);
    }
  }
};
</script>

<style language="scss">
</style>
