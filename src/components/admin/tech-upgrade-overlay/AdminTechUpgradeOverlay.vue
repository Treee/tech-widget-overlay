<template>
  <md-card md-with-hover class="card-style">
    <md-card-header>
      <div class="md-title">Technology Overlay</div>
      <div class="md-subhead">Controls</div>
    </md-card-header>
    <md-card-content>
      <TechUpgradeOverlayControls
        v-on:bubble-up-overlay-child="bubbleUpOverlay"
        v-on:bubble-up-clear-all-child="bubbleUpClearAll"
      />
    </md-card-content>
    <md-card-header>
      <div class="md-subhead">Civilizations</div>
    </md-card-header>
    <md-card-content>
      <CivListDisplay :civ-list="this.$store.getters.getCivNames" />
    </md-card-content>
  </md-card>
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
  },
  methods: {
    bubbleUpOverlay(data) {
      this.$emit("techOverlayShow", data);
    },
    bubbleUpClearAll() {
      this.$emit("techOverlayClearAll");
    }
  }
};
</script>

<style language="scss">

</style>
