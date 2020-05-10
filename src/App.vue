<template>
  <div id="app">
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
import websocketClient from "./client";
import aoe2Api from "./api";

import CivBonusOverlay from "./components/CivBonusOverlay.vue";

export default {
  name: "App",
  data: function() {
    return {
      client: null,
      aoe2Data: {}
    };
  },
  components: {
    CivBonusOverlay
  },
  methods: {
    isVisible() {
      return !(this.civ1 === "" || this.civ2 === "");
    },
    handleSocketMessage(event) {
      const message = JSON.parse(event.data);
      console.log("json", message);
      if (message.type === this.$store.state.SocketEnums.AdminShow) {
        this.$store.commit("updateCiv", message.data.civ);
        const upgradeItems = [];
        Object.keys(message.data.overlays).forEach(key => {
          if (key !== "all" && key !== "tech") {
            if (message.data.overlays[key]) {
              upgradeItems.push(key);
            }
          }
        });
        this.$store.commit("updateUpgradeGroups", upgradeItems);
      }
      if (message.type === this.$store.state.SocketEnums.AdminHideAll) {
        this.$store.commit("clearCivs");
        this.$store.commit("clearUpgradeGroups");
      }
    }
  },
  created: function() {
    this.client = websocketClient.startClient(
      "treee",
      this.handleSocketMessage
    );
    aoe2Api.getAoEData().then(aoeData => {
      console.log("aoeData", aoeData);
      console.log("data", aoeData.data);
      console.log("tech_tree_strings", aoeData.tech_tree_strings);

      this.aoe2Data = aoeData;
      console.log("age Names", aoeData.age_names);
      this.$store.commit("setAgeNames", aoeData.age_names);
      console.log("help texts", aoeData.civ_helptexts);
      this.$store.commit("setCivHelpTexts", aoeData.civ_helptexts);
      console.log("civ Names", aoeData.civ_names);
      this.$store.commit("setCivNames", aoeData.civ_names);
      console.log("strings", aoeData.strings);
      this.$store.commit("setDataStrings", aoeData.strings);
    });
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
</style>
