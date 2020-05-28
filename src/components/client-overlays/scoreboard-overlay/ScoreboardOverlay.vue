<template>
  <div class="score-board-overlay-container">
    <div class="score-board-overlay"></div>
    <PlayerPositions :showTeamColors="miscOverlayOptions.showTeamColors" />
    <PlayersCivDisplay
      :isCivDisplayVisible="miscOverlayOptions.isCivDisplayVisible"
      :civ1="miscOverlayOptions.civ1"
      :civ2="miscOverlayOptions.civ2"
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
    CurrentMapDisplay
  },
  computed: {
    ...mapState({
      miscOverlayOptions: state => state.miscOverlayControlOptions
    })
  }
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
