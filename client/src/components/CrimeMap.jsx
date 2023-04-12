import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './NavCss/CrimeMap.css'
import React from 'react';
import data from "./data.json"
import Map, {Marker, Popup} from 'react-map-gl';


export const CrimeMap = () => {
  const token =process.env.REACT_APP_MAPBOX_TOKEN;
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    
      <div>
          <Map
            initialViewState={{
            latitude: 33.753746,
            longitude: -84.386330,
           zoom: 10
        }}
      style={{width: 800, height: 600}}
      mapStyle='mapbox://styles/jccuev/clg31mlr2002m01qorq6w62aq'
      mapboxAccessToken={token}>

      {data.layers[0].features.map((crime, index)=>(
          <Marker key={`marker-${index}`} longitude={crime.geometry.x} latitude={crime.geometry.y} color="red" onClick={e=>{e.originalEvent.stopPropagation();
          setPopupInfo(crime)
          console.log(crime)}} />
      ))}
      
      {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.geometry.x)}
            latitude={Number(popupInfo.geometry.y)}
            onClose={() => setPopupInfo(null)}
          >
            <div style={{color: "red"}}>
              {popupInfo.attributes.location} |{' '}
            </div>
          </Popup>
        )}

    </Map>
      </div>
    );
    
  
}

