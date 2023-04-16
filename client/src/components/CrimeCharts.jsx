import React, { useState, useEffect } from 'react';
import { getJson } from '../utils/helpers';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './CrimeChart.scss';

export const CrimeCharts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getJson();
      setData(response);
    }
    setLoading(true);
    fetchData();
    setLoading(false)
  }, []);

  function dataSetup(month) {
    return data.features.filter(
      (item) =>
        new Date(item.attributes.offense_start_date).getMonth() === month
    ).length;
  }

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const options = {
    responsive: true,
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 1000,
        max: 3500,
      },
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dataa = {
    labels,
    datasets: [
      {
        label: 'January',
        data: [
          data ? dataSetup(0) : 0,
          data ? dataSetup(1) : 0,
          data ? dataSetup(2) : 0,
          data ? dataSetup(3) : 0,
          data ? dataSetup(4) : 0,
          data ? dataSetup(5) : 0,
          data ? dataSetup(6) : 0,
          data ? dataSetup(7) : 0,
          data ? dataSetup(8) : 0,
          data ? dataSetup(9) : 0,
          data ? dataSetup(10) : 0,
          data ? dataSetup(11) : 0,
        ],
        borderColor: 'white',
        backgroundColor: 'yellow',
      },
    ],
  };

  return (
    <div className="LineChart">
      {!loading ?       <>
        <h1>Line Chart For ATL data</h1>
        <Line data={dataa} options={options} />
      </> : <>Loading...</>}
    </div>
  );
};
