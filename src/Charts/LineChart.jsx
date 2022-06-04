import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart, PointElement, registerables } from 'chart.js';
import axios from 'axios';





function LineChart(props) {

    const { currentYear } = props;

    const [lineChartExpenseData, setLineChartExpenseData] = useState([]);
    const [lineChartRevenueData, setLineChartRevenueData] = useState([]);
    const [lineChartPreviousExpenseData, setLineChartPreviousExpenseData] = useState([]);
    const [lineChartPreviousRevenueData, setLineChartPreviousRevenueData] = useState([]);

    useEffect(() => {
        ExpensesEachMonth();
        RevenuesEachMonth();
        // eslint-disable-next-line
    }, [])


    const ExpensesEachMonth = async () => {
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getExpenseEachMonth.php`;
        const params = new URLSearchParams()
        params.append('token', localStorage.getItem('token'))
        params.append('year', currentYear);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                if (result.data.status === "true") {
                    let i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (let j = 0; j < result.data.message.length; j++) {
                        let month = parseInt(result.data.message[j].Month);
                        i[month] = result.data.message[j].Amount;
                    }
                    setLineChartExpenseData(i);
                }
                else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                // Do somthing
            })

        const params2 = new URLSearchParams()
        params2.append('token', localStorage.getItem('token'))
        params2.append('year', currentYear - 1);
        await axios.post(url, params2, config)
            .then((result) => {
                if (result.data.status === "true") {
                    let i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (let j = 0; j < result.data.message.length; j++) {
                        let month = parseInt(result.data.message[j].Month);
                        i[month] = result.data.message[j].Amount;
                    }
                    setLineChartPreviousExpenseData(i);
                }
                else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                // Do somthing
            })
    }

    const RevenuesEachMonth = async () => {
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getRevenueEachMonth.php`;
        const params = new URLSearchParams()
        params.append('token', localStorage.getItem('token'))
        params.append('year', currentYear);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                if (result.data.status === "true") {
                    let i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (let j = 0; j < result.data.message.length; j++) {
                        let month = parseInt(result.data.message[j].Month);
                        i[month] = result.data.message[j].Amount;
                    }
                    setLineChartRevenueData(i);
                }
                else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                // Do somthing
            })

        const params2 = new URLSearchParams()
        params2.append('token', localStorage.getItem('token'))
        params2.append('year', currentYear - 1);

        await axios.post(url, params2, config)
            .then((result) => {
                if (result.data.status === "true") {
                    let i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (let j = 0; j < result.data.message.length; j++) {
                        let month = parseInt(result.data.message[j].Month);
                        i[month] = result.data.message[j].Amount;
                    }
                    setLineChartPreviousRevenueData(i);
                }
                else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                // Do somthing
            })
    }



    Chart.register(PointElement, ...registerables);


    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Current year expense",
                data: lineChartExpenseData,
                fill: true,
                backgroundColor: "'rgba(255, 206, 86, 1)' ",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Current year income",
                data: lineChartRevenueData,
                fill: true,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "#2F2323"
            },
            {
                label: "Previous year expense",
                data: lineChartPreviousExpenseData,
                fill: false,
                borderColor: "red"
            },
            {
                label: "Previous year income",
                data: lineChartPreviousRevenueData,
                fill: false,
                borderColor: "blue"
            },


        ]
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            }
        }
    };


    return (
        <div className='myLineChart'>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart