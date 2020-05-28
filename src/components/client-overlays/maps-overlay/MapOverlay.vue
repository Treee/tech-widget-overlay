<template>
  <div class="client-maps md-layout md-alignment-top-center">
    <ClientMapDisplay
      class="md-layout-item"
      v-for="({name, state, homeMapPlayer, winner}, index) in selectedMapsAndState"
      :key="index"
      :name="name"
      :state="state"
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
  width: 100%;
  margin-top: 7rem;
  position: absolute;
  top: 0;
}
</style>
