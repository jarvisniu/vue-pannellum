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
// import 'pannellum'
// import 'pannellum/build/pannellum.css'
import '../lib/pannellum/pannellum.js'
import '../lib/pannellum/pannellum.css'

export default {
  props: {
    debug: { type: Boolean, default: false },
    src: { type: [String, Object], required: true },
    preview: { type: String, default: '' },
    autoLoad: { type: Boolean, default: true },
    autoRotate: { type: [Number, Boolean], default: 0 },
    orientation: { type: Boolean, default: false },
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
      rafId: -1,
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
    hfov (val) {
      if (this.viewer) this.viewer.setHfov(val, false)
    },
    yaw (val) {
      if (this.viewer) this.viewer.setYaw(val, false)
    },
    pitch (val) {
      if (this.viewer) this.viewer.setPitch(val, false)
    },
    maxHfov (val) {
      if (this.viewer) {
        this.viewer.setHfovBounds([this.minHfov, this.maxHfov])
      }
    },
    minHfov (val) {
      if (this.viewer) {
        this.viewer.setHfovBounds([this.minHfov, this.maxHfov])
      }
    },
    autoRotate (val) {
      if (val) {
        this.viewer.startAutoRotate()
      } else {
        this.viewer.stopAutoRotate()
        if (this.orientation) this.viewer.startOrientation()
      }
    },
    orientation (val) {
      if (val) {
        this.viewer.startOrientation()
      } else {
        this.viewer.stopOrientation()
        if (this.autoRotate) this.viewer.startAutoRotate()
      }
    },
  },
  mounted () {
    this.load()
    this.rafId = window.requestAnimationFrame(this.loop)
  },
  beforeDestroy() {
    this.viewer.destroy()
    window.cancelAnimationFrame(this.rafId)
  },
  methods: {
    load () {
      let options = {
        type: typeof this.src === 'string' ? 'equirectangular' : 'cubemap',
        autoLoad: this.autoLoad,
        autoRotate: this.autoRotate === true ? -2 : 0,
        orientationOnByDefault: this.orientation,
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
      this.viewer.on('load', () => {
        this.$emit('load')
      })
      this.viewer.on('error', (err) => {
        this.$emit('error', err)
      })
      if (this.showZoom === false) {
        this.$el.querySelector('.pnlm-zoom-controls').style.display = 'none'
      }
      if (this.showFullscreen === false) {
        this.$el.querySelector('.pnlm-fullscreen-toggle-button').style.display = 'none'
      }
    },
    loop () {
      this.rafId = window.requestAnimationFrame(this.loop)
      let hfov = this.viewer.getHfov()
      let yaw = this.viewer.getYaw()
      let pitch = this.viewer.getPitch()
      if (hfov != this.hfov) this.$emit('update:hfov', hfov)
      if (yaw != this.yaw) this.$emit('update:yaw', yaw)
      if (pitch != this.pitch) this.$emit('update:pitch', pitch)
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
      // priority of orientation is higher
      if (this.orientation) this.viewer.startOrientation()
      else if (this.autoRotate) this.viewer.startAutoRotate()
    }, 3000),
  },
}
</script>

<style>
.pnlm-ui .pnlm-about-msg {
  display: none !important;
}

.pnlm-ui .pnlm-orientation-button {
  display: none !important;
}
</style>

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

.default-slot {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
}
</style>
