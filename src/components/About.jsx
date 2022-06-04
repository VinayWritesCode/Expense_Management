import React from 'react';
import '../resources/styles/About.css';
import fullLogo from '../images/Logo(Full).png';
import { Link } from 'react-router-dom';




function About() {


  return (
    <div className="About">
      <div className="top">
        <div className="title"> About Us</div>
      </div>
      <div className="content-contact">

        <div className="content-wrapper">
          <div className="About-logo">
            <img src={fullLogo} alt="" />
          </div>
          <div className="about-me">
            Build And Developed By <Link to="/"><i className='fa fa-github'></i> VinayWritesCode</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About