import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../resources/styles/Contact.css";


function Contact() {

  const [about, setAbout] = useState({ "subject": "", "message": "" });

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

  const handleClick = async (e) => {
    e.preventDefault();

    if (about.subject && about.message) {

      const url = `http://localhost:8808/Server_Expense_Management/api/UserData/addData/addContact.php`;
      const params = new URLSearchParams()
      params.append('token', localStorage.getItem('token'))
      params.append('subject', about.subject);
      params.append('message', about.message);

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }

      await axios.post(url, params, config)
        .then((result) => {
          if (result.data.status === "true") {
            alert("Message send successfully");
          }
          else {
            alert(result.data.message);
          }
        })
        .catch((err) => {
          // Do somthing
        })
    } else {
      alert("Please complete your contact form");
    }
  }

  const handleChange = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value })
    console.log(e.target.value);
  }

  return (
    <div className='contact-page-container center-by-vs '>
      <div className="content-contact">
        <div className="wrap-left-vs">
          <div className="wrap-input">
            <div className="title-content">
              <div className="title"> Write us</div>
              <div class="inputs-contact">
                <input type="text" class="form-input" name="subject" value={about.subject} id="subject" placeholder="Enter Subject" onChange={e => handleChange(e)} />
                <textarea name="message" class="form-input " id="message" cols="30" value={about.message} rows="6" placeholder=" Enter Message" onChange={e => handleChange(e)}></textarea>
                <input type="button" className='mt-5-vs' onClick={handleClick} value="Send" />
              </div>
            </div>
          </div>
          <div className="wrap-right-vs">
            <div className="title-content mt-less-5-vs">
              <div className="title mb5-vs"> Contact Information (Owner) </div>
              <div className="owner-info-vs"><h4>Email : <span>VinayWritesCode@gmail.com</span></h4></div>
              <div className="owner-info-vs"><h4>Phone no. : <span> +9184847xxx48 </span></h4></div>
              <div className="owner-info-vs"><h4>Address : <span>244, 5th Floor IT PARK,Udaipur(Raj)</span> </h4></div>
              <div className="owner-info-vs"><h4>Github : <span> <Link to='https://github.com/VinayWritesCode'>VinayWritesCode</Link></span></h4></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;