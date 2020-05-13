<template>
  <div>
    <ClientOverlays />
  </div>
</template>

<script>
import ClientOverlays from "./components/client-overlays/ClientOverlays.vue";

export default {
  name: "App",
  props: {},
  components: {
    ClientOverlays
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

.overlay-container {
  width: 99vw;
  display: inline-flex;
}
</style>
