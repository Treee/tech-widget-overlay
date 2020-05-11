<template>
  <div>
    <md-field>
      <label for="map-names">Map List</label>
      <md-select v-model="selectedMaps" multiple name="map-names" id="map-names">
        <md-option value></md-option>
        <md-option
          v-for="(value, index) in this.defaultMaps.concat(customMaps)"
          :key="index"
          :value="value"
        >{{getFormattedMapName(value)}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "MapListDisplay",
  data: () => ({
    selectedMaps: []
  }),
  computed: {
    defaultMaps: () => [
      "acropolis",
      "alpine-lakes",
      "arabia",
      "archipelago",
      "arena",
      "baltic",
      "black-forest",
      "cenotes",
      "coastal",
      "continental",
      "fortress",
      "front-line",
      "ghost-lake",
      "golden-pit",
      "gold-rush",
      "hideout",
      "highland",
      "hill-fort",
      "islands",
      "lombardia",
      "mediterranean",
      "mega-random",
      "migration",
      "mongolia",
      "nomad",
      "oasis",
      "scandinavia",
      "serengeti",
      "socotra",
      "steppe",
      "team-islands",
      "valley",
      "yucatan"
    ],
    customMaps: () => [
      "boa2-african-waters",
      "boa2-arabia",
      "boa2-beachfight",
      "boa2-canyon-lake",
      "boa2-colloseum",
      "boa2-desert-slope",
      "boa2-donut",
      "boa2-grand-bara",
      "boa2-not-socotra",
      "rbw-acropolis",
      "rbw-arabia",
      "rbw-atacama",
      "rbw-aztlan",
      "rbw-cross",
      "rbw-el-dorado",
      "rbw-golden-pit",
      "rbw-golden-swamp",
      "rbw-kawasan",
      "rbw-land-madness",
      "rbw-sinkhole",
      "rbw-wings",
      "hc3-arabia",
      "hc3-bay",
      "hc3-cross",
      "hc3-cup",
      "hc3-el-dorado",
      "hc3-goldrush",
      "hc3-hideout",
      "hc3-high-tide",
      "hc3-islands",
      "hc3-ravines",
      "hc3-slopes",
      "msm-acclivity",
      "msm-alpine",
      "msm-arabia",
      "msm-big-freeze",
      "msm-haboob",
      "msm-kawasan",
      "msm-lowland"
    ],
    customMapPrefixes: () => ["boa2", "rbw", "hc3", "msm"]
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
