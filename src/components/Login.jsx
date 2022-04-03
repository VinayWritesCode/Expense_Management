import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../resources/styles/login.css';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [login, setLogin] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    useEffect(() => {
        // if user already login
        if (localStorage.getItem('token')) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/UserAuth/login.php`;

        const params = new URLSearchParams()
        params.append('email', login.email)
        params.append('password', login.password)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                if (result.data.status === "true"){
                    var token = result.data['auth-token'];
                    localStorage.setItem('token', JSON.stringify(token));
                    console.log(localStorage.getItem('token'));
                    alert("Login Successfully . Welcome, Manage your Expenses and Revenues Easily with us");
                    navigate('/')
                }
                else {
                    alert("Sorry, Login unsuccessfull");
                }
            })
            .catch((err) => {
                
            })
        

    }
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })    
    }

    console.log(localStorage.getItem('token'));
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
                      <div className="image"></div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Login