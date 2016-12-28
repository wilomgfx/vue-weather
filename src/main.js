import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import apiMixin from './mixins/apiMixin.js';

Vue.prototype.bus = new Vue();

Vue.use(VueAxios, axios)

Vue.mixin(apiMixin);

new Vue({
  el: '#app',
  render: h => h(App)
})

