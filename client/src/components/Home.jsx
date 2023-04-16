import React, { useState } from 'react';
import { Clustering } from './Clustering';
import { CrimeMap } from './CrimeMap';
import { HeatMap } from './HeatMap';
import { CrimeCharts } from './CrimeCharts';
import './Home.scss';

export const Home = () => {
  const [mapType, setMapType] = useState('pin');
  function getMap(type) {
    switch (type) {
      case 'pin':
        return <CrimeMap />;
      case 'Heat Map':
        return <HeatMap />;
      case 'Clustering':
        return <Clustering />;
      default:
        return <CrimeMap />;
    }
  }
  return (
    <div className="homeContainer">
      <button
        onClick={() => {
          setMapType('pin');
        }}
      >
        Pin Map
      </button>
      <button
        onClick={() => {
          setMapType('Heat Map');
        }}
      >
        Heat Map
      </button>
      <button
        onClick={() => {
          setMapType('Clustering');
        }}
      >
        Clustering
      </button>
      <div className="homeContent">
        {getMap(mapType)}

        <CrimeCharts />
      </div>
    </div>
  );
};
