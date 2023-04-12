import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import './NavCss/CrimeMap.css'
import data from "./data.json"
import Map, {Marker, Popup} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

export const HeatMap = () => {
  const token =process.env.REACT_APP_MAPBOX_TOKEN;

  return (
    <div id='map'>

        <Map 
            container='map'
            initialViewState={{latitude: 33.753746, longitude: -84.386330, zoom: 10}}
            style={{width: 800, height: 600}}
            mapStyle='mapbox://styles/mapbox/dark-v11'
            mapboxAccessToken={token}>

          
        </Map>

    </div>
  )
}
