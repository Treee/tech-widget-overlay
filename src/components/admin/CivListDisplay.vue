<template>
  <div>
    <CivUnitDisplay v-for="civ in civList" :key="civ" :civ-name="civ" />
  </div>
</template>

<script>
import CivUnitDisplay from "./CivUnitDisplay.vue";

export default {
  name: "CivListDisplay",
  props: {
    civList: Array
  },
  components: {
    CivUnitDisplay
  }
};
</script>

<style language="scss">
</style>
