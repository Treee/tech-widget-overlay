import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import Admin from './components/admin/Admin.vue';

import store from './store';

import websocketClient from "./client";
import aoe2Api from "./api";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/admin', component: Admin },
  { path: '/', component: App }
];


const router = new VueRouter({
  mode: 'history',
  routes: routes
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  components: {
    App,
    Admin
  },
  created: function () {
    this.client = websocketClient.startClient(
      "treee",
      this.handleSocketMessage
    );
    aoe2Api.getAoEData().then(aoeData => {
      // console.log("aoeData", aoeData);
      // console.log("data", aoeData.data);
      // console.log("tech_tree_strings", aoeData.tech_tree_strings);

      this.aoe2Data = aoeData;
      // console.log("age Names", aoeData.age_names);
      this.$store.commit("setAgeNames", aoeData.age_names);
      // console.log("help texts", aoeData.civ_helptexts);
      this.$store.commit("setCivHelpTexts", aoeData.civ_helptexts);
      // console.log("civ Names", aoeData.civ_names);
      this.$store.commit("setCivNames", aoeData.civ_names);
      // console.log("strings", aoeData.strings);
      this.$store.commit("setDataStrings", aoeData.strings);
    });
  },
  methods: {
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
  }
});
