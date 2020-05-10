<template>
  <div>
    <md-button class="md-raised">Clear All</md-button>
    <md-switch
      v-for="(controlValue, key, index) in controlOptions"
      :key="index"
      v-model="controlOptions[key]"
    >{{key}}</md-switch>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TechUpgradeOverlayControls",
  props: {},
  computed: {
    ...mapState({
      controlOptions: state => state.techUpgradeOverlayControlOptions
    })
  }
};
</script>

<style language="scss">
</style>
