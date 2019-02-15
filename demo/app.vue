<template>
  <div class="app">
    <v-pannellum
      class="pannellum"
      :src="cubemapUrls"
      auto-rotate
      :show-zoom="false"
      :show-fullscreen="false"
      :compass="false"
    ></v-pannellum>
  </div>
</template>

<script>
import equirectangularUrl from './equirectangular/wooden-lounge.png'
import px from './cubemaps/px.jpg'
import nx from './cubemaps/nx.jpg'
import py from './cubemaps/py.jpg'
import ny from './cubemaps/ny.jpg'
import pz from './cubemaps/pz.jpg'
import nz from './cubemaps/nz.jpg'

import VuePannellum from '../src/vue-pannellum.vue'

export default {
  components: {
    VPannellum: VuePannellum,
  },
  data () {
    return {
      equirectangularUrl,
      cubemapUrls: { pz, px, nz, nx, py, ny },
    }
  },
}
</script>

<style lang="stylus">
html
body
.app
.pannellum
  height 100%

body
  margin 0

</style>
