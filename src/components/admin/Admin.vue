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
    <div class="my-footer">
      <div>
        Created by
        <a href="https://www.twitch.tv/itsatreee">ItsATreee</a>
        (2019-2020) -
        <a href="https://github.com/Treee/tech-widget-overlay">GitHub</a>
      </div>
      <div>
        Age of Empires II © Microsoft Corporation.
        <b>AoE Tech/Map Overlay for Age of Empires II</b> was created under Microsoft's
        "
        <a
          href="https://www.xbox.com/en-us/developers/rules"
        >Game Content Usage Rules</a>"
        using assets from Age of Empires II, and it is not endorsed by or affiliated with Microsoft.
      </div>
    </div>
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
    techOverlayHandler() {
      const data = this.$store.getters.getTechOverlayData;
      this.adminClient.sendMessage(SocketEnums.AdminShow, { ...data });
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
      const data = this.$store.getters.getMiscOverlayData;
      this.adminClient.sendMessage(SocketEnums.AdminShowCiv, { ...data });
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

.my-footer {
  text-shadow: none;
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
