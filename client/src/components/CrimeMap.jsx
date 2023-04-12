import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './NavCss/CrimeMap.css';
import Map, { Marker, Popup } from 'react-map-gl';
import { getGeoJson } from '../utils/helpers';

export const CrimeMap = () => {
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
  const [data, setData] = useState(null);

  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getGeoJson();
      setData(response);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Map
        initialViewState={{
          latitude: 33.753746,
          longitude: -84.38633,
          zoom: 15,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/jccuev/clg31mlr2002m01qorq6w62aq"
        mapboxAccessToken={token}
      >
        {data ? (
          data.features.map((crime, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={crime.geometry.coordinates[0]}
              latitude={crime.geometry.coordinates[1]}
              color="red"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(crime);
                console.log(crime);
              }}
            />
          ))
        ) : (
          <></>
        )}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.geometry.coordinates[0])}
            latitude={Number(popupInfo.geometry.coordinates[1])}
            onClose={() => setPopupInfo(null)}
          >
            <div style={{ color: 'red' }}>
              {popupInfo.properties.location}
              <br />
              {popupInfo.properties.nibrs_code_name}
              <br />
              {popupInfo.properties.location_type}
              <br />
              {new Date(popupInfo.properties.report_Date).toLocaleDateString("en-US")}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
