import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../resources/styles/admin.css";
import Dashboard from './Dashboard';
import Insight from './Insight';
import UserMessage from './UserMessage';
import Users from './Users';

function Admin() {
  let navigate = useNavigate();
  const [content, setContent] = useState("Dashboard");
  const [labelMonth, setLabelMonth] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
  
  useEffect(() => {
    // if user already login
    if (!localStorage.getItem('admintoken')) {
      navigate('/admin/AdminLogin');
    }
    
    // eslint-disable-next-line
  }, [])


  let adminName = localStorage.getItem('adminName');
  const adminLogout = () => {
    localStorage.removeItem('admintoken');
    navigate("/admin/AdminLogin");
  }

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  
  return (
    <div className='admin-container'>

      <aside className='sidebar'>
        <div>
          
         
          <Link to="/" className='no-decoration-vs'>
            <div className="flex-col-vs">
              <button className='no-btn'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <span>The App</span>
                </button>
            </div>
          </Link>
          <div>
            <div>
              <Link to="#Dashboard" id="Dashboard" className='no-decoration-vs'>

                <div className="flex-col-vs">
                  <button className='no-btn' onClick={() => setContent("Dashboard")}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span >Dashboard</span>
                    </button>
                </div>
              </Link>

              <Link to="#Insight" className='no-decoration-vs'>

                <div className="flex-col-vs">
                  <button className='no-btn' onClick={() => setContent("Insight")}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Insights</span>
                    </button>
                </div>
              </Link>
              <Link to="#Users" className='no-decoration-vs'>
                <div className="flex-col-vs">
                  <button className='no-btn' onClick={() => setContent("Users")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="#fff" /><circle cx="128" cy="120" r="44" /><path  d="M128,24A104,104,0,1,0,232,128,104.11791,104.11791,0,0,0,128,24Zm65.75806,162.41016a79.70266,79.70266,0,0,0-24.43091-22.97461,59.83641,59.83641,0,0,1-82.6543,0A79.7048,79.7048,0,0,0,62.2417,186.41016a88.00015,88.00015,0,1,1,131.51636,0Z" />
                    </svg>
                  <span>Users</span>
                  </button>
                </div>
              </Link>
            </div>
            <div>
              <Link to="#Message"  className='no-decoration-vs'>
                <div className="flex-col-vs">
                  <button className='no-btn' onClick={() => setContent("Message")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>Messages</span>
                  </button>

                </div>
              </Link>
            </div>
          </div>
          <button className='btn-log' onClick={adminLogout}> Logout </button>

        </div>
      </aside>
  <div className="right-content">
        <section>
          
          <div>
            {
              (content === "Dashboard") ? <><div className="topAdminBar"><h5 id='adminName'><span>Hi </span> , {adminName} </h5></div><Dashboard currentYear={currentYear} currentMonth={currentMonth} labelMonth={labelMonth} /> </> : (content === "Message") ? <UserMessage /> : (content === "Insight") ? < Insight currentYear={currentYear} currentMonth={currentMonth} labelMonth={labelMonth} setLabelMonth={setLabelMonth}/> : (content === "Users") ? <Users labelMonth={labelMonth} /> : ""
            }
          </div>
        </section>
        
    </div>
          </div>
  )
}

export default Admin