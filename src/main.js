import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import Admin from './components/admin/Admin.vue';

import store from './store';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/admin/:clientId', component: Admin, props: true },
  { path: '/:clientId', component: App, props: true }
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
  // render: h => h(App)
});
