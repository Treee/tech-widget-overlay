import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Home from './components/client-overlays/Home.vue';
import Admin from './components/admin/Admin.vue';

import aoe2Api from "./api";
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueRouter);

const routes = [
  { path: '/:clientId/admin', component: Admin, props: true },
  { path: '/:clientId', component: Home, props: true }
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
    Home,
    Admin
  },
  created: function () {
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
  }
});
