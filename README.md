# vue-pannellum

Vue wrap of the brilliant panorama viewer Pannellum

## Usage
Install
```
npm install vue-pannellum
```

Register
```js
import Vue from 'vue'
import VuePannellum from 'vue-pannellum'

Vue.component('VPannellum', VuePannellum)
```

Use
```html
<v-pannellum :src="equirectangularUrl" style="height: 500px;"></v-pannellum>
```

## API

Component props:

- **src (required)**: The equirectangular image url or cubemap urls in this format: {px: pxUrl, nx: nxUrl, ... }.
- **preview**: The preview image url before loaded.
- **autoLoad (boolean, default: true)**: Whether automatically load.
- **autoRotate (number|boolean, default: 0)**: The auto-rotate speed, 0 or false means disabled, true is -2.
- **orientation (boolean, default: false)**: Turn the orientation sensor on (if supported).
- **draggable (boolean, default: true)**: Allow rotating with mouse or touch dragging.
- **mouseZoom (boolean, default: true)**: Allow zooming with mouse.
- **showZoom (boolean, default: false)**: Show the zoom-in and zoom-out button.
- **showFullscreen (boolean, default: false)**: Show the fullscreen button.
- **compass (boolean, default: false)**: Show the compass indicator.
- **hotSpots (array, default: [])**: Show information on the panorama.
- **hfov (number, default: 75)**: The initial horizontal field of view in degrees.
- **yaw (number, default: 0)**: The initial yaw position in degrees.
- **pitch (number, default: 0)**: The initial pitch position in degrees.
- **minHfov (number, default: 30)**: The minimum limit of hfov in degrees.
- **maxHfov (number, default: 120)**: The maximum limit of hfov in degrees.

## Events

- `load`: When finish loading.
- `error`: When an error occurs, error message as parameter.

## Features
- type
- autoLoad
- autoRotate
- compass
- show/hide control button
- preview
- initial view: hfov/yaw/pitch
- slot
- watch url changing
- max/minHfov
- orientation

## Licence

MIT
