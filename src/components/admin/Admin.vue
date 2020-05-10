<template>
  <div>
    <div>test</div>
    <CivListDisplay :civ-list="this.$store.state.civNames" />
  </div>
</template>

<script>
import CivListDisplay from "./CivListDisplay.vue";

export default {
  name: "Admin",
  props: {
    clientId: String
  },
  components: {
    CivListDisplay
  }
};
</script>

<style language="scss">
</style>
