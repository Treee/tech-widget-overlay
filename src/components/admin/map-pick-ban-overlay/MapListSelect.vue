<template>
  <div>
    <md-field>
      <label for="map-names">Map List</label>
      <md-select
        v-model="selectedMaps"
        v-on:md-selected="mapSelected($event)"
        multiple
        name="map-names"
        id="map-names"
      >
        <!-- <md-option value></md-option> -->
        <md-button class="md-raised md-accent" v-on:click="clearSelectedMaps">Clear Selection</md-button>
        <md-option
          v-for="(value, index) in this.$store.getters.getAllMaps"
          :key="index"
          :value="value"
        >{{getPrettyMapName(value)}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MapListSelect",
  data() {
    return {
      selectedMaps: this.storeSelectedMaps || []
    };
  },
  computed: {
    ...mapState({
      storeSelectedMaps: state =>
        state.mapPickAndBanOverlayControlOptions.selectedMaps
    })
  },
  methods: {
    getPrettyMapName(rawMapName) {
      return this.$store.getters.getFormattedMapName(rawMapName) || "";
    },
    clearSelectedMaps() {
      this.$store.commit("clearSelectedMaps");
    },
    mapSelected(event) {
      this.$store.commit("updateSelectedMaps", event);
    }
  }
};
</script>

<style language="scss">
</style>
