<template>
  <div>
    <ClientPlayerDisplay />
    <CivBonusOverlay
      :civ1="techOverlayOptions.civ1"
      :civ1-description="this.$store.getters.getCivDescription(techOverlayOptions.civ1)"
      :civ2="techOverlayOptions.civ2"
      :civ2-description="this.$store.getters.getCivDescription(techOverlayOptions.civ2)"
      :playSound="techOverlayOptions.sound"
    />
    <MapOverlay
      :selected-maps-and-state="this.$store.state.clientControlOptions.selectedMapsAndState"
    />
    <AnimatedGroupOverlay v-if="false" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import CivBonusOverlay from "./tech-upgrade-overlay/CivBonusOverlay.vue";
import MapOverlay from "./maps-overlay/MapOverlay.vue";
import ClientPlayerDisplay from "./misc-overlay/ClientPlayerDisplay.vue";
import AnimatedGroupOverlay from "./animated-media-overlay/AnimatedGroupOverlay.vue";

export default {
  name: "ClientOverlay",
  components: {
    CivBonusOverlay,
    MapOverlay,
    ClientPlayerDisplay,
    AnimatedGroupOverlay
  },
  created: () => {
    console.log("client overlay created");
  },
  computed: {
    ...mapState({
      techOverlayOptions: state => state.techUpgradeOverlayControlOptions
    })
  }
};
</script>

<style>
</style>
