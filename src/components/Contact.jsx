import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
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
    <div className='contact-page-container'>
        <div className="title">Contact Page</div>
        <section style={{height: "100vh"}}>
             <div>
               <h1>Contact Page</h1>
             </div>
        </section>
    </div>
  )
}

export default Contact;