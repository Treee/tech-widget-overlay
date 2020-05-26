<template>
  <div>
    <CivUnitDisplay v-for="civ in civList" :key="civ" :civ-name="civ" @civselected="civClicked" />
  </div>
</template>

<script>
import CivUnitDisplay from "./CivUnitDisplay.vue";

export default {
  name: "CivListDisplay",
  data() {
    return {
      count: 0
    };
  },
  props: {
    civList: Array
  },
  components: {
    CivUnitDisplay
  },
  methods: {
    civClicked(selectedCiv) {
      const data = {
        civ1: this.$store.state.techUpgradeOverlayControlOptions.civ1,
        civ2: this.$store.state.techUpgradeOverlayControlOptions.civ2
      }; // toggle clicks between player 1 and player 2
      if (this.count % 2 === 0) {
        if (this.$store.getters.isPlayerOne(selectedCiv)) {
          data.civ1 = "";
        } else {
          data.civ1 = selectedCiv;
        }
      } else {
        if (this.$store.getters.isPlayerTwo(selectedCiv)) {
          data.civ2 = "";
        } else {
          data.civ2 = selectedCiv;
        }
      }
      this.count++;
      this.$store.commit("updateCivs", data);
    }
  }
};
</script>

<style language="scss">
</style>
