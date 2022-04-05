import React, { useEffect } from 'react';
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

function BarChart(props) {
  let { getMethod, monthYear, setMonthYear, revenueDayData, expenseDayData, labelMonth } = props;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    // eslint-disable-next-line
  }, [])
  

 

  const expense = expenseDayData.message.map(item => {
    return { "amount": item.Amount, "day": item.Day, "type": "Expense", "color":"rgba(255, 99, 132, 0.4)"};
  })
  const revenue = revenueDayData.message.map(item => {
    return { "amount": item.Amount, "day": item.Day, "type": "Revenue", "color":"rgba(255, 255, 255, 0.4)" };
  })

  const data = expense.concat(revenue);

  const label1 = data.map(item => {
    if(item.day){
      return item.type + ": " + labelMonth[monthYear.month - 1] + " " + item.day;
    }else{
      return "No Data"
    }
  })

  const newData1 = data.map(item => {
    if (item.amount){
      return item.amount;
    }else{
      return 0;
    }
  })

  const color = data.map(item => {
    return item.color;
  })

  
     
  
  let labels = label1;
    const Bardata = {
      labels,
        datasets: [
            {
                label:[],
                data: newData1,
                backgroundColor: color,
                fontColor: "#fff",
            },
        ],
    };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expense (Left Side) And Revenue (Right Side)',
      },
    },

  };

  

  const handleClick = async () => {
    labels =[];
    getMethod();
  }

    

  return (
    <div>
      <div className="dropdown space-tb">
        <select id="select_month" value={monthYear.month} name="month" onChange={(e) => { setMonthYear({ ...monthYear, [e.target.name]: e.target.value });}}>
          <option value="">Select Month</option>
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
        <input type="number" id="select_year" name="year" onChange={(e) => { setMonthYear({ ...monthYear, [e.target.name]: e.target.value });}} min="1900" max="2099" step="1" value={monthYear.year} />
        <button onClick={handleClick}> Search </button>
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