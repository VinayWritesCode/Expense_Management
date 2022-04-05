import axios from 'axios';
import React, {useState, useEffect } from 'react';
import '../resources/styles/Card.css'

function Cards(props) {

    
    const { labelMonth, currentYear, currentMonth } = props;

    const [totalExpense, setTotalExpense ] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [TotalMonthExpenses, setTotalMonthExpenses] = useState(0)
    const [TotalMonthRevenues, setTotalMonthRevenues] = useState(0)
    

    useEffect(() => {
        TotalAmount()
        TotalAmountThisMonth();
        // eslint-disable-next-line
    }, [])

    const TotalAmount = async () => {
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getTotalAmount.php`;
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
                if (result.data.status1 === "true" || result.data.status2 === "true") {
                    if (result.data.status1 === "true") {
                        result.data.message1.map(item => {
                            setTotalExpense(item.ExpenseAmount);
                        })
                    }
                    if (result.data.status2 === "true") {
                        result.data.message2.map(item => {
                            setTotalRevenue(item.RevenueAmount);
                        })
                    }
                    
                }
                else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                // Do somthing
            })
    }
    
    const TotalAmountThisMonth = async () => {
 
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getTotalMonthAmount.php`;
        const params = new URLSearchParams()
        params.append('token', localStorage.getItem('token'))
        params.append('year', currentYear);
        params.append('month', currentMonth);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                if (result.data.status1 === "true" || result.data.status2 === "true") {
                    if (result.data.status1 === "true") {
                        result.data.message1.map(item => {
                            setTotalMonthExpenses(item.Amount);
                        })
                    }
                    if (result.data.status2 === "true") {
                        result.data.message2.map(item => {
                            setTotalMonthRevenues(item.Amount);
                        })
                    }

                }
                else {
                    alert(result.data.message);
                }
            })
            .catch((err) => {
                // Do somthing
            })
    }




  return (
      <div>
          
          <div className="cards">
          <div className="card">
              <div className="row1">
                      <h4>Total Expense ({currentYear})</h4>
              </div>
                  <div className="row2"><span id="totalExpense">{totalExpense}</span></div>
          </div>

          <div className="card">
              <div className="row1">
                      <h4>Total Revenue ({currentYear})</h4>
              </div>
                  <div className="row2"><span id="totalRevenue">{totalRevenue}</span></div>
          </div>
          <div className="card">
              <div className="row1">
                      <h4> Expense ({labelMonth[currentMonth] + " " + currentYear})</h4>
              </div>
                  <div className="row2"><span id="thisMonthExpense">{TotalMonthExpenses}</span></div>
          </div>
          <div className="card">
              <div className="row1">
                      <h4> Revenue ({labelMonth[currentMonth] + " " + currentYear}) </h4>
              </div>
                  <div className="row2"><span id="thisMonthRevenue">{TotalMonthRevenues}</span></div>
          </div>

      </div></div>
  )
}

export default Cards