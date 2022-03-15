import React, { useState, useEffect } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import data from '../resources/data';
import { Bar } from 'react-chartjs-2';
import '../resources/styles/charts.css';

function BarChart() {
    const [dailyExpenses, setDailyExpenses] = useState([])
    const [value, setValue] = useState("2022")
    const [dates, setDates] = useState([])



  
  useEffect(() => {

    fetchDayExpensebyMonth();
  }, [])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

    const fetchDayExpensebyMonth = () => {
        
        let dates = []
        let DailyExpenses = []

        let selectedMonth = document.querySelector('#select_month');
        let selectedYear = document.querySelector('#select_year');
        let month = selectedMonth.options[selectedMonth.selectedIndex].value;
        let year = selectedYear.value
        
      data.dailyExpense.forEach(data => {
            let date = data.date
            if ((date.indexOf(month) !== -1) && (date.indexOf(year) !== -1)) {
                dates.push(data.date)
                DailyExpenses.push(data.totalExpense);
            }

        });

        setDailyExpenses(DailyExpenses)
        setDates(dates)
    }

    
    
    

  


  const labels = dates;

    const Bardata = {
       labels,
        datasets: [
            {
                label: 'Expense',
                data: dailyExpenses,
                backgroundColor: 'rgba(255, 99, 132, 0.4)'
            },
            {
                label: 'Revenue',
                data: dailyExpenses,
                backgroundColor: 'rgba(53, 162, 235, 0.4)'
            },
        ],
    };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expense And Revenue Comparison',
      },
    },

  };

  return (
    <div>
          <div className="dropdown">
              <select id="select_month" onChange={fetchDayExpensebyMonth}>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
              </select>
              <input type="number" id="select_year" onChange={e => { setValue(e.target.value); fetchDayExpensebyMonth()}} min="1900" max="2099" step="1" value={value} />
          </div>
          <div className="BarContent">
             <div className='myBarChart'>
                <Bar options={options} data={Bardata} />
             </div>
          </div>
    </div>
  )
}

export default BarChart;