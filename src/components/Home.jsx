import React, { useEffect } from 'react'
import Cards from './Cards';
import Chart from './Chart';
import MainForm from './MainForm';
import '../resources/styles/Home.css';
import img2 from '../images/img2.svg';
import { useNavigate } from 'react-router-dom';



function Home() {
  let navigate = useNavigate();
  useEffect(() => {

    if (localStorage.getItem('token')) {
      // user have auth-token
    }
    else {
      navigate('/Login');
    }
    // eslint-disable-next-line
  }, [])

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