<template>
  <div class="client-maps md-layout md-alignment-top-center">
    <ClientMapDisplay
      class="md-layout-item"
      v-for="map in selectedMapsAndState"
      :key="map.id"
      :name="map.selectedMapName"
      :state="map.state"
      :home-map-player="map.homePlayer || ''"
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
    margin-top: 7rem;
    position: absolute;
    top: 0;
  }
</style>
