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
    <MapListDisplay />
  </div>
</template>

<script>
import AdminTechUpgradeOverlay from "./tech-upgrade-overlay/AdminTechUpgradeOverlay.vue";
import PlayerCivOverlayControls from "./PlayerCivOverlayControls.vue";
import MapPickBanOverlayControls from "./map-pick-ban-overlay/MapPickBanOverlayControls.vue";
import MapListDisplay from "./map-pick-ban-overlay/MapListDisplay.vue";

import adminOverlayWebSocket from "../../client";

export default {
  name: "Admin",
  props: {
    clientId: String
  },
  components: {
    AdminTechUpgradeOverlay,
    PlayerCivOverlayControls,
    MapPickBanOverlayControls,
    MapListDisplay
  },
  methods: {
    handleSocketMessage(event) {
      console.log("admin handling message", event);
    }
  },
  created: function() {
    this.client = adminOverlayWebSocket.startClient(
      this.clientId,
      this.handleSocketMessage
    );
    // console.log("created admin");
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
