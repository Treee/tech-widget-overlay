<template>
  <div class="client-maps md-layout">
    <ClientMapDisplay
      class="md-layout-item"
      v-for="(map, index) in selectedMapsAndState"
      :key="map.id"
      :name="map.selectedMapName"
      :state="map.state"
      :home-map-player="map.homePlayer || ''"
      :winner="map.winner || ''"
      :teamOneCiv="map.teamOneCiv"
      :teamTwoCiv="map.teamTwoCiv"
      :teamOne="players[0] || ''"
      :teamTwo="players[1] || ''"
      :pointer="pickPointerdirection(index)"
      :showMap="isThisMapVisible(map.id)"
    />
  </div>
</template>

<script>
import ClientMapDisplay from "./ClientMapDisplay.vue";

export default {
  name: "MapListDisplay",
  props: {
    selectedMapsAndState: Array,
    players: Array,
    showMap: Boolean,
    mapId: String,
  },
  components: {
    ClientMapDisplay,
  },
  methods: {
    pickPointerdirection(index) {
      const totalMaps = this.selectedMapsAndState.length;
      console.log(Math.floor(totalMaps / 2));
      if (index < Math.floor(totalMaps / 2)) {
        return "pointer-left";
      } else if (index === Math.floor(totalMaps / 2)) {
        return "pointer-both";
      } else {
        return "pointer-right";
      }
    },
    isThisMapVisible(mapId) {
      console.log(
        `isThisMapVisible:: ${mapId} ::: this ${this.mapId} :::: show map ${this.showMap}`
      );
      return this.mapId === mapId && this.showMap;
    },
  },
};
</script>

<style language="scss">
.client-maps {
  width: 100%;
  margin-top: 35rem;
  position: absolute;
  top: 0;
}
</style>
