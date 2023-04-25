import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './CrimeChart.scss';

export const CrimeCharts = ({ chartData }) => {
  console.log(chartData);
  const [loading, setLoading] = useState(false);

  function dataSetup(month) {
    return chartData.filter(
      (item) => new Date(item.reportdate).getMonth() === month
    ).length;
  }

  ChartJS.register(
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: 'Monthly Crime Totals',
        font: {
          size: 24,
        },
        color: 'white',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5000,
      },
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
        data: [
          chartData ? dataSetup(0) : 0,
          chartData ? dataSetup(1) : 0,
          chartData ? dataSetup(2) : 0,
          chartData ? dataSetup(3) : 0,
          chartData ? dataSetup(4) : 0,
          chartData ? dataSetup(5) : 0,
          chartData ? dataSetup(6) : 0,
          chartData ? dataSetup(7) : 0,
          chartData ? dataSetup(8) : 0,
          chartData ? dataSetup(9) : 0,
          chartData ? dataSetup(10) : 0,
          chartData ? dataSetup(11) : 0,
        ],
        borderColor: 'white',
        backgroundColor: 'yellow',
      },
    ],
  };

  return (
    <div className="LineChart">
      {!loading ? (
        <>
          <Line data={dataa} options={options} />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
