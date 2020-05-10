<template>
  <div>
    <TechUpgradeOverlayControls />
    <CivListDisplay :civ-list="this.$store.getters.getCivNames" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TechUpgradeOverlayControls from "./TechUpgradeOverlayControls.vue";
import CivListDisplay from "./CivListDisplay.vue";

export default {
  name: "AdminTechUpgradeOverlay",
  props: {},
  computed: {
    ...mapState({
      controlOptions: state => state.techUpgradeOverlayControlOptions
    })
  },
  components: {
    CivListDisplay,
    TechUpgradeOverlayControls
  }
};
</script>

<style language="scss">
</style>
