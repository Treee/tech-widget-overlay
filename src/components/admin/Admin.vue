<template>
  <div class="admin-page">
    <AdminTechUpgradeOverlay
      v-on:techOverlayShow="techOverlayHandler"
      v-on:techOverlayClearAll="techClearAllHandler"
    />
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-20">
        <PlayerCivDisplayControls v-on:miscOverlayEmit="miscOverlayBroadcast" />
      </div>
      <div class="md-layout-item md-size-25">
        <MapPickBanOverlayControls
          v-on:mapOverlayShowBubble="mapOverlayShow"
          v-on:mapOverlayHideBubble="mapOverlayHide"
        />
      </div>
    </div>
    <MapListDisplay />
  </div>
</template>

<script>
import AdminTechUpgradeOverlay from "./tech-upgrade-overlay/AdminTechUpgradeOverlay.vue";
import MapPickBanOverlayControls from "./map-pick-ban-overlay/MapPickBanOverlayControls.vue";
import MapListDisplay from "./map-pick-ban-overlay/MapListDisplay.vue";
import PlayerCivDisplayControls from "./misc-overlay/PlayerCivDisplayControls.vue";

import adminOverlayWebSocket from "../../client";
import { SocketEnums } from "../../socket-enums";
export default {
  name: "Admin",
  props: {
    clientId: String
  },
  components: {
    AdminTechUpgradeOverlay,
    MapPickBanOverlayControls,
    MapListDisplay,
    PlayerCivDisplayControls
  },
  created: function() {
    this.adminClient = adminOverlayWebSocket.startClient(this.clientId, () => {
      // this function would normally handle messages from the sebsocket server.
      // The admin widget is purely one way outbound so this is empty
    });
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
    },
    mapOverlayShow() {
      this.adminClient.sendMessage(
        SocketEnums.AdminShowMaps,
        this.$store.getters.getMapData
      );
    },
    mapOverlayHide() {
      this.adminClient.sendMessage(SocketEnums.AdminHideMaps, {});
    },
    miscOverlayBroadcast() {
      const data = {
        ...this.$store.getters.getMiscOverlayData,
        ...{
          civ1: this.$store.state.techUpgradeOverlayControlOptions.civ1 || "",
          civ2: this.$store.state.techUpgradeOverlayControlOptions.civ2 || ""
        }
      };

      this.adminClient.sendMessage(SocketEnums.AdminShowCiv, data);
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
