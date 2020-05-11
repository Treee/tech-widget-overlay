<template>
  <div>
    <md-button class="md-raised">Clear All</md-button>
    <md-switch
      v-for="(controlValue, key, index) in controlOptions"
      :key="index"
      v-model="controlOptions[key]"
    >{{toCamelCase(key)}}</md-switch>
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
  },
  methods: {
    toCamelCase(text) {
      let camelCase = "";
      text.split("-").forEach(word => {
        camelCase = camelCase
          .concat(word.charAt(0).toUpperCase())
          .concat(word.substring(1))
          .concat(" ");
      });
      return camelCase;
    }
  }
};
</script>

<style language="scss">
</style>
