<template>
  <div>
    <ScoreboardOverlay />
    <CivBonusOverlay
      :civ1="civ1"
      :civ1-description="this.$store.getters.getCivDescription(civ1)"
      :civ2="civ2"
      :civ2-description="this.$store.getters.getCivDescription(civ2)"
      :playSound="sound"
    />
    <MapOverlay
      :selected-maps-and-state="selectedMaps"
      :players="players"
      :showMap="isMapVisible"
      :mapId="mapId"
    />
    <AnimatedGroupOverlay v-if="false" />

    <!-- <object
      data="https://bobstuff.org/cmoverlay/index.html#/overlay/5bc51522b1368b6070a3d033"
      class="custom-embed"
    >
      <embed
        src="https://bobstuff.org/cmoverlay/index.html#/overlay/5bc51522b1368b6070a3d033"
        class="custom-embed"
      />
      Error: Embedded data could not be displayed.
    </object> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

import CivBonusOverlay from "./tech-upgrade-overlay/CivBonusOverlay.vue";
import MapOverlay from "./maps-overlay/MapOverlay.vue";
import ScoreboardOverlay from "./scoreboard-overlay/ScoreboardOverlay.vue";
import AnimatedGroupOverlay from "./animated-media-overlay/AnimatedGroupOverlay.vue";

export default {
  name: "ClientOverlay",
  components: {
    CivBonusOverlay,
    MapOverlay,
    ScoreboardOverlay,
    AnimatedGroupOverlay,
  },
  created: () => {
    console.log("client overlay created");
  },
  computed: {
    ...mapState({
      civ1: (state) => state.techUpgradeOverlayControlOptions.civ1,
      civ2: (state) => state.techUpgradeOverlayControlOptions.civ2,
      sound: (state) => state.techUpgradeOverlayControlOptions.sound,
      selectedMaps: (state) => state.clientControlOptions.selectedMapsAndState,
      players: (state) => state.clientControlOptions.players,
      isMapVisible: (state) => state.showMap,
      mapId: (state) => state.mapId,
    }),
  },
};
</script>

<style></style>
