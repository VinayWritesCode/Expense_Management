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
import { Bar } from 'react-chartjs-2';
import '../resources/styles/charts.css';
import axios from 'axios';

function BarChart(props) {
  let { monthYear, setMonthYear, labelMonth } = props;
  const [expenseDayData, setExpenseDayData] = useState({ "message": [{ "Day": ""}],"status": "false"} );
  const [revenueDayData, setRevenueDayData] = useState({ "message": [{ "Day": "" }], "status": "false" });
  const [day, setDay ] = useState([]);
  let day1 = expenseDayData;
  let day2 = revenueDayData;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    ExpensesDayMonth();
    RevenuesDayMonth();
    // eslint-disable-next-line
  }, [])
  

  const ExpensesDayMonth = () => {
    setExpenseDayData({ "message": [{ "Day": "" }], "status": "false" });
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getExpenseDayMonth.php`;
    const params = new URLSearchParams()
    params.append('token', localStorage.getItem('token'))
    params.append('year', monthYear.year);
    params.append('month', monthYear.month);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
          setExpenseDayData({
            "message": result.data.message,
            "status": "true"
          });
        }
        else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        // Do somthing
      })
    fetchDayMonth();
  }

  const RevenuesDayMonth =  () => {
    setRevenueDayData({ "message": [{ "Day": "" }], "status": "false" });
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getRevenueDayMonth.php`;
    const params = new URLSearchParams()
    params.append('token', localStorage.getItem('token'))
    params.append('year', monthYear.year);
    params.append('month', monthYear.month);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
          setRevenueDayData({
            "message": result.data.message,
            "status": "true"
            });

        }
        else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        // Do somthing
      })
    fetchDayMonth();
  }

  
   
  const fetchDayMonth = async () => {
    if(revenueDayData.status === "true"){
      const day1 = revenueDayData.message.map(items=>{
        return items.Day
      })
    }
    if(expenseDayData.status === "true"){
      const day2 = expenseDayData.message.map(items => {
        return items.Day
      })
      setDay(day1.concat(day2));
      console.log(day1);
      console.log(day2);
      console.log(day);
    }
    
    
  }

  




  const dailyExpenses = [];
 /*
  
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

    
    
    */

  



  const labels = day;

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

  const handleChange = (e) => {
    console.log([e.target.name] +":"+ e.target.value)
    setMonthYear({[e.target.name]: e.target.value});
    ExpensesDayMonth(e);
    RevenuesDayMonth(e);
  }

    

  return (
    <div>
      <div className="dropdown space-tb">
        <select id="select_month" value={monthYear.month} name="month" onChange={(e) => handleChange(e)}>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
        </select>
        <input type="number" id="select_year" name="year" onChange={(e) => { setMonthYear({ ...monthYear, [e.target.name]: e.target.value }); handleChange();  }} min="1900" max="2099" step="1" value={monthYear.year} />
        <button onClick={(e) => handleChange(e)}> Search </button>
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