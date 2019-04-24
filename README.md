# vue-googlemaps

[![npm](https://img.shields.io/npm/v/vue-googlemaps.svg) ![npm](https://img.shields.io/npm/dm/vue-googlemaps.svg)](https://www.npmjs.com/package/vue-googlemaps)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Integrate Google Maps in your Vue application in a "Vue-way".

> This library is Work In Progress.
> More components will be available in the 1.0 release.

[Live demo](https://akryum.github.io/vue-googlemaps/)

The main objective of the library is to use Google Maps using Vue components in a way that feels natural to Vue developpers (with props, events, slots...).


<p>
  <a href="https://www.patreon.com/akryum" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
  </a>
</p>

## Sponsors

### Gold

<p align="center">
  <a href="https://www.sumcumo.com/en/" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/570728242399674380/logo-sumcumo.png" alt="sum.cumo logo" width="400px">
  </a>
</p>

### Silver

<p align="center">
  <a href="https://vueschool.io/" target="_blank">
    <img src="https://vueschool.io/img/logo/vueschool_logo_multicolor.svg" alt="VueSchool logo" width="200px">
  </a>

  <a href="https://www.vuemastery.com/" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267759130607630/Vue-Mastery-Big.png" alt="Vue Mastery logo" width="200px">
  </a>
</p>

### Bronze

<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/537832759985700914/537832771691872267/Horizontal_Logo_-_Dark.png" width="100">
  </a>

  <a href="https://www.frontenddeveloperlove.com/" target="_blank" title="Frontend Developer Love">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267744249085953/frontend_love-logo.png" width="56">
  </a>
</p>

<br>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Builtin components](#builtin-components)
- [Create you own components](#create-you-own-components)
- [Quick Examples](#quick-examples)

## Installation

```
npm i -S vue-googlemaps
```

```
yarn add vue-googlemaps
```

*You need to [polyfill](https://babeljs.io/docs/usage/polyfill/) some ES2015 features in old browsers.*

## Usage

You need a Google API key from the [developer console](http://console.developers.google.com/).

```js
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'

Vue.use(VueGoogleMaps, {
  load: {
    // Google API key
    apiKey: 'your-google-api-key',
    // Enable more Google Maps libraries here
    libraries: ['places'],
    // Use new renderer
    useBetaRenderer: false,
  },
})
```

## Builtin components

(Documentation is work-in-progress)

- Circle
- Geocoder
- Map
- Marker
- NearbyPlaces
- PlaceDetails
- UserPosition
- *More to come!*

## Create you own components

Here is an example of what a `Marker` component would look like:

```js
import { MapElement } from 'vue-googlemaps'

// Those Vue props will update automatically
// (Two-way binding with .sync modifier)
const boundProps = [
  'animation',
  'clickable',
  'cursor',
  'draggable',
  // ...
]

// Events from Google Maps emitted as Vue events
const redirectedEvents = [
  'click',
  'rightclick',
  'dblclick',
  'drag',
  // ...
]

export default {
  mixins: [
    // You need to use this mixin
    MapElement,
  ],

  // When Google Maps is ready
  googleMapsReady () {
    const options = Object.assign({}, this.$props)
    options.map = this.$_map

    // Create Google Maps objects
    this.$_marker = new window.google.maps.Marker(options)
    // Bind the Vue props
    this.bindProps(this.$_marker, boundProps)
    // Emit the events from Google Maps
    this.redirectEvents(this.$_marker, redirectedEvents)
  },

  beforeDestroy () {
    // Teardown
    if (this.$_marker) {
      this.$_marker.setMap(null)
    }
  },
}
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
  }"
  @results="results => ..."
>
  <template slot-scope="props">
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
  }"
  @results="results => ..."
>
  <template slot-scope="props">
    <div class="name">{{ props.results[1].name }}</div>
    <div class="address">{{ props.results[0].formatted_address }}</div>
  </template>
</googlemaps-geocoder>
```

### Nearby places

```html
<googlemaps-map
  @idle="map => mapBounds = map.getBounds()"
/>

<googlemaps-nearby-places
  :request="{
    bounds: mapBounds
  }"
  :filter="result => !result.types.includes('locality')"
  @results="results => ..."
>
  <template slot-scope="props">
    <div v-if="props.loading">Loading...</div>

    <div v-for="result of props.result">
      <div>
        <img
          v-if="result.photos"
          :src="result.photos[0].getUrl({ maxWidth: 80, maxHeight: 80 })"
        />
        {{ result.name }}
      </div>
      <div>{{ result.vicinity }}</div>
    </div>
  </template>
</googlemaps-nearby-places>
```
