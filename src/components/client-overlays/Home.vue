<template>
  <div>
    <ClientOverlays />
  </div>
</template>

<script>
import ClientOverlays from "./ClientOverlays.vue";
import clientOverlayWebSocket from "../../client";
import { SocketEnums } from "../../socket-enums";

export default {
  name: "Home",
  props: {
    clientId: String
  },
  components: {
    ClientOverlays
  },
  methods: {
    handleSocketMessage(event) {
      const parsed = JSON.parse(event.data);
      const messageType = parsed.type;
      const data = parsed.data;
      if (messageType === SocketEnums.AdminShow) {
        this.$store.commit("updateCivs", { civ1: data.civ1, civ2: data.civ2 });
      }
      if (messageType === SocketEnums.AdminHide) {
        this.$store.dispatch("clearCivs", { delayMs: 2000 });
      }
      if (messageType === SocketEnums.AdminShowMaps) {
        // test
      }
      if (messageType === SocketEnums.AdminHideMaps) {
        // test
      }
      console.log("client handling message", event);
    }
  },
  created: function() {
    this.client = clientOverlayWebSocket.startClient(
      this.clientId,
      this.handleSocketMessage
    );
    // console.log("App created", this.clientId);
  }
};
</script>

<style>
@font-face {
  font-family: "Memb-Font";
  src: url("/assets/fonts/IronstrikeSemiBold.otf");
}
#app {
  font-family: Memb-Font;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
}

.large-font {
  font-size: large;
}

.overlay-container {
  width: 99vw;
  display: inline-flex;
}
</style>
