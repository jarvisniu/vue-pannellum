import Vue from 'vue'

import App from './app.vue'
Vue.component('app', App)

new Vue({
  el: '#app',
  render: h => h('app')
})
