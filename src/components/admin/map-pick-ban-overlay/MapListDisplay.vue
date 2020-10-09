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
      :team1Name="map.team1Name"
      :team2Name="map.team2Name"
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
