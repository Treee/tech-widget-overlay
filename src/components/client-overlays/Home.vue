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
    clientId: String,
  },
  components: {
    ClientOverlays,
  },
  methods: {
    handleSocketMessage(event) {
      const parsed = JSON.parse(event.data);
      const messageType = parsed.type;
      const data = parsed.data;
      if (messageType === SocketEnums.AdminShowPlayerPicks) {
        console.log("round tech show");
        this.shuffleCivilizationDrafts(
          "1",
          data.roundData.team1RoundDraft,
          data.techOverlayData.autoHideDelay * 1000
        );
        this.shuffleCivilizationDrafts(
          "2",
          data.roundData.team2RoundDraft,
          data.techOverlayData.autoHideDelay * 1000
        );
        this.$store.commit("updateTechOverlayControls", {
          ...data.techOverlayData,
        });
      }
      if (messageType === SocketEnums.AdminShow) {
        // console.log("blah blah", data);
        this.$store.commit("updateTechOverlayControls", {
          ...data.techOverlayData,
        });
        this.shuffleCivilizationDrafts(
          "1",
          data.civ1,
          data.autoHideDelay * 1000
        );
        this.shuffleCivilizationDrafts(
          "2",
          data.civ2,
          data.autoHideDelay * 1000
        );
      }
      if (messageType === SocketEnums.AdminHide) {
        this.$store.dispatch("clearCivs", { delayMs: 2000 });
      }
      if (messageType === SocketEnums.AdminShowMaps) {
        this.$store.commit("updateClientSideMapsAndState", data);
      }
      if (messageType === SocketEnums.AdminHideMaps) {
        this.$store.dispatch("clearMaps", { delayMs: 2000 });
      }
      if (messageType === SocketEnums.AdminShowCiv) {
        this.$store.commit("updateScoreboardClientControls", data);
      }
      if (messageType === SocketEnums.AdminShowDock) {
        this.$store.commit("updateScoreboardMapName", data);
      }
      if (messageType === SocketEnums.AdminShowMonastary) {
        this.$store.dispatch("showMap", data);
      }
      if (messageType === SocketEnums.AdminHideMonastary) {
        this.$store.dispatch("hideMap");
      }
      console.log(`Message Type: ${messageType}`, data);
    },
    shuffleCivilizationDrafts(teamNumber, playerPicks, shuffleDelay) {
      const self = this;
      const dispatchPath =
        teamNumber === "1" ? "updateTeam1Civ" : "updateTeam2Civ";
      let numPicks = playerPicks?.length || 0;
      let bypassMiscUpdate = false;
      let bypassTechUpdate = false;
      if (typeof playerPicks === String) {
        numPicks = 1;
        bypassMiscUpdate = true;
      } else {
        bypassTechUpdate = true;
      }
      for (let index = 0; index < numPicks; index++) {
        setTimeout(function() {
          const formattedName = self.$store.getters.getFormattedMapName(
            playerPicks[index]
          );
          self.$store.dispatch(dispatchPath, {
            formattedName,
            bypassMiscUpdate,
            bypassTechUpdate,
          });
          self.$store.dispatch("preTransitionCivOverlay", {
            delay: shuffleDelay - 2000,
          });
          self.$store.dispatch("resetTransitionCivOverlay", {
            delay: shuffleDelay,
          });
        }, shuffleDelay * index);
      }
    },
  },
  created: function() {
    this.client = clientOverlayWebSocket.startClient(
      this.clientId,
      this.handleSocketMessage
    );
    // console.log("App created", this.clientId);
  },
};
</script>

<style>
@font-face {
  font-family: "Memb-Font";
  src: url("https://treee.github.io/tech-widget-overlay/assets/fonts/IronstrikeSemiBold.otf");
}

.transparent {
  background: transparent !important;
  background-color: transparent !important;
  /* overflow: hidden; */
}

#app {
  font-family: Memb-Font;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* overflow: hidden; */

  height: 100vh;
}

.large-font {
  font-size: large;
}

.overlay-container {
  width: 99vw;
  display: inline-flex;
}
</style>
