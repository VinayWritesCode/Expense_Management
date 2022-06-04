import React, { useState, useEffect } from 'react'
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import axios from 'axios';






function Chart(props) {

    const date = new Date();
    const { labelMonth, expenseData, revenueData, ExpensesEachMonth, RevenuesEachMonth, status, currentYear, year, setYear } = props
    const currentMonth = date.getMonth()
    const [monthYear, setMonthYear] = useState({ "month": currentMonth, "year": currentYear });
    const [expenseDayData, setExpenseDayData] = useState({ "message": [{ "Day": "" }], "status": "false" });
    const [revenueDayData, setRevenueDayData] = useState({ "message": [{ "Day": "" }], "status": "false" });



    useEffect(() => {
        ExpensesDayMonth();
        RevenuesDayMonth();
        // eslint-disable-next-line
    }, [])



    const ExpensesDayMonth = async () => {
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

        await axios.post(url, params, config)
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
    }

    const RevenuesDayMonth = async () => {
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

        await axios.post(url, params, config)
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
                console.log(status)
            })
    }


    const callRevenueExpenseMethod = async () => {
        ExpensesDayMonth();
        RevenuesDayMonth();
    }





    return (
        <div>
            <div className="chart">
                <div className="title-chart">
                    <h1>VISUALIZATION OF DATA</h1>
                </div>
                <div className="second_Chart">
                    <h2>Your Monthly Expenses</h2>
                    <div>
                        <PieChart data={expenseData} getMethod={ExpensesEachMonth} setYear={setYear} year={year} labelMonth={labelMonth} />
                    </div>
                </div>
                <div className="second_Chart">
                    <h2>Your Monthly Incomes</h2>
                    <div>
                        <PieChart data={revenueData} getMethod={RevenuesEachMonth} setYear={setYear} year={year} labelMonth={labelMonth} />
                    </div>
                </div>
                <div className="first_Chart">
                    <h2>Your Monthly Expense & Income Comparison</h2>
                    <div className="candlechart">
                        <LineChart currentYear={currentYear} />
                    </div>
                </div>

                <div className="first_Chart">
                    <h2>Your Daily Expense & Income Comparison</h2>
                    <div className="candlechart">
                        <BarChart getMethod={callRevenueExpenseMethod} monthYear={monthYear} setMonthYear={setMonthYear} revenueDayData={revenueDayData} expenseDayData={expenseDayData} labelMonth={labelMonth} />
                    </div>
                </div>




            </div>
        </div>
    )
}

export default Chart