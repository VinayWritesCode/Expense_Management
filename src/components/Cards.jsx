import React, { useEffect } from 'react';
import data from '../resources/data'
import '../resources/styles/Card.css'

function Cards() {


    let currentMonthExpense = 0;
    let currentMonthRevenue = 0;
    let currentDate = "22 Mar 2022";


    useEffect(() => {
        TotalfetchDayExpensebyMonth()
        TotalfetchDayRevenuebyMonth()
        TotalExpenses()
        TotalRevenue()
    }, [])
    

    const TotalfetchDayExpensebyMonth = () => {
        let thisMonthExpense = document.getElementById("thisMonthExpense");
        currentMonthExpense = 0;
        console.log(thisMonthExpense)
        data.dailyExpense.forEach(data => {
            let date = data.date

            if ((date.indexOf(currentDate.slice(2, 5)) !== -1) && (date.indexOf(currentDate.slice(6, currentDate.length)) !== -1)) {
                currentMonthExpense += data.totalExpense;
            }
        });
        thisMonthExpense.innerHTML = currentMonthExpense;
       
    }

    const TotalfetchDayRevenuebyMonth = () => {
        let thisMonthRevenue = document.getElementById("thisMonthRevenue");
        currentMonthRevenue = 0;
        data.dailyExpense.forEach(data => {
            let date = data.date

            if ((date.indexOf(currentDate.slice(2, 5)) !== -1) && (date.indexOf(currentDate.slice(6, currentDate.length)) !== -1)) {
                currentMonthRevenue += data.totalRevenue;
            }
        });
        thisMonthRevenue.innerHTML = currentMonthRevenue;
    }

  

    

    const TotalExpenses = () => {
        let totalExpense = document.getElementById('totalExpense')
        let total = 0;
        data.dailyExpense.forEach(data => {
            total += data.totalExpense;

        });
        totalExpense.innerHTML = total
    }

    const TotalRevenue = () => {
        let totalRevenue = document.getElementById('totalRevenue')
        let total = 0;
        data.dailyExpense.forEach(data => {
            total += data.totalRevenue;

        });
        totalRevenue.innerHTML = total
    }






  return (
      <div><div className="cards">
          <div className="card">
              <div className="row1">
                  <h4>Total Expense</h4>
              </div>
              <div className="row2"><span id="totalExpense"></span></div>
          </div>
          <div className="card">
              <div className="row1">
                  <h4>Total Revenue</h4>
              </div>
              <div className="row2"><span id="totalRevenue"></span></div>
          </div>
          <div className="card">
              <div className="row1">
                  <h4> Expense (Mar 2022)</h4>
              </div>
              <div className="row2"><span id="thisMonthExpense"></span></div>
          </div>
          <div className="card">
              <div className="row1">
                  <h4> Revenue (Mar 2022) </h4>
              </div>
              <div className="row2"><span id="thisMonthRevenue"></span></div>
          </div>

      </div></div>
  )
}

export default Cards