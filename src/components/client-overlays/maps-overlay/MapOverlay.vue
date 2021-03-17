<template>
  <div class="client-maps md-layout">
    <ClientMapDisplay
      class="md-layout-item"
      v-for="(map, index) in selectedMapsAndState"
      :key="map.id"
      :name="map.selectedMapName"
      :state="map.state"
      :home-map-player="map.homePlayer || ''"
      :winner="map.winner || ''"
      :teamOneCiv="map.teamOneCiv"
      :teamTwoCiv="map.teamTwoCiv"
      :teamOne="players[0] || ''"
      :teamTwo="players[1] || ''"
      :pointer="pickPointerdirection(index)"
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
    methods: {
      pickPointerdirection(index) {
        const totalMaps = this.selectedMapsAndState.length;
        console.log(Math.floor(totalMaps / 2));
        if (index < Math.floor(totalMaps / 2)) {
          return "pointer-left";
        } else if (index === Math.floor(totalMaps / 2)) {
          return "pointer-both";
        } else {
          return "pointer-right";
        }
      },
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
