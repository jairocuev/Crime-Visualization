import { useState, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './NavCss/CrimeMap.css';
import { Map, Source, Layer } from 'react-map-gl';
import { getGeoJson } from '../utils/helpers';

const initialState = {
  viewport: {
    latitude: 33.753746,
    longitude: -84.38633,
    zoom: 10,
  },
};

export const Clustering = () => {
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
  const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
        '#f28cb1',
      ],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    },
  };

  const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  };

  const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
  };

  const [data, setData] = useState({});
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      const response = await getGeoJson();
      setData(response);
    }

    fetchData();
  }, []);

  const mapRef = useRef(null);

  const onClick = (event) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current.getSource('earthquakes');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 33.753746,
          longitude: -84.38633,
          zoom: 10,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/jccuev/clg31mlr2002m01qorq6w62aq"
        mapboxAccessToken={token}
        interactiveLayerIds={[clusterLayer.id]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data={data}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
};
