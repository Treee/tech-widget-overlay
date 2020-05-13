<template>
  <div>
    <CivBonusOverlay
      v-if="isVisible()"
      :civ1="this.$store.state.civ1"
      :civ1-description="this.$store.getters.getCivDescription(this.$store.state.civ1)"
      :upgrade-groups="this.$store.state.upgradeGroups"
      :civ2="this.$store.state.civ2"
      :civ2-description="this.$store.getters.getCivDescription(this.$store.state.civ2)"
      :playSound="false"
    />
    <MapOverlay />
  </div>
</template>

<script>
import CivBonusOverlay from "./tech-upgrade-overlay/CivBonusOverlay.vue";
import MapOverlay from "./maps-overlay/MapOverlay.vue";

export default {
  name: "ClientOverlay",
  components: {
    CivBonusOverlay,
    MapOverlay
  },
  methods: {
    isVisible() {
      return !(this.civ1 === "" || this.civ2 === "");
    }
  }
};
</script>

<style>
</style>
