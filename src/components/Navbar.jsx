import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../resources/styles/Navbar.css';

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  

    const logOut = () => {
      localStorage.removeItem('token'); 
      navigate("/Login");
    }

  const refreshPage = () => {
    navigate("/UpdateList");
    window.location.reload();
  }

  



  if (location.pathname === "/admin/Home" || location.pathname === "/admin/AdminLogin"){
    
    return <></>
  }
  else {
    return (
      <div>
        <nav>
          <ul>
            <li> <Link to="/" className={`btn ${location.pathname === "/" ? "active" : ""}`} >Home</Link> </li>
            <li><Link to="/UpdateList" onClick={refreshPage} className={`btn ${location.pathname === "/UpdateList" ? "active" : ""}`} > Records </Link></li>
            <li><Link to="/Profile" className={`btn ${location.pathname === "/Profile" ? "active" : ""}`}  >Profile</Link></li>
            <li><Link to="/Contact" className={`btn ${location.pathname === "/Contact" ? "active" : ""}`}  >Contact Us</Link></li>
            <li><Link to="/About" className={`btn ${location.pathname === "/About" ? "active" : ""}`}  >About Us</Link></li>
            <li><button onClick={logOut} className="btn btn-logout"> {localStorage.getItem('token') ? "Logout" : ""} </button></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Navbar