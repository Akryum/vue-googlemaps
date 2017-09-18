# vue-googlemaps

[![npm](https://img.shields.io/npm/v/vue-googlemaps.svg) ![npm](https://img.shields.io/npm/dm/vue-googlemaps.svg)](https://www.npmjs.com/package/vue-googlemaps)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Integrate Google Maps in your Vue application

> This library is Work In Progress
> More components will be available in the 1.0 release

## Installation

```
npm i -S vue-googlemaps
```

```
yarn add vue-googlemaps
```

## Usage

```js
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'your-google-api-key',
    libraries: ['places'],
  },
})
```

## Quick Examples

### Map with markers

```html
<googlemaps-map
  :center.sync="center"
  :zoom.sync="zoom"
  :options="mapOptions"
  @idle="onIdle"
  @click="onMapClick">

  <!-- User Position -->
  <googlemaps-user-position
    @update:position="setUserPosition"
  />

  <googlemaps-marker
    v-for="marker of markers"
    :key="marker._id"
    :label="{
      color: marker === currentmarker ? 'white' : 'black',
      fontFamily: 'Material Icons',
      fontSize: '20px',
      text: 'star_rate',
    }"
    :position="marker.position"
    @click="selectMarker(marker._id)"
  />
</googlemaps-map>
```

### Place Details

```html
<googlemaps-place-details
  :request="{
    placeId: placeId
  }">
  <template scope="props">
    <div class="name">{{ props.results.name }}</div>
    <div class="address">{{ props.results.formatted_address }}</div>
  </template>
</googlemaps-place-details>
```

### Geocoder

```html
<googlemaps-geocoder
  :request="{
    location: latLng,
  }">
  <template scope="props">
    <div class="name">{{ props.results.name }}</div>
    <div class="address">{{ props.results.formatted_address }}</div>
  </template>
</googlemaps-geocoder>
```
