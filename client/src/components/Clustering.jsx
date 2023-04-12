import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './NavCss/CrimeMap.css'
import React from 'react';
import data from "./data.json"
import MapGL, { Marker, FlyToInterpolator } from "react-map-gl";

const initialState = {
  viewport: {
    latitude: 33.753746,
    longitude: -84.386330,
    zoom: 10
  }
};

export const Clustering = () => {
  const token =process.env.REACT_APP_MAPBOX_TOKEN;
  const [data, setData] = useState({});
  const [state, setState] = useState(initialState);
  
  const apiUrl='https://services3.arcgis.com/Et5Qfajgiyosiw4d/arcgis/rest/services/CrimeDataExport_2_view/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson'

  function pullJson(){
    fetch(apiUrl)
    .then(response => response.json())
    .then(reponseData =>{
      setData(reponseData)
    })
  }
  useEffect(()=>{
    pullJson();
    //  console.log(data)
  },[])
//  console.log(data.features[0])
  const points= data ? data.features.map(crime => ({
    type: "Feature",
    properties: { 
      OffID: crime.properties.OffID,
      nibrs_code_name: crime.properties.nibrs_code_name, 
      report_number: crime.properties.report_number
    },
    geometry: {
      type: "Point",
      coordinates: [
        crime.geometry.coordinates[0],
        crime.geometry.coordinates[1]
      ]
    }
    })):{};

    const ClusterMarker = ({ longitude, latitude, pointCount }) => (
      <Marker longitude={longitude} latitude={latitude}>
        <div style={{ ...style, background: "#f28a25" }}>{pointCount}</div>
      </Marker>
    );
    
  return (

    <div>
      
    </div>

  )
}
