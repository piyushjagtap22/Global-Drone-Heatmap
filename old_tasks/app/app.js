
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
import {csv2geojson} from 'csv2geojson'
import {mapboxgl} from 'mapbox-gl';
// Set your mapbox token here
mapboxgl.accessToken = 'pk.eyJ1Ijoia2lydGlzaCIsImEiOiJja2N4cjNvY2YwMnAzMnltdjQ0dzd0NHN0In0.F5BaepKPJjvC_Rp8rHUVyA'; // eslint-disable-line

export function renderToDOM(container, data) {

  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v9',
    antialias: true,
    center: [23.186647481789, 77.660324764558123],
    zoom: 1.8,
    type: 'heatmap'
  });
 console.log()
  map.addControl(new mapboxgl.NavigationControl(), 'top-left');


  const deck = new Deck({

    gl: map.painter.context.gl,
    layers: [
     
     new HeatmapLayer({
        id: 'hex',
        data: data,
        getPosition: d => [d.lon, d.lat],
        getWeight: d => 1,
        radiusPixels: 15,
        
        aggregation: 'MEAN',
        pickable: true,
        threshold:0.03,
        intensity:1,
        colorRange:[[33,102,172], [103,169,207], [209,229,240], [253,219,199],[239,138,98],[178,4,43]],
    
      }),
    ]
  });


  map.on('load',  () => {
    // Add a geojson point source.
    // Heatmap layers also work with a vector tile source.
    console.log(data)
    // map.addSource('earthquakes', {
    //     'type': 'geojson',
    //     'data': '10_may_global_home_positions.geojson',
    // });
    map.addLayer(new MapboxLayer({ id: 'hex', deck }));
    // map.addLayer(
    //     {
    //         'id': 'earthquakes-heat',
    //         'type': 'heatmap',
    //         'source': 'earthquakes',
    //         'maxzoom': 9,
    //         'paint': {
    //             // Increase the heatmap weight based on frequency and property magnitude
    //             'heatmap-weight': {
    //               property: 'dbh',
    //               type: 'exponential',
    //               stops: [
    //                 [1, 0],
    //                 [62, 1]
    //               ]
    //             },
    //             // Increase the heatmap color weight weight by zoom level
    //             // heatmap-intensity is a multiplier on top of heatmap-weight
    //             'heatmap-intensity': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['zoom'],
    //                 0,
    //                 1,
    //                 9,
    //                 3
    //             ],
    //             // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    //             // Begin color ramp at 0-stop with a 0-transparancy color
    //             // to create a blur-like effect.
    //             'heatmap-color': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['heatmap-density'],
    //                 0,
    //                 'rgba(33,102,172,0)',
    //                 0.2,
    //                 'rgb(103,169,207)',
    //                 0.4,
    //                 'rgb(209,229,240)',
    //                 0.6,
    //                 'rgb(253,219,199)',
    //                 0.8,
    //                 'rgb(239,138,98)',
    //                 1,
    //                 'rgb(178,24,43)'
    //             ],
    //             // Adjust the heatmap radius by zoom level
    //             'heatmap-radius': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['zoom'],
    //                 0,
    //                 2,
    //                 9,
    //                 20
    //             ],
    //             // Transition from heatmap to circle layer by zoom level
    //             'heatmap-opacity': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['zoom'],
    //                 7,
    //                 1,
    //                 9,
    //                 0
    //             ]
    //         }
    //     },
    //     'waterway-label'
    // );

    // map.addLayer(
    //     {
    //         'id': 'earthquakes-point',
    //         'type': 'circle',
    //         'source': 'earthquakes',
    //         'minzoom': 7,
    //         'paint': {
    //             // Size circle radius by earthquake magnitude and zoom level
    //             'circle-radius': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['zoom'],
    //                 7,
    //                 ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
    //                 16,
    //                 ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
    //             ],
    //             // Color circle by earthquake magnitude
    //             'circle-color': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['get', 'mag'],
    //                 1,
    //                 'rgba(33,102,172,0)',
    //                 2,
    //                 'rgb(103,169,207)',
    //                 3,
    //                 'rgb(209,229,240)',
    //                 4,
    //                 'rgb(253,219,199)',
    //                 5,
    //                 'rgb(239,138,98)',
    //                 6,
    //                 'rgb(178,24,43)'
    //             ],
    //             'circle-stroke-color': 'white',
    //             'circle-stroke-width': 1,
    //             // Transition from heatmap to circle layer by zoom level
    //             'circle-opacity': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['zoom'],
    //                 7,
    //                 0,
    //                 8,
    //                 1
    //             ]
    //         }
    //     },
    //     'waterway-label'
    // );
});


  return {
    update: newData => renderToDOM(map, newData),
    remove: () => {
      map.remove();
    }
  };
}

export async function loadAndRender(container) {
  const data = await load(
    'https://raw.githubusercontent.com/piyushjagtap22/Global-Drone-Heatmap/main/12_may_global_home_positions.csv',
    CSVLoader
  );

// await csv2geojson(data, function(err, data) {
//   console.log(err);
//   console.log(data);

// });
  // const data = 'global_home_positions.json'
  // const data = await load("https://us-gun-violence.web.app/gundata.json");

  renderToDOM(container, data);

 
}


