<template>
  <div class="app">
    <v-pannellum
      class="pannellum"
      :src="url"
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
    <div class="controls">
      <button @click="url = equirectangularUrl">equirect</button>
      <button @click="url = cubemapUrls">cubemaps</button>
    </div>
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
      url: equirectangularUrl,
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

.controls
  position fixed
  left 10px
  bottom 10px
</style>
