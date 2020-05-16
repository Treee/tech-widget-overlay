<template>
  <div>
    <CivBonusOverlay
      :civ1="this.$store.state.techUpgradeOverlayControlOptions.civ1"
      :civ1-description="this.$store.getters.getCivDescription(this.$store.state.techUpgradeOverlayControlOptions.civ1)"
      :upgrade-groups="this.$store.state.upgradeGroups"
      :civ2="this.$store.state.techUpgradeOverlayControlOptions.civ2"
      :civ2-description="this.$store.getters.getCivDescription(this.$store.state.techUpgradeOverlayControlOptions.civ2)"
      :playSound="false"
    />
    <MapOverlay
      :selected-maps-and-state="this.$store.state.clientControlOptions.selectedMapsAndState"
    />
  </div>
</template>

<script>
import CivBonusOverlay from "./tech-upgrade-overlay/CivBonusOverlay.vue";
import MapOverlay from "./maps-overlay/MapOverlay.vue";

export default {
  name: "ClientOverlay",
  components: {
    CivBonusOverlay,
    MapOverlay
  },
  created: () => {
    console.log("client overlay created");
  }
};
</script>

<style>
</style>
