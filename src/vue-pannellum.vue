<!--Panorama viewer pannellum wrap.-->
<template>
  <div></div>
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
    hfov: { type: Number, default: 100 },
    yaw: { type: Number, default: 0 },
    pitch: { type: Number, default: 0 },
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
  mounted () {
    let options = {
      type: typeof this.src === 'string' ? 'equirectangular' : 'cubemap',
      autoLoad: this.autoLoad,
      autoRotate: this.autoRotate === true ? -2 : 0,
      compass: this.compass,
      preview: this.preview,
      hfov: this.hfov,
      yaw: this.yaw,
      pitch: this.pitch,
      // haov: 149.87,
      // vaov: 54.15,
    }
    Object.assign(options, this.srcOption)
    window.pannellum.viewer(this.$el, options)
    if (this.showZoom === false) {
      this.$el.querySelector('.pnlm-zoom-controls').style.display = 'none'
    }
    if (this.showFullscreen === false) {
      this.$el.querySelector('.pnlm-fullscreen-toggle-button').style.display = 'none'
    }
  }
}
</script>
