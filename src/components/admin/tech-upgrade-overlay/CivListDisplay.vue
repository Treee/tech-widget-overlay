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
      const data = { civ1: "", civ2: "" };
      if (this.count % 2 === 0) {
        data.civ1 = selectedCiv;
      } else {
        data.civ2 = selectedCiv;
      }
      this.$store.commit("updateCivs", data);
      this.count++;
    }
  }
};
</script>

<style language="scss">
</style>
