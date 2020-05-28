<template>
  <div class="current-map-display" v-show="showCurrentMapName && mapName !== ''">
    <div class="current-map-name">{{this.$store.getters.getFormattedMapName(mapName)}}</div>
  </div>
</template>

<script>
export default {
  name: "CurrentMapDisplay",
  props: {
    showCurrentMapName: Boolean,
    mapName: String
  }
};
</script> 

<style language="scss">
.current-map-display {
  display: inline-flex;
  width: 20%;
  position: absolute;
  left: 42.8%;
  top: 98%;
  opacity: 0.7;
}

.current-map-name {
  display: inline-block;
  font-weight: bold;
  font-size: large;
  font-family: "Memb-Font";
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
