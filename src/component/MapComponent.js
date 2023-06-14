import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = ({mapData}) => 
{
  useEffect(() => {
    // Your map initialization and configuration code here
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2lydGlzaCIsImEiOiJja2N4cjNvY2YwMnAzMnltdjQ0dzd0NHN0In0.F5BaepKPJjvC_Rp8rHUVyA';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [0, 0],
      zoom: 1
    });

    map.on('load', function () {
      // Add a geojson source containing home positions
      map.addSource('home-positions', {
        type: 'geojson',
        data: mapData
      });

      // Add a heatmap layer based on the home positions
      map.addLayer(
        {
          id: 'home-positions-heat',
          type: 'heatmap',
          source: 'home-positions',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': {
              property: 'mag',
              type: 'exponential',
              stops: [
                [0, 0],
                [6, 1]
              ]
            },
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': {
              stops: [
                [0, 1],
                [9, 3]
              ]
            },
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparency color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)'
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': {
              stops: [
                [0, 2],
                [9, 20]
              ]
            }
          }
        },
        'waterway-label'
      );
    });

  }, [mapData]);

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default MapComponent;
