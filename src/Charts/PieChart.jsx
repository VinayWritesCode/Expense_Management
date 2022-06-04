import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../resources/styles/charts.css';
import ChartDataLabels from "chartjs-plugin-datalabels";



function PieChart(props) {


    const { data, getMethod, setYear, year, labelMonth } = props;

    const amount = data.map(item => {
        return item.Amount;
    })
    const month = data.map(item => {
        return labelMonth[item.Month - 1];
    })


    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
    const myPieChart = {
        labels: month,
        datasets: [
            {
                label: 'Monthly Expense OR Income',
                data: amount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(254, 62, 235, 0.2)',
                    'rgba(45, 6, 86, 1.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255,255, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
        options: {
            plugins: {
                labels: {
                    render: 'value',
                    fontSize: 14,
                    fontStyle: 'bold',
                    fontColor: '#000',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                }
            },
        },
    };

    return (
        <div className="PieContent">

            <div className='myPieChart'>
                <div className="dropdown space-tb">
                    <input type="number" id="select_year" onChange={(e) => { setYear(e.target.value); }} min="1900" max="2099" step="1" value={year} />
                    <button onClick={getMethod}> Search </button>
                </div>
                <Pie data={myPieChart} />

            </div>
        </div>

    )
}

export default PieChart