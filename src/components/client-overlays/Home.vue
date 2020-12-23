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
        if (messageType === SocketEnums.AdminShow) {
          console.log("admin show");
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
          // this.$store.commit("updateCivs", { civ1: data.civ1, civ2: data.civ2 });
          this.$store.commit("updateTechOverlayControls", {
            ...data.techOverlayData,
          });
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
          this.$store.dispatch("updateScoreboardClientControls", data);
        }
        if (messageType === SocketEnums.AdminShowDock) {
          this.$store.commit("updateScoreboardMapName", data);
        }
        // console.log("client handling message", data);
      },
      shuffleCivilizationDrafts(teamNumber, playerPicks, shuffleDelay) {
        const self = this;
        const dispatchPath =
          teamNumber === "1" ? "updateTeam1Civ" : "updateTeam2Civ";
        for (let index = 0; index < playerPicks?.length; index++) {
          setTimeout(function () {
            const formattedName = self.$store.getters.getFormattedMapName(
              playerPicks[index]
            );
            self.$store.dispatch(dispatchPath, formattedName);
            self.$store.dispatch("preTransitionCivOverlay", {
              delay: shuffleDelay - 2000,
            });
          }, shuffleDelay * index);
        }
      },
    },
    created: function () {
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
