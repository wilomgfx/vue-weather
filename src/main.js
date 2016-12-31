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

function containsObjProperty(obj, prop, list){
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i][prop] === obj[prop]) {
          return true;
      }
  }

  return false;
}
Array.prototype.containsObjProperty = containsObjProperty;