<template>
  <div class="app">
    <v-pannellum
      class="pannellum"
      :src="equirectangularUrl"
      :preview="cubemapUrls.px"
      auto-rotate
      :auto-load="true"
      :show-zoom="false"
      :show-fullscreen="false"
      :compass="false"
      :hfov="90"
      :yaw="-90"
      :pitch="0"
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


export default {
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
