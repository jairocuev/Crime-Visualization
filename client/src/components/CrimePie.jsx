import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export function CrimePie({ chartData }) {
  function getLength(tag) {
    const number = chartData.filter((x) => x.codename == tag).length;

    return number;
  }

  const data = {
    labels: [
      'All Other Larceny',
      'Theft From Motor Vehicle',
      'Drug/Narcotic Violations',
      'Simple Assault',
      'Weapon Law Violations',
      'Aggravated Assault',
      'Shoplifting',
      'Destruction/Damage/Vandalism of Property',
      'Theft From Building',
      'Burglary/Breaking & Entering',
      'Credit Card/Automated Teller Machine Fraud',
    ],
    datasets: [
      {
        label: '# of Crimes',
        data: [
          getLength('All Other Larceny'),
          getLength('Theft From Motor Vehicle'),
          getLength('Drug/Narcotic Violations'),
          getLength('Simple Assault'),
          getLength('Weapon Law Violations'),
          getLength('Aggravated Assault'),
          getLength('Shoplifting'),
          getLength('Destruction/Damage/Vandalism of Property'),
          getLength('Theft From Building'),
          getLength('Burglary/Breaking & Entering'),
          getLength('Credit Card/Automated Teller Machine Fraud'),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="pieChart">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'ATL Crime Type Distributions',
              position: 'top',
              font: {
                size: 24,
              },
              color: 'white',
            },
            legend: {
              position: 'right',
            },
          },
        }}
      />
    </div>
  );
}
