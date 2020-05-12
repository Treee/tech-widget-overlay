<template>
  <div>
    <md-field>
      <label for="map-names">Map List</label>
      <md-select v-model="controlOptions.selectedMaps" multiple name="map-names" id="map-names">
        <md-option value></md-option>
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
  computed: {
    ...mapState({
      controlOptions: state => state.mapPickAndBanOverlayControlOptions
    })
  },
  methods: {
    getPrettyMapName(rawMapName) {
      return this.$store.getters.getFormattedMapName(rawMapName) || "";
    }
  }
};
</script>

<style language="scss">
.md-menu-content-container {
  height: 35rem;
}
</style>
