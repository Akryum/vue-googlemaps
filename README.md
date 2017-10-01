# vue-googlemaps

[![npm](https://img.shields.io/npm/v/vue-googlemaps.svg) ![npm](https://img.shields.io/npm/dm/vue-googlemaps.svg)](https://www.npmjs.com/package/vue-googlemaps)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Integrate Google Maps in your Vue application

> This library is Work In Progress.
> More components will be available in the 1.0 release.

[Live demo](https://akryum.github.io/vue-googlemaps/)

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
  }"
  @results="results => ..."
>
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
  }"
  @results="results => ..."
>
  <template scope="props">
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
	<template scope="props">
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
