import React, { useState, useEffect } from 'react'
import Cards from './Cards';
import Chart from './Chart';
import MainForm from './MainForm';
import '../resources/styles/Home.css';
import img2 from '../images/img2.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';




function Home() {
  let navigate = useNavigate();
  let location = useLocation();
  
  useEffect(() => {

    if (localStorage.getItem('token')) {
      // user have auth-token
    }
    else {
      navigate('/Login');
    }
    ExpensesEachMonth();
    RevenuesEachMonth();
    
    // eslint-disable-next-line
  }, [])

  const date = new Date();
  const [expenseData, setExpenseData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const [year, setYear] = useState(currentYear);
  const [status, setStatus] = useState("false");
  const [labelMonth, setLabelMonth] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);


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
        setLabelMonth(labelMonth)
      })
  }




  if (location.pathname === "/admin/Home" || location.pathname === "/admin/AdminLogin") {

    return <></>
  }
  else{

  return (
    <div className='home-container'>
      <div className="wrap-top">
        <div className='home-top-container-vs'>
          <div className="landing-page-title">
            <h4 id="type-text">Hi,<br /> <span>W</span>elcome to <span>W</span>orld <span>B</span>est <span>P</span>ersonal <span>B</span>udget <span>T</span>racker <span>W</span>ebsite </h4>
          </div>
          <div className="design">
            <img src={img2} alt="" />
          </div>

        </div>
      </div>
      
        <div className='TopContents'>
          <div className="bottom">
            <Cards labelMonth={labelMonth} currentYear={currentYear} currentMonth={currentMonth} />
          
            <MainForm />
           
          </div>
      </div>
      
      <Chart labelMonth={labelMonth} expenseData={expenseData} revenueData={revenueData} ExpensesEachMonth={ExpensesEachMonth} RevenuesEachMonth={RevenuesEachMonth} status={status} currentYear={currentYear} year={year} setYear={setYear} />
    </div>
  )
}
}

export default Home