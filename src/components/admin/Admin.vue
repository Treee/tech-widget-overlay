<template>
  <div class="admin-page">
    <div class="card-holder-left card-centered">
      <PlayerCivDisplayControls v-on:miscOverlayEmit="miscOverlayBroadcast" />
      <RoundOverlay v-on:roundOverlay="roundOverlayShow" />
      <AdminTechUpgradeOverlay
        v-on:techOverlayShow="techOverlayHandler"
        v-on:techOverlayClearAll="techClearAllHandler"
      />
    </div>
    <div class="card-holder-right card-centered">
      <RoundDisplayCard v-on:roundTech="roundTechShow" />
    </div>
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
        "<a href="https://www.xbox.com/en-us/developers/rules">Game Content Usage Rules</a>"
        using assets from Age of Empires II, and it is not endorsed by or affiliated with Microsoft.
      </div>
    </div>
  </div>
</template>

<script>
  import AdminTechUpgradeOverlay from "./tech-upgrade-overlay/AdminTechUpgradeOverlay.vue";
  import PlayerCivDisplayControls from "./scoreboard-overlay/PlayerCivDisplayControls.vue";
  import RoundOverlay from "./round-overlay/RoundOverlay.vue";
  import RoundDisplayCard from "./round-overlay/RoundDisplayCard.vue";

  import adminOverlayWebSocket from "../../client";
  import { SocketEnums } from "../../socket-enums";
  export default {
    name: "Admin",
    props: {
      clientId: String,
    },
    components: {
      AdminTechUpgradeOverlay,
      PlayerCivDisplayControls,
      RoundOverlay,
      RoundDisplayCard,
    },
    created: function () {
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
      roundTechShow(roundData) {
        const overlayData = this.$store.getters.getRoundOverlayData;
        const techOverlayData = this.$store.getters.getTechOverlayData;
        const data = {
          roundData: {
            roundMode: overlayData.roundMode,
            roundOverlayVisible: overlayData.roundOverlayVisible,
            team1Name: overlayData.team1Name,
            team2Name: overlayData.team2Name,
            team1RoundDraft: roundData.teamOneCiv,
            team2RoundDraft: roundData.teamTwoCiv,
          },
          techOverlayData: {
            ...techOverlayData,
          },
        };
        this.adminClient.sendMessage(SocketEnums.AdminShow, data);
      },
      roundOverlayShow() {
        const data = this.$store.getters.getRoundOverlayData;
        const data1 = this.$store.state.mapPickAndBanOverlayControlOptions
          .adminOptions;
        this.adminClient.sendMessage(SocketEnums.AdminShowMaps, {
          roundMode: data.roundMode,
          roundOverlayVisible: data.roundOverlayVisible,
          team1Name: data.team1Name,
          team2Name: data.team2Name,
          mapData: data1,
        });
      },
      mapOverlayHide() {
        this.adminClient.sendMessage(SocketEnums.AdminHideMaps, {});
      },
      miscOverlayBroadcast() {
        const data = this.$store.getters.getMiscOverlayData;
        const data1 = this.$store.getters.getCurrentRoundData;
        // console.log(data1);
        this.adminClient.sendMessage(SocketEnums.AdminShowCiv, {
          ...data,
          ...data1,
        });
      },
      scoreboardMapChange() {
        const data = {
          showCurrentMapName: this.$store.getters.getMiscOverlayData
            .showCurrentMapName,
          currentMap: this.$store.getters.getMiscOverlayData.currentMap,
        };
        this.adminClient.sendMessage(SocketEnums.AdminShowDock, {
          ...data,
        });
      },
    },
  };
</script>

<style language="scss">
  .admin-page {
    user-select: none;
    background-color: burlywood;
    height: 100vh;
    width: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: start;
  }
  .my-footer {
    text-shadow: none;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .column-contents {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }
  .row-contents {
    display: inline-flex;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
  }
  .width-100p {
    width: 100%;
  }
  .width-50p {
    width: 50%;
  }
  .card-holder-left {
    display: inline-flex;
    width: 50%;
    align-items: center;
    flex-direction: column;
  }
  .card-holder-right {
    display: inline-flex;
    width: 50%;
    align-items: center;
  }
  .card-centered {
    justify-content: center;
  }
  .card-style {
    width: 99%;
    background-color: burlywood !important;
    margin: 0.25rem;
  }
  .card-section {
    display: inline-flex;
    flex-direction: column;
  }
  .md-card-header {
    padding: 0rem;
  }
  .md-title {
    margin: 0rem;
  }
  .md-card-content {
    padding: 0rem;
  }
  .md-card-content:last-of-type {
    padding-bottom: 0.25rem;
  }
  .md-switch {
    margin: 0.5rem;
  }
  .md-switch .md-switch-label {
    padding-left: 0.25rem;
  }
</style>
