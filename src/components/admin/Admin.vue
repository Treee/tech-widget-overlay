<template>
  <div>
    <CivListDisplay :civ-list="this.$store.getters.getGetCivNames" />
  </div>
</template>

<script>
import CivListDisplay from "./CivListDisplay.vue";

export default {
  name: "Admin",
  props: {},
  components: {
    CivListDisplay
  }
};
</script>

<style language="scss">
</style>
