import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart, PointElement, registerables } from 'chart.js';




function LineChart(props) {

    

    Chart.register(PointElement, ...registerables);


    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Current year",
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Previous Year",
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };


  return (
    <div>
          <Line data={data} options={options} />
    </div>
  )
}

export default LineChart