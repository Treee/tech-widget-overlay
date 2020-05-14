<template>
  <div>
    <CivBonusOverlay
      v-if="isCivBonusOverlayVisible()"
      :civ1="this.$store.state.techUpgradeOverlayControlOptions.civ1"
      :civ1-description="this.$store.getters.getCivDescription(this.$store.state.civ1)"
      :upgrade-groups="this.$store.state.upgradeGroups"
      :civ2="this.$store.state.techUpgradeOverlayControlOptions.civ2"
      :civ2-description="this.$store.getters.getCivDescription(this.$store.state.civ2)"
      :playSound="false"
    />
    <MapOverlay
      v-if="isMapOverlayVisible()"
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
  methods: {
    isCivBonusOverlayVisible() {
      return !(
        this.$store.state.techUpgradeOverlayControlOptions.civ1 === "" ||
        this.$store.state.techUpgradeOverlayControlOptions.civ2 === ""
      );
    },
    isMapOverlayVisible() {
      return (
        this.$store.state.clientControlOptions.selectedMapsAndState.length > 0
      );
    }
  },
  created: () => {
    console.log("client overlay created");
  }
};
</script>

<style>
</style>
