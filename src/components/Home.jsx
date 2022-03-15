import React from 'react'
import Cards from './Cards';
import Chart from './Chart';
import MainForm from './MainForm';
import '../App.css';
import '../resources/styles/Home.css';

function Home() {
  return (
      <>
          <div className='TopContents'>
              <Cards />
              <MainForm />
          </div>
          <Chart />
    </>
  )
}

export default Home