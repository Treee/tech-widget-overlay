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
        >{{getFormattedMapName(value)}}</md-option>
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
      controlOptions: state => state.mapPickAndBanOverlayControlOptions,
      customMapPrefixes: state => state.customMapPrefixes
    })
  },
  methods: {
    getFormattedMapName(rawMapName) {
      let mapName = "";
      const mapNameParts = rawMapName.split("-");
      if (mapNameParts.length === 1) {
        // single word map name, not custom
        mapName = this.toCamelCase(rawMapName);
      } else {
        const customMapPrefix =
          this.customMapPrefixes.find(prefix => {
            return prefix === mapNameParts[0];
          }) || "";
        if (customMapPrefix === "") {
          // multi word map name, not custom
          mapName = this.toCamelCase(rawMapName);
        } else {
          // multi word map name, is custom
          mapName = `${mapNameParts[0].toUpperCase()} ${this.toCamelCase(
            rawMapName.substring(mapNameParts[0].length + 1)
          )}`;
        }
      }
      // toCamelCase
      return mapName.trim();
    },
    toCamelCase(text) {
      let camelCase = "";
      text.split("-").forEach(word => {
        camelCase = camelCase
          .concat(word.charAt(0).toUpperCase())
          .concat(word.substring(1))
          .concat(" ");
      });
      return camelCase;
    }
  }
};
</script>

<style language="scss">
.md-menu-content-container {
  height: 35rem;
}
</style>
