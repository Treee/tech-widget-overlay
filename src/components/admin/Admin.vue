<template>
  <div class="admin-page">
    <AdminTechUpgradeOverlay />
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-10">
        <PlayerCivOverlayControls />
      </div>
      <div class="md-layout-item md-size-50">
        <MapPickBanOverlayControls />
      </div>
    </div>
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
.admin-page {
  user-select: none;
  background-color: burlywood;
  height: 100vh;
  overflow: hidden;
}
</style>
