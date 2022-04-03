import React from 'react';
import '../resources/styles/About.css';




function About() {
  

  return (
    <div className="About">
      <div className="about-frame">
        <div className="about-card">
          
            <h2 style={{margin: "5vh 10vw"}}>ABOUT Page</h2>

          <div style={{ margin: "5vh 10vw" }}> Some Content Here</div>
          <h4>Build And Developed by <i className='fa social-github' style={{ color: "#800080", fontSize : "25px"}}>VinayWritesCode</i> </h4>
          
           
        </div>
      </div>
    </div>
  )
}

export default About