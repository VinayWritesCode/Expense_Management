import React from 'react'
import Cards from './Cards';
import Chart from './Chart';
import MainForm from './MainForm';
import '../resources/styles/Home.css';
import saveMoney  from '../images/saveMoney.png';
import img1 from '../images/img1.svg';
import img2 from '../images/img2.svg';
import img3 from '../images/img3.svg';
import img4 from '../images/img4.svg';

function Home() {
  return (
      <>
      <div className="design">
        <img src={img2} alt="animate"  />
      </div>
          <div className='TopContents'>
            <div className="bottom">
          <Cards />
          <MainForm />
            </div>
          </div>
          <Chart />
    </>
  )
}

export default Home