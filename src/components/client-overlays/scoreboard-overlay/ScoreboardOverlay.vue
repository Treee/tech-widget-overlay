<template>
  <div class="score-board-overlay-container">
    <div class="score-board-overlay"></div>
    <PlayerPositions :showTeamColors="miscOverlayOptions.showTeamColors" />
    <PlayersCivDisplay
      :isCivDisplayVisible="miscOverlayOptions.isCivDisplayVisible"
      :civ1="miscOverlayOptions.civ1"
      :civ2="miscOverlayOptions.civ2"
      :civ1X="miscOverlayOptions.civ1X"
      :civ1Y="miscOverlayOptions.civ1Y"
      :civ1Width="miscOverlayOptions.civ1Width"
      :civ2X="miscOverlayOptions.civ2X"
      :civ2Y="miscOverlayOptions.civ2Y"
      :civ2Width="miscOverlayOptions.civ2Width"
    />
    <CurrentMapDisplay
      :showCurrentMapName="miscOverlayOptions.showCurrentMapName"
      :mapName="miscOverlayOptions.currentMap"
    />
  </div>
</template>

<script>
  import { mapState } from "vuex";

  import PlayerPositions from "./PlayerPositions.vue";
  import PlayersCivDisplay from "./PlayersCivDisplay.vue";
  import CurrentMapDisplay from "./CurrentMapDisplay.vue";

  export default {
    name: "ScoreboardOverlay",
    components: {
      PlayerPositions,
      PlayersCivDisplay,
      CurrentMapDisplay,
    },
    computed: {
      ...mapState({
        miscOverlayOptions: (state) => state.miscOverlayControlOptions,
      }),
    },
  };
</script> 

<style language="scss">
  .score-board-overlay-container {
    /* background: url("/assets/images/backgrounds/main-boa2-overlay.png"); */
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
  }
  .score-board-overlay {
    width: inherit;
    height: inherit;
    display: inline-flex;
  }
</style>
