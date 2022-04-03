import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/styles/login.css';


function Signup() {
  
  const [createUser,setCreateUser] = useState({firstname: "",lastname: "",email:"",password:"",age:""});
  let navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
       // eslint-disable-next-line
  }, [])
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/UserAuth/signup.php`;

    const params = new URLSearchParams()
    params.append('firstname', createUser.firstname)
    params.append('lastname', createUser.lastname)
    params.append('age', createUser.age)
    params.append('email', createUser.email)
    params.append('password', createUser.password)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
          var token = result.data['auth-token'];
          localStorage.setItem('token', JSON.stringify(token));
          console.log(localStorage.getItem('token'));
          alert("Account Created Successfully . Welcome, Manage your Expenses and Revenues Easily with us");
          navigate('/')
        }
        else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        alert("Unsuccessful"+err);
      })
     
  }
  const onChange = (e) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value }) 
    console.log(e.target.value);
  }

  return (
    <div className='Signup ' >
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup sign-up">
            <form onSubmit={handleSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fa fa-user-circle"></i>
                <input type="text" placeholder="Enter First Name" value={createUser.firstname} name="firstname" onChange={(e) => onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-user"></i>
                <input type="text" placeholder="Enter Last Name" name="lastname" value={createUser.lastname} onChange={(e) => onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-pencil"></i>
                <input type="text" placeholder="Enter Age" value={createUser.age} name="age" onChange={(e) => onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-envelope"></i>
                <input type="email" placeholder="Enter Email" value={createUser.email} name="email" onChange={(e) => onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-key"></i>
                <input type="password" placeholder="Enter Password" value={createUser.password} name="password" onChange={(e) => onChange(e)} />
              </div>
              <input type="submit" className="btn-log" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Already Have A Account ?</h3>
              <p>
                Lets click on login !!
              </p>
              
              <button className="btn-log transparent" id="sign-up-btn">
                <Link to="/Login" style={{ textDecoration: 'none' }} >Login</Link>
              </button>
              
            </div>
            <div className="image"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;