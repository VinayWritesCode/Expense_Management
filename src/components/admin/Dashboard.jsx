import React, { useState, useEffect } from 'react';
import "../../resources/styles/admin.css";
import AdminCard from "./AdminCard";
import axios from 'axios';

function Dashboard(props) {
 
  const { currentYear, currentMonth, labelMonth } = props; 

 
  const [cardData, setCardData] = useState({ "title1": "Total Users", "title2": "New Users (" + labelMonth[currentMonth]+")", "title3": "Total Expense Record (Users)","title4": "Total Revenue Record (Users)","title5": "Total Messages", "num1": 0, "num2": 0, "num3": 0, "num4": 0,"num5": 0});

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line
  }, [])
  
  const fetchDashboard = async () => {
        
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/admin/dashboard.php`;
        const Admintoken = localStorage.getItem('admintoken');
        const params = new URLSearchParams()
        params.append('admintoken', Admintoken)
        params.append('month',currentMonth)
        params.append('year',currentYear)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                if (result.data.status === "true") {
                  setCardData({ ...cardData,
                     "num1": result.data.result1[0].TotalUser, 
                    "num2": result.data.result2[0].NewUserMonth,
                    "num3": result.data.result3[0].TotalMessage,
                    "num4": result.data.result4[0].TotalExpense,
                    "num5": result.data.result5[0].TotalRevenue,
                    })
                }
                else {
                    alert("Sorry, No Data");
                }
            })
            .catch((err) => {
              alert("Sorry, Cannot fetch Data");
            })


    }
  
  return (
    <div>
      <div className="title">
        <h5>Admin Dashboard</h5>
      </div>
      <div className="content-admin">
        <div className="cards">
          < AdminCard title={cardData.title1} number={cardData.num1} />
          < AdminCard title={cardData.title2} number={cardData.num2} />
          < AdminCard title={cardData.title5} number={cardData.num3} />
          < AdminCard title={cardData.title3} number={cardData.num4} />
           < AdminCard title={cardData.title4} number={cardData.num5} />
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard