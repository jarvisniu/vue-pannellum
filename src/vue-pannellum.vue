<docs>
Panorama viewer pannellum wrap.
Features:
- [x] type
- [x] autoLoad
- [x] autoRotate
- [x] compass
- [x] show/hide control button
- [ ] preview
- [ ] initial view: hfov/yaw/pitch
- [ ] props changing watch
- [ ] slot: left right
</docs>

<template>
  <div></div>
</template>

<script>
import 'pannellum'
import 'pannellum/build/pannellum.css'

export default {
  props: {
    src: { type: [String, Object], required: true },
    autoLoad: { type: Boolean, default: true },
    autoRotate: { type: [Number, Boolean], default: 0 },
    showZoom: { type: Boolean, default: false },
    showFullscreen: { type: Boolean, default: false },
    compass: { type: Boolean, default: false },
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
      // preview: 'https://golang.github.io/dep/docs/assets/DigbyFlat.svg',
      // pitch: 2.3,
      // yaw: 135.4,
      // hfov: 90,
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
