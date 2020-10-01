<template>
  <div class="app">
    <v-pannellum
      v-if="show"
      class="pannellum"
      :src="url"
      :preview="cubemapUrls.px"
      :auto-rotate="isAutoRotationOn"
      :orientation="isOrientationOn"
      :auto-load="true"
      :show-zoom="false"
      :show-fullscreen="false"
      :compass="true"
      :hotSpots="hotSpots"
      :hfov.sync="hfov"
      :yaw.sync="yaw"
      :pitch.sync="pitch"
    ></v-pannellum>
    <div class="controls">
      <label>
        <span>Type:</span>
        <button @click="url = equirectangularUrl">equirect</button>
        <button @click="url = cubemapUrls">cubemaps</button>
      </label>
      <label>
        <span>Hfov:</span>
        <input type="text" v-model.number="hfov" style="width: 50px;">
      </label>
      <label>
        <span>Yaw:</span>
        <input type="text" v-model.number="yaw" style="width: 50px;">
      </label>
      <label>
        <span>Pitch:</span>
        <input type="text" v-model.number="pitch" style="width: 50px;">
      </label>
      <label>
        <input type="checkbox" v-model="show">
        <span>Show</span>
      </label>
      <label>
        <input type="checkbox" v-model="isAutoRotationOn">
        <span>Auto Rotation</span>
      </label>
      <label>
        <input type="checkbox" v-model="isOrientationOn">
        <span>Orientation</span>
      </label>
    </div>
  </div>
</template>

<script>
import equirectangularUrl from './equirectangular/wooden-lounge.png'
// import equirectangularUrl from './equirectangular/cube.jpg'

import px from './cubemaps/px.jpg'
import nx from './cubemaps/nx.jpg'
import py from './cubemaps/py.jpg'
import ny from './cubemaps/ny.jpg'
import pz from './cubemaps/pz.jpg'
import nz from './cubemaps/nz.jpg'

export default {
  data () {
    return {
      show: true,
      hfov: 90,
      yaw: -90,
      pitch: 0,
      url: equirectangularUrl,
      equirectangularUrl,
      cubemapUrls: { pz, px, nz, nx, py, ny },
      isAutoRotationOn: false,
      isOrientationOn: false,
      hotSpots: [
        {
          pitch: 14.1,
          yaw: 1.5,
          type: "info",
          text: "Click me to Google",
          URL: "https://google.com/"
        },
        {
          pitch: 0,
          yaw: -90,
          type: "info",
          text: "I am <b>bold</b> text."
        },
        {
          pitch: -0.9,
          yaw: 144.4,
          type: "info",
          text: "Info 2"
        }
      ],
    }
  },
}
</script>

<style>
html,
body,
.app,
.pannellum {
  height: 100%;
}

body {
  margin: 0;
}

.controls {
  position: fixed;
  left: 10px;
  bottom: 10px;
  padding: 5px;
  border: solid 1px silver;
  background-color: hsla(0, 0%, 100%, 0.3);
  z-index: 10;
}
</style>
