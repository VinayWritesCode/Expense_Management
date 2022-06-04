import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

function DoughnutChart(props) {

  const { dChart, setDChart, DoughnutData, labelMonth } = props;
  ChartJS.register(ArcElement, Tooltip, Legend);


  const month = dChart.data.map(item => {
    return labelMonth[item.Month - 1];
  })

  const totalUser = dChart.data.map(item => {
    return item.TotalUser;
  })

  let labels = month;
  const data = {
    labels,
    datasets: [
      {
        label: 'New Users Each Month',
        data: totalUser,
        borderColor: ['rgba(255,206,86,0.2)'],
        backgroundColor: ['rgba(232,99,132,1)',
          'rgba(232,211,6,1)',
          'rgba(54,162,235,1)',
          'rgba(255,159,64,1)',
          'rgba(153,102,255,1)',
          'rgba(232,99,132,1)',
          'rgba(232,211,6,1)',
          'rgba(54,162,235,1)',
          'rgba(255,159,64,1)',
          'rgba(153,102,255,1)',
          'rgba(232,99,132,1)',
          'rgba(232,211,6,1)'],
        pointBackgroundColor: 'rgba(255,206,86,0.2)',
      }

    ]
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",

          font: {
            size: 18
          }
        }
      },
      title: {
        display: true,
        text: 'Doughnut Chart',
        color: 'black',
        font: {
          size: 34
        },
        padding: {
          top: 30,
          bottom: 30
        },
        responsive: true,
        animation: {
          animateScale: true,
        }
      }
    }

  }

  const handleSearch = async () => {
    DoughnutData();
  }

  return (
    <div>
      <div className="myPieChart">
        <h2 style={{ marginTop: "7vh" }}>Monthly New User</h2>
        <div className="dropdown space-tb">

          <input type="number" name="year" id="select_year" onChange={(e) => { setDChart({ ...dChart, [e.target.name]: e.target.value }); }} min="1900" max="2099" step="1" value={dChart.year} />
          <button onClick={handleSearch}> Search </button>
        </div>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default DoughnutChart