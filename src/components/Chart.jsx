import React, { useState, useEffect } from 'react'
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import axios from 'axios';






function Chart() {

    const date = new Date();
    const [status, setStatus] = useState("false");
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()
    const currentDate = date.getDay() + "" +  + "" + currentYear;
    const [year, setYear] = useState(currentYear);
    const [monthYear, setMonthYear] = useState({ "month": currentMonth, "year": currentYear});
    const [expenseData, setExpenseData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [labelMonth, setLabelMonth] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);



    useEffect(() => {
        ExpensesEachMonth();
        RevenuesEachMonth();
        // eslint-disable-next-line
    }, [])

    const ExpensesEachMonth = async () => {

        setExpenseData([]);
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getExpenseEachMonth.php`;
        const params = new URLSearchParams()
        params.append('token', localStorage.getItem('token'))
        params.append('year', year);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                console.log(result)
                if (result.data.status === "true") {
                    setExpenseData(result.data.message);
                    setStatus(result.data.status);
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
        setRevenueData([]);
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getRevenueEachMonth.php`;
        const params = new URLSearchParams()
        params.append('token', localStorage.getItem('token'))
        params.append('year', year);
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                console.log(result)
                if (result.data.status === "true") {
                    setRevenueData(result.data.message);
                    setStatus(result.data.status);
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
            <div className="chart">
                <div className="title-chart">
                    <h1>Visualization of data</h1>
                </div>
                <div className="first_Chart">
                    <h2>Your Daily Expense & Revenue Comparison</h2>
                    <div className="candlechart">
                        <LineChart ExpenseData={[]} />
                    </div>
                </div>

                <div className="first_Chart">
                    <h2>Your Daily Expense & Revenue Comparison</h2>
                    <div className="candlechart">
                        <BarChart monthYear={monthYear} setMonthYear={setMonthYear} labelMonth={labelMonth} />
                    </div>
                </div>
                <div className="second_Chart">
                    <h2>Your Monthly Expenses</h2>
                    <div>
                        <PieChart data={expenseData} getMethod={ExpensesEachMonth} setYear={setYear} year={year} labelMonth={labelMonth} />
                    </div>
                </div>
                <div className="second_Chart">
                    <h2>Your Monthly Revenues</h2>
                    <div>
                        <PieChart data={revenueData} getMethod={RevenuesEachMonth} setYear={setYear} year={year} labelMonth={labelMonth} />
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Chart