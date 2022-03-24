import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../resources/styles/login.css';

function Login() {

    const [login, setLogin] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const host = "http://localhost:8808/";  // todo .env variable during deployment
        const response = await fetch(`${host}Server_Expense_Management/api/UserData/UserAuth/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: login.email, password: login.password })

        })

        const json = await response.json();
        console.log(json);
        

    }
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
        console.log(e.target.value);
        
    }

  return (
    <div className='Login ' >
          <div className="container">
              <div className="forms-container">
                  <div className="signin-signup sign-in">
                      <form onSubmit={handleSubmit} className="sign-in-form">
                          <h2 className="title">Login in</h2>
                          <div className="input-field">
                              <i className="fa fa-envelope" aria-hidden="true"></i>
                              <input type="text" placeholder="Email" value={login.email} name="email" onChange={(e) => handleChange(e)}/>
                          </div>
                          <div className="input-field">
                              <i className="fa fa-key"></i>
                              <input type="password" placeholder="Password" value={login.password} name="password" onChange={(e) => handleChange(e)} />
                          </div>
                          <input type="submit" value="Login" className="btn-log solid" />
                          
                      </form>
                     
                  </div>
              </div>

              <div className="panels-container">
                  <div className="panel left-panel">
                      <div className="content">
                          <h3>New here ?</h3>
                          <p>
                              "Click on below button to create new account !!"
                          </p>
                          <button className="btn-log transparent" id="sign-up-btn">
                              <Link to="/Signup" style={{ textDecoration: 'none'}} >Sign Up</Link>
                          </button>
                      </div>
                      <img src="img/log.svg" className="image" alt="" />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Login