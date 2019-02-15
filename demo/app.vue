<template>
  <div>
    <h3>VuePannellumn Demo</h3>
    <v-pannellum
      class="pannellum"
      :url="panoramaUrl"
      auto-rotate
    ></v-pannellum>
  </div>
</template>

<script>
import VuePannellum from '../src/vue-pannellum.vue'

export default {
  components: {
    VPannellum: VuePannellum,
  },
  data () {
    return {
      panoramaUrl: 'https://pannellum.org/images/alma.jpg',
      cubemapUrls: [
        "/images/wyman-park-playground-cubic/face0.jpg",
        "/images/wyman-park-playground-cubic/face1.jpg",
        "/images/wyman-park-playground-cubic/face2.jpg",
        "/images/wyman-park-playground-cubic/face3.jpg",
        "/images/wyman-park-playground-cubic/face4.jpg",
        "/images/wyman-park-playground-cubic/face5.jpg"
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
.pannellum
  width 500px
  height 500px
  border solid 1px silver
</style>
