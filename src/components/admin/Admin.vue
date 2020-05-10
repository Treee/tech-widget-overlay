<template>
  <div>
    <TechUpgradeOverlayControls />
    <CivListDisplay :civ-list="this.$store.getters.getCivNames" />
    <PlayerCivOverlayControls />
  </div>
</template>

<script>
import CivListDisplay from "./CivListDisplay.vue";
import TechUpgradeOverlayControls from "./TechUpgradeOverlayControls.vue";
import PlayerCivOverlayControls from "./PlayerCivOverlayControls.vue";

export default {
  name: "Admin",
  props: {},
  components: {
    CivListDisplay,
    TechUpgradeOverlayControls,
    PlayerCivOverlayControls
  }
};
</script>

<style language="scss">
</style>
