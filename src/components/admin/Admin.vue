<template>
  <div>
    <AdminTechUpgradeOverlay />
    <PlayerCivOverlayControls />
    <MapPickBanOverlayControls />
  </div>
</template>

<script>
import AdminTechUpgradeOverlay from "./tech-upgrade-overlay/AdminTechUpgradeOverlay.vue";
import PlayerCivOverlayControls from "./PlayerCivOverlayControls.vue";
import MapPickBanOverlayControls from "./map-pick-ban-overlay/MapPickBanOverlayControls.vue";

export default {
  name: "Admin",
  props: {},
  components: {
    AdminTechUpgradeOverlay,
    PlayerCivOverlayControls,
    MapPickBanOverlayControls
  }
};
</script>

<style language="scss">
</style>
