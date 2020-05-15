<template>
  <div class="client-maps md-layout md-alignment-top-center">
    <ClientMapDisplay
      class="md-layout-item"
      v-for="({name, mapState, homeMapPlayer, winner}, index) in selectedMapsAndState"
      :key="index"
      :name="name"
      :map-state="mapState"
      :home-map-player="homeMapPlayer"
      :winner="winner"
    />
  </div>
</template>

<script>
import ClientMapDisplay from "./ClientMapDisplay.vue";

export default {
  name: "MapListDisplay",
  props: {
    selectedMapsAndState: Array
  },
  components: {
    ClientMapDisplay
  }
};
</script>

<style language="scss">
.client-maps {
  width: 99vw;
  display: inline-flex;
  position: absolute;
  left: 1vw;
  top: 0;
  margin-top: 7rem;
}
</style>
