<template>
  <div class="overlay-container md-layout md-alignment-top-center">
    <MapDisplay
      class="md-layout-item"
      v-on:scoreboardChildBubbleUp="scoreboardBubbleUp"
      v-for="map in selectedMaps"
      :key="map.id"
      :id="map.id"
      :mapName="map.selectedMapName"
      :mapState="map.mapState"
      :teamOneName="team1"
      :teamTwoName="team2"
      :mapWinner="map.winner"
      :homeMapPlayer="map.homeMapPlayer"
    />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import MapDisplay from "./MapDisplay.vue";

  export default {
    name: "MapListDisplay",
    computed: {
      ...mapState({
        selectedMaps: (state) =>
          state.mapPickAndBanOverlayControlOptions.adminOptions,
        team1: (state) => state.mapPickAndBanOverlayControlOptions.team1Name,
        team2: (state) => state.mapPickAndBanOverlayControlOptions.team2Name,
      }),
    },
    components: {
      MapDisplay,
    },
    methods: {
      scoreboardBubbleUp() {
        this.$emit("scoreboardOverlayBubbleUp");
      },
    },
  };
</script>

<style language="scss">
</style>
