import Vue from 'vue';
import VueRx from 'vue-rx';
import App from './App.vue';

import 'vue-croppa/dist/vue-croppa.css';

const Croppa = require('vue-croppa');

Vue.use(VueRx);
Vue.use(Croppa);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
