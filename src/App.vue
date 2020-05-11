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
  </div>
</template>

<script>
import CivBonusOverlay from "./components/tech-upgrade-overlay/CivBonusOverlay.vue";

export default {
  name: "App",
  props: {},
  components: {
    CivBonusOverlay
  },
  methods: {
    isVisible() {
      return !(this.civ1 === "" || this.civ2 === "");
    }
  }
};
</script>

<style>
@font-face {
  font-family: "Memb-Font";
  src: url("/assets/fonts/IronstrikeSemiBold.otf");
}
#app {
  font-family: Memb-Font;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.large-font {
  font-size: large;
}
</style>
