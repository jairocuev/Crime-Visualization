import React, { useState, useEffect } from 'react';
import { Clustering } from './Clustering';
import { CrimeMap } from './CrimeMap';
import { HeatMap } from './HeatMap';
import { CrimeCharts } from './CrimeCharts';
import './Home.scss';
import { CrimePie } from './CrimePie';
import { getAllReports } from '../api';
import { Button } from '@mui/material';

export const Home = () => {
  const [mapType, setMapType] = useState('pin');

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllReports();
      setChartData(response);
    }
    fetchData();
  }, []);

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
      <div className="homeButtons">
        <Button
          variant="contained"
          onClick={() => {
            setMapType('pin');
          }}
        >
          Pin Map
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setMapType('Heat Map');
          }}
        >
          Heat Map
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setMapType('Clustering');
          }}
        >
          Clustering
        </Button>
      </div>
      <div className="homeContent">
        <div className="map">{getMap(mapType)}</div>

        {chartData ? <CrimeCharts chartData={chartData} /> : <></>}
        {chartData ? <CrimePie chartData={chartData} /> : <></>}
      </div>
    </div>
  );
};
