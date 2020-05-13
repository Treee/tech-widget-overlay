<template>
  <div class="player-civ-overlay">
    <md-switch
      v-model="isCivDisplayVisible"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Civ Display</md-switch>
    <md-field>
      <label for="civ-names">Civilizations</label>
      <md-select
        v-model="selectedCivs"
        v-on:md-selected="valueChanged"
        multiple
        name="civ-names"
        id="civ-names"
      >
        <md-option value></md-option>
        <md-option
          v-for="(value, index) in this.$store.getters.getCivNames"
          :key="index"
          :value="value"
        >{{value}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlayerCivOverlayControls",
  computed: {
    ...mapState({
      controlOptions: state => state.playerCiveOverlayControlOptions
    })
  },
  data() {
    return {
      selectedCivs: this.controlOptions?.selectedCivs,
      isCivDisplayVisible: this.controlOptions?.isCivDisplayVisible
    };
  },
  methods: {
    valueChanged() {
      console.log("changed");
      this.$store.commit("updatePlayerCiveOverlayControlOptions", {
        ...this.$data
      });
    }
  }
};
</script>

<style language="scss">
.player-civ-overlay {
  border: 1px solid black;
}
</style>
