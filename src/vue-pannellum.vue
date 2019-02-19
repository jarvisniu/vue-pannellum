<!--Panorama viewer pannellum wrap.-->
<template>
  <div class="vue-pannellum">
    <div class="default-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import 'pannellum'
import 'pannellum/build/pannellum.css'

export default {
  props: {
    src: { type: [String, Object], required: true },
    preview: { type: String, default: '' },
    autoLoad: { type: Boolean, default: true },
    autoRotate: { type: [Number, Boolean], default: 0 },
    showZoom: { type: Boolean, default: false },
    showFullscreen: { type: Boolean, default: false },
    compass: { type: Boolean, default: false },
    hfov: { type: Number, default: 75 },
    minHfov: { type: Number, default: 30 },
    maxHfov: { type: Number, default: 120 },
    yaw: { type: Number, default: 0 },
    pitch: { type: Number, default: 0 },
  },
  data () {
    return {
      viewer: null,
    }
  },
  computed: {
    srcOption () {
      return typeof this.src === 'string' ? {
        panorama: this.src,
      } : {
        cubeMap: [
          this.src.pz,
          this.src.px,
          this.src.nz,
          this.src.nx,
          this.src.py,
          this.src.ny,
        ]
      }
    },
  },
  watch: {
    src (val) {
      this.$el.innerHTML = ''
      this.$nextTick(this.load)
    },
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      let options = {
        type: typeof this.src === 'string' ? 'equirectangular' : 'cubemap',
        autoLoad: this.autoLoad,
        autoRotate: this.autoRotate === true ? -2 : 0,
        compass: this.compass,
        preview: this.preview,
        hfov: this.hfov,
        yaw: this.yaw,
        pitch: this.pitch,
        minHfov: this.minHfov,
        maxHfov: this.maxHfov,
        // haov: 149.87,
        // vaov: 54.15,
      }
      Object.assign(options, this.srcOption)
      this.viewer = window.pannellum.viewer(this.$el, options)
      if (this.showZoom === false) {
        this.$el.querySelector('.pnlm-zoom-controls').style.display = 'none'
      }
      if (this.showFullscreen === false) {
        this.$el.querySelector('.pnlm-fullscreen-toggle-button').style.display = 'none'
      }
    }
  },
}
</script>

<style>
.vue-pannellum {
  position: relative;
}

.vue-pannellum .pnlm-about-msg {
  display: none !important;
}

.default-slot {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
}
</style>
