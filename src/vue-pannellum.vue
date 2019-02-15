<template>
  <div></div>
</template>

<script>
import 'pannellum'
import 'pannellum/build/pannellum.css'

export default {
  props: {
    url: { type: [String, Array], required: true },
    autoLoad: { type: Boolean, default: true },
    autoRotate: { type: [Number, Boolean], default: 0 },
  },
  mounted () {
    window.pannellum.viewer(this.$el, {
      type: this.url instanceof Array ? 'cubemap' : 'equirectangular',
      panorama: this.url,
      autoLoad: this.autoLoad,
      autoRotate: this.autoRotate === true ? -2 : 0,
      // preview: 'https://golang.github.io/dep/docs/assets/DigbyFlat.svg',
      // pitch: 2.3,
      // yaw: 135.4,
      // hfov: 90,
      // haov: 149.87,
      // vaov: 54.15,
    })
  }
}
</script>
