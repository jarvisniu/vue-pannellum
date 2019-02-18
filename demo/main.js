import Vue from 'vue'
import VuePannellum from '../src/vue-pannellum.vue'

import App from './app.vue'
Vue.component('app', App)
Vue.component('VPannellum', VuePannellum)

new Vue({
  el: '#app',
  render: h => h('app')
})
