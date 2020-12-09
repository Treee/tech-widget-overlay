<template>
  <div class="client-maps md-layout md-alignment-top-center">
    <div
      class="client-map-display fade-in-map"
      :class="{'fade-in-map': players[0] && players[0] !== '' || players[1] && players[1] !== '', 'fade-out-map': this.$store.state.clearAllMapsClicked}"
    >
      <div class="client-image-container"></div>
      <div
        class="yellow-flag-banner player-flag"
        v-if="players[0] && players[0] !== ''"
      >
        <div class="flag-text-no-icon">{{players[0] || ''}}</div>
      </div>
      <div
        class="purple-flag-banner player-flag"
        v-if="players[1] && players[1] !== ''"
      >
        <div class="flag-text-no-icon">{{players[1] || ''}}</div>
      </div>

    </div>
    <ClientMapDisplay
      class="md-layout-item"
      v-for="map in selectedMapsAndState"
      :key="map.id"
      :name="map.selectedMapName"
      :state="map.state"
      :home-map-player="map.homeMapPlayer || ''"
      :winner="map.winner || ''"
      :teamOneCiv="map.teamOneCiv"
      :teamTwoCiv="map.teamTwoCiv"
      :teamOne="players[0] || ''"
      :teamTwo="players[1] || ''"
    />
  </div>
</template>

<script>
  import ClientMapDisplay from "./ClientMapDisplay.vue";

  export default {
    name: "MapListDisplay",
    props: {
      selectedMapsAndState: Array,
      players: Array,
    },
    components: {
      ClientMapDisplay,
    },
  };
</script>

<style language="scss">
  .client-maps {
    width: 100%;
    gap: 3rem;
    margin-top: 7rem;
    position: absolute;
    top: 0;
  }
</style>
