import mapboxgl from 'mapbox-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ArcLayer } from '@deck.gl/layers';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { scaleLog } from 'd3-scale';
import { h3ToGeo } from 'h3-js';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';



import { Deck } from '@deck.gl/core';


import { load } from '@loaders.gl/core';
import { CSVLoader } from '@loaders.gl/csv';

// Set your mapbox token here
mapboxgl.accessToken = 'pk.eyJ1Ijoia2lydGlzaCIsImEiOiJja2N4cjNvY2YwMnAzMnltdjQ0dzd0NHN0In0.F5BaepKPJjvC_Rp8rHUVyA'; // eslint-disable-line

// const lat = object.position[1];
// const lng = object.position[0];
// const count = object.points.length;

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  radiusPixels: 2,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};


const colorScale = scaleLog()
  .domain([10, 100, 1000, 10000])
  .range([[255, 255, 178], [254, 204, 92], [253, 141, 60], [227, 26, 28]]);

 

export function renderToDOM(container, data) {
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v9',
    antialias: true,
    center: [65.186647481789, 39.660324764558123],
    zoom: 1.8,
   
    type: 'heatmap'
  });78563698234931

  map.addControl(new mapboxgl.NavigationControl(), 'top-left');

  const radius = 1000;
  const upperPercentile = 100
  const coverage = 1

  const deck = new Deck({
    gl: map.painter.context.gl,
    layers: [
     
      new HeatmapLayer({
        id: 'hex',
        data: data,
        getPosition: d => [d.lon, d.lat],
        getWeight: d => 1,
        radiusPixels: 60,        
      
      }),


      //   new HexagonLayer({
      //     id: 'hex',
      //     data: data,
      //     getPosition: d => [d.lng, d.lat],
      //     // getElevationWeight: d => 1,
      //     elevationRange: [0, 3000],
      //     elevationScale: data && data.length ? 50 : 0,
      //     elevationScale: 100,
      //     extruded: true,
      //     radius: 1,         
      //     opacity: 0.6,        
      //     radius,
      //     upperPercentile,
      //     material,
      //     coverage,
      //     ambientLight,
      // }),

    //   new ScatterplotLayer({
    //     id: 'my-scatterplot',
    //     data: data,
    //     getPosition: d => [d.lon,d.lat],
    //     getRadius: d => 0.01,
    //     getFillColor: [66, 135, 245],
    //     opacity:0.5,
    //     pickable: true,
    // }),
    ]
  });

  map.on('load', () => {
    map.addLayer({
      id: '3d-buildings',
      source: 'composite',
      'source-layer': 'building',
      filter: ['==', 'extrude', 'true'],
      type: 'fill-extrusion',
      minzoom: 14,
      paint: {
        'fill-extrusion-color': '#ccc',
        'fill-extrusion-height': ['get', 'height']
      }
    });
    // map.addLayer(new MapboxLayer({id: 'my-scatterplot', deck}));
    map.addLayer(new MapboxLayer({ id: 'hex', deck }));



    // renderLayers(map, data);
  });

  return {
    update: newData => renderLayers(map, newData),
    remove: () => {
      map.remove();
    }
  };
}



export async function loadAndRender(container) {
  // const data = await load(
  //   'https://raw.githubusercontent.com/kirtish10/PX4_Global_Home_Positions/master/global_home_positions.csv',
  //   CSVLoader
  // );
  const data = './global_home_positions.json'
  // const data = await load("https://us-gun-violence.web.app/gundata.json");
  console.log(typeof(data));
  renderToDOM(container, data);
}
