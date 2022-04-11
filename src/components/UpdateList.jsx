import React, { useState, useEffect } from 'react';
import ListItems from './ListItems';
import '../resources/styles/UpdateList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateForm from './UpdateForm';



function UpdateList() {

  const [listStatus, setListStatus] = useState("Expenses");
  const [ExpenseData, setExpenseData] = useState([]);
  const [RevenueData, setRevenueData] = useState([]);
  const [showUpdate, setShowUpdate] = useState({ status: "false", type: ""
});
  const [status, setStatus ] = useState([]);
  const [data, setData] = useState();
  let navigate = useNavigate();

  const refreshPage = () => {
    navigate("/UpdateList");
    window.location.reload();
  }
   
     useEffect(() => {

       if (localStorage.getItem('token')) {
         showRevenues();
         showExpenses();
       }
       else {
         navigate('/Login');
       }
       // eslint-disable-next-line
     }, [])

  

  const showExpenses = async () => {
    
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getAllExpense.php`;
    const params = new URLSearchParams()
    params.append('token', localStorage.getItem('token'))

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
    setListStatus("Expenses");
  }


  

  const showRevenues = async () => {
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getAllRevenue.php`;

    const params = new URLSearchParams()
    params.append('token', localStorage.getItem('token'))

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
    setListStatus("Incomes");
  }

    return (
      <div className='contains'>
        <div className="container-top">
          <div className="title">
            <h6> List Of All {listStatus} </h6>
          </div>
          <div className="buttons">
            <input type="button" onClick={showExpenses} value="Expense" />
            <input type="button" onClick={showRevenues} value="Income" />
          </div>
        </div>
        
        {
          (showUpdate.status === "true") ? <div className="form" style={{ background:"#1e0225"}}>
            <UpdateForm data={data} showUpdate={showUpdate} setShowUpdate={setShowUpdate} refreshPage={refreshPage}/>
          </div> : ""
        }
        {
          

          (listStatus === "Expenses") ? (showUpdate.status === "false") ? <div className="items">
            <ListItems data={ExpenseData} status="Expenses" setData={setData} setShowUpdate={setShowUpdate} refreshPage={refreshPage} />
          </div> : "" : (showUpdate.status === "false") ? <div className="items" >
              <ListItems data={RevenueData} status="Revenues" setData={setData} setShowUpdate={setShowUpdate} refreshPage={refreshPage}/>
          </div> : ""
        }
         
      </div>
    )
  
}

export default UpdateList