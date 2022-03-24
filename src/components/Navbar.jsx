import React from 'react'
import { Link, useLocation } from "react-router-dom";
import '../resources/styles/Navbar.css';

function Navbar() {
  let location = useLocation();

    React.useEffect(() => {
    }, [location]);

    
   

  return (
    <div>
      <nav>
        <ul>
         
          <li> <Link to="/" className={`btn ${location.pathname === "/" ? "active" : ""}`} >Home</Link> </li>
          <li><Link to="/UpdateList" className={`btn ${location.pathname === "/UpdateList" ? "active" : ""}`} > Data Lists </Link></li>
          <li><Link to="/Profile" className={`btn ${location.pathname === "/Profile" ? "active" : ""}`}  >Profile</Link></li>
          <li><Link to="/Blogs" className={`btn ${location.pathname === "/Blogs" ? "active" : ""}`}  >Blogs</Link></li>
          <li><Link to="/About" className={`btn ${location.pathname === "/About" ? "active" : ""}`}  >About Us</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar