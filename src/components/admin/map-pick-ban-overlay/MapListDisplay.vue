<template>
  <div class="overlay-container md-layout md-alignment-top-center">
    <MapDisplay
      class="md-layout-item"
      v-on:scoreboardChildBubbleUp="scoreboardBubbleUp"
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
  methods: {
    scoreboardBubbleUp() {
      this.$emit("scoreboardOverlayBubbleUp");
    }
  },
  watch: {
    selectedMaps(newVal, oldVal) {
      const removedDifference = [];
      for (let i = 0; i < oldVal.length; i++) {
        let foundMatch = false;
        for (let k = 0; k < newVal.length; k++) {
          if (oldVal[i] === newVal[k]) {
            foundMatch = true;
          }
        }
        if (!foundMatch) {
          removedDifference.push(oldVal[i]);
        }
      }

      const addedDifference = [];
      for (let i = 0; i < newVal.length; i++) {
        let foundMatch = false;
        for (let k = 0; k < oldVal.length; k++) {
          if (newVal[i] === oldVal[k]) {
            foundMatch = true;
          }
        }
        if (!foundMatch) {
          addedDifference.push(newVal[i]);
        }
      }

      console.log("addedDifference", addedDifference);
      console.log("removedDifference", removedDifference);
      if (addedDifference.length > 0) {
        this.$store.commit("updateMapState", {
          name: addedDifference[0],
          state: "open",
          homeMapPlayer: "",
          winner: ""
        });
      }
      this.$store.commit("pruneMapState", newVal);
      // console.log(this.selectedMaps);
    }
  }
};
</script>

<style language="scss">
</style>
