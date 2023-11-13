import React from 'react'
import {Chart as ChartJS,BarElement,CategoryScale,LinearScale,Tooltip,Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';


function barChart({data,month}) {

    const chartData = {
        labels: data?.map(item => item.priceRange).reverse(),
        datasets: [
          {
            label: 'Item Count',
            data: data?.map(item => item.itemCount).reverse(),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 50, 0.6)',
            ],
            barThickness:50
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Y-Axis Label',
              },
            },
          ],
        },
        
      };
  return (
    <div className='col-12 offset-0 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 text-center'>
      <p style={{fontWeight:"bold",fontSize:"26px",color:"#070707", cursor:"pointer"}}>Bar Chart Stats - {month}</p>
      <Bar  data={chartData} options={options} />
      </div> 
  )
}

export default barChart;