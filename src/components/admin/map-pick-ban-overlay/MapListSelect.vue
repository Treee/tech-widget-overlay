<template>
  <div>
    <md-field>
      <label for="map-names">Map List</label>
      <md-select
        :value="storeSelectedMaps"
        v-on:md-selected="mapSelected($event)"
        multiple
        name="map-names"
        id="map-names"
      >
        <md-button class="md-raised md-accent" v-on:click="clearSelectedMaps">Clear Selection</md-button>
        <md-option
          v-for="(value, index) in this.$store.getters.getAllMaps"
          :key="index"
          :value="value"
        >{{getPrettyMapName(value)}} 
        </md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MapListSelect",
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
      console.log('event selected', event);
      this.$store.commit("updateSelectedMaps", event);
    }
  }
};
</script>

<style language="scss">
</style>
