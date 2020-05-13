<template>
  <div>
    <ClientOverlays />
    <div>{{clientId}}</div>
  </div>
</template>

<script>
import ClientOverlays from "./ClientOverlays.vue";

export default {
  name: "Home",
  props: {
    clientId: String
  },
  components: {
    ClientOverlays
  },
  created: function() {
    console.log("App created", this.clientId);
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
