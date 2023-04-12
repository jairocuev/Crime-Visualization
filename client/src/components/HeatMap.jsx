import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './NavCss/CrimeMap.css';
import MapGL, { Source, Layer } from 'react-map-gl';
import { getGeoJson } from '../utils/helpers';

const MAX_ZOOM_LEVEL = 15;

const heatmapLayer = {
  id: 'heatmap',
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    'heatmap-weight': {
      property: 'dbh',
      type: 'exponential',
      stops: [
        [1, 0],
        [62, 1],
      ],
    },
    'heatmap-intensity': {
      stops: [
        [11, 1],
        [15, 3],
      ],
    },
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
      0.9,
      'rgb(255,201,101)',
    ],
    'heatmap-radius': {
      stops: [
        [11, 15],
        [15, 20],
      ],
    },
    'heatmap-opacity': {
      default: 1,
      stops: [
        [14, 1],
        [15, 0],
      ],
    },
  },
};

export const HeatMap = () => {
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getGeoJson();
      setData(response);
    }

    fetchData();
  }, []);

  return (
    <div id="map">
      <MapGL
        initialViewState={{
          latitude: 33.753746,
          longitude: -84.38633,
          zoom: 10,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/jccuev/clg31mlr2002m01qorq6w62aq"
        mapboxAccessToken={token}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </MapGL>
    </div>
  );
};
