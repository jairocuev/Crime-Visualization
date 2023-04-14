import React, { useState, useEffect } from 'react';
import { getJson } from '../utils/helpers';
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  // Tooltip,
  // Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'react-fakers';

export const CrimeCharts = () => {
  const [data, setData] = useState(null);
  const [month, setMonth]=useState(0);
  useEffect(() => {
    async function fetchData() {
      const response = await getJson();
      setData(response);
    }

    fetchData();

  
  }, []);


  function dataSetup(month){
        return data.features.filter((item)=> new Date(item.attributes.offense_start_date).getMonth()==month ).length
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    // Title,
    // Tooltip,
    // Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: true,
    },
    scales:{
      y:{
        min:1000,
        max:3500
      }
    },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    }
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   
  const dataa = {
    labels,
    datasets: [
      {
        label: "January",
        data: [data ? dataSetup(0) : 0,
               data ? dataSetup(1) : 0,
               data ? dataSetup(2) : 0,
               data ? dataSetup(3) : 0,
              ],
        borderColor: 'white',
        backgroundColor: 'yellow',
       },
      // {
      //   label: 'Dataset 2',
      //   data: [5,7,23],
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ]
  };

  return (
    <div className='LineChart'>
        <h1>
          Line Chart For ATL data
        </h1>
        <Line
          data={dataa} options={options}
          />
            
          {data ? dataSetup(3) : <></>}
    </div>
  )
}

