<!--Panorama viewer pannellum wrap.-->
<template>
  <div
    class="vue-pannellum"
    @mouseup="onMouseUp"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="info">{{ info }}</div>
    <div class="default-slot">
      <slot/>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash.debounce'
import 'pannellum'
import 'pannellum/build/pannellum.css'

export default {
  props: {
    debug: { type: Boolean, default: false },
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
      info: '',
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
    },
    onMouseUp () {
      if (this.debug) this.info += ' mu'
      this.debounceRotate()
    },
    onTouchMove () {
      if (this.debug) this.info += ' tm'
    },
    onTouchEnd () {
      if (this.debug) this.info += ' te'
      this.debounceRotate()
    },
    debounceRotate: _debounce(function () {
      if (this.autoRotate) this.viewer.startAutoRotate()
    }, 3000),
  },
}
</script>

<style scoped>
.vue-pannellum {
  position: relative;
}

.info {
  position: absolute;
  background-color: hsla(0, 0%, 100%, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
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
