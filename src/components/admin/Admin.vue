<template>
  <div>
    <TechUpgradeOverlayControls />
    <CivListDisplay :civ-list="this.$store.getters.getCivNames" />
    <PlayerCivOverlayControls />
    <MapPickBanOverlayControls />
  </div>
</template>

<script>
import CivListDisplay from "./CivListDisplay.vue";
import TechUpgradeOverlayControls from "./TechUpgradeOverlayControls.vue";
import PlayerCivOverlayControls from "./PlayerCivOverlayControls.vue";
import MapPickBanOverlayControls from "./MapPickBanOverlayControls.vue";

export default {
  name: "Admin",
  props: {},
  components: {
    CivListDisplay,
    TechUpgradeOverlayControls,
    PlayerCivOverlayControls,
    MapPickBanOverlayControls
  }
};
</script>

<style language="scss">
</style>
