import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../resources/styles/charts.css';

function PieChart(props) {

    
    const { data } = props;
    const [monthsWithExpense, setMonthsWithExpense] = useState([{ month: "Jan", expense: 0 }, { month: "Feb", expense: 0 }, { month: "Mar", expense: 0 }, { month: "Apr", expense: 0 }, { month: "May", expense: 0 }, { month: "Jun", expense: 0 }, { month: "Jul", expense: 0 }, { month: "Aug", expense: 0 }, { month: "Sep", expense: 0 }, { month: "Oct", expense: 0 }, { month: "Nov", expense: 0 }, { month: "Dec", expense: 0 }]);
    const [labelMonth, setLabelMonth] = useState([])
    const [labelExpense, setLabelExpense] = useState([])
    let currentDate = "22 Mar 2022";


    useEffect(() => {
        MonthyExpenses()
        fetchData();
    
    },[])
    

    const fetchRequire = (month) => {
        let total = 0;
        data.dailyExpense.forEach(data => {
            let date = data.date;
            // if (month && current year)
            if ((date.indexOf(month) !== -1) && (date.indexOf(currentDate.slice(6, currentDate.length)) !== -1)) {
                total += data.totalExpense;
            }


        });
        return total;
    }

    //Return array for pie chart
    const MonthyExpenses = () => {
        let total = 0;
        let temp = monthsWithExpense;
        temp.map(data => {
            total = fetchRequire(data.month);
            data.expense = total;
        })
        setMonthsWithExpense(temp)
    }

    const fetchData = () => {
        let arr1 = [];
        let arr2 = [];
        monthsWithExpense.map(data => {
            arr1.push(data.month);
            arr2.push(data.expense);
        })
        setLabelMonth(arr1);
        setLabelExpense(arr2);
    }


    ChartJS.register(ArcElement, Tooltip, Legend);
    const myPieChart = {
        labels: labelMonth,
        datasets: [
            {
                label: 'Monthly Expense',
                data: labelExpense,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
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
        <div className="PieContent">
          <div className='myPieChart'> <Pie data={myPieChart} /></div>
        </div>

  )
}

export default PieChart