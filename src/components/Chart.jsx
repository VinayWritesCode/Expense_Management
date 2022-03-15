import React from 'react'
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import data from '../resources/data';



function Chart() {

    return (
        <div>
            <div className="chart">
                <div className="first_Chart">
                    <h1>Your Daily Expense & Revenue</h1>
                    <div className="candlechart">
                        <BarChart />
                    </div>
                </div>
                <div className="second_Chart">
                    <h1>Your Monthly Expenses</h1>
                    <div>
                        <PieChart data={data}/>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Chart