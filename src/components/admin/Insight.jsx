import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../Charts/DoughnutChart';
import '../../resources/styles/Insight.css';


function Insight(props) {

  const { currentYear, currentMonth, labelMonth } = props; 
  const [dChart, setDChart] = useState({ "year": currentYear, "data":[]});

   useEffect(() => {
     DoughnutData()
     // eslint-disable-next-line
   }, [])
   

  const DoughnutData = async () => {
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/admin/Insight.php`;
    const params = new URLSearchParams()
    params.append('admintoken', localStorage.getItem('admintoken'))
    params.append('year', dChart.year);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
          setDChart({"year": dChart.year,  "data": result.data.message});
        }
        else {
          alert("No data Found");
        }
      })
      .catch((err) => {
        console.log("current Month "+currentMonth);
      })
      
  }

  return (
    <div className="Insight-container">
          <div className='title'> <h5>Insight</h5> </div>
          <div className="content-insight">
              <div className="insight-charts">
                <div className="partonechart">
            <div className="myDoughnutChart">
              
              <DoughnutChart dChart={dChart} setDChart={setDChart} DoughnutData={DoughnutData} labelMonth={labelMonth} /></div>  
                </div>
              </div>
          </div>
    </div>
  )
}

export default Insight