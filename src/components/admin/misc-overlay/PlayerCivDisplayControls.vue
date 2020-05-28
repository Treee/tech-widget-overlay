<template>
  <div class="misc-overlay-control-container">
    <md-switch
      v-model="isCivDisplayVisible"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Civ Display</md-switch>
    <md-switch
      v-model="showTeamColors"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Show Team Colors</md-switch>
    <md-switch
      v-model="showCurrentMapName"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Show Current Map</md-switch>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlayerCivDisplayControls",
  data() {
    return {
      isCivDisplayVisible: this.controlOptions?.isCivDisplayVisible || false,
      showTeamColors: this.controlOptions?.showTeamColors || false,
      showCurrentMapName: this.controlOptions?.showCurrentMapName || false
    };
  },
  computed: {
    ...mapState({
      controlOptions: state => state.miscOverlayControlOptions
    })
  },
  methods: {
    valueChanged() {
      this.$store.commit("updateMiscOverlayControlOptions", {
        ...this.$data
      });
      this.$emit("miscOverlayEmit", { ...this.$data });
    }
  }
};
</script> 

<style language="scss">
.misc-overlay-control-container {
  display: inline-flex;
  flex-direction: column;
}
</style>
