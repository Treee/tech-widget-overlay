<template>
  <div class="admin-page">
    <AdminTechUpgradeOverlay
      v-on:techOverlayShow="techOverlayHandler"
      v-on:techOverlayClearAll="techClearAllHandler"
    />
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
import { SocketEnums } from "../../socket-enums";
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
  created: function() {
    this.adminClient = adminOverlayWebSocket.startClient(
      this.clientId,
      () => {}
    );
    // console.log("created admin");
  },
  methods: {
    techOverlayHandler(overlayData) {
      const data = {
        civ1: this.$store.state.techUpgradeOverlayControlOptions.civ1,
        civ2: this.$store.state.techUpgradeOverlayControlOptions.civ2,
        overlays: overlayData
      };
      this.adminClient.sendMessage(SocketEnums.AdminShow, data);
    },
    techClearAllHandler() {
      this.adminClient.sendMessage(SocketEnums.AdminHide, {});
    }
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
