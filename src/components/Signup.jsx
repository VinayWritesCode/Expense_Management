import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../resources/styles/login.css';


function Signup() {
  
  const [createUser,setCreateUser] = useState({firstname: "",lastname: "",email:"",password:"",age:""});
 
  const handleSubmit = async (e) => {
    e.preventDefault();

      const host = "http://localhost:8808/";  // todo .env variable during deployment
      const response = await fetch(`${host}Server_Expense_Management/api/UserData/UserAuth/signup.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname: createUser.firstname, lastname: createUser.lastname, age: createUser.age, email: createUser.email, password: createUser.password })

      })

      const json = await response.json();
      console.log(json);
      if (json.success) {
        //Storing auth token and redirect
        /*localStorage.setItem('token', json.Authtoken);
        history.push("/");*/
        console.log("Account Created Successfully. Welcome, Enjoy your free cloud storage for your notes", "success");
      }
      else {
        console.log("Account with this email is already exit !!", "danger");
      }
     
  }
  const onChange = (e) => {
    const userdata ={...createUser}
    userdata[e.target.name] = e.target.value
    setCreateUser(userdata)
    console.log(e.target.value);
  }

  return (
    <div className='Signup'>
      <div className="container sign-up-mode">
        <div className="forms-container">
          <div className="signin-signup">
            
            <form onSubmit={handleSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fa fa-user-circle"></i>
                <input type="text" placeholder="Enter First Name" value={createUser.firstname} name="firstname" onChange={(e)=>onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-user"></i>
                <input type="text" placeholder="Enter Last Name" name="lastname" value={createUser.lastname} onChange={(e)=>onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-pencil"></i>
                <input type="text" placeholder="Enter Age" value={createUser.age} name="age"  onChange={(e)=>onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-envelope"></i>
                <input type="email" placeholder="Enter Email" value={createUser.email} name="email"  onChange={(e)=>onChange(e)} />
              </div>
              <div className="input-field">
                <i className="fa fa-key"></i>
                <input type="password" placeholder="Enter Password" value={createUser.password} name="password"  onChange={(e)=>onChange(e)} />
              </div>
              <input type="submit" className="btn-log" value="Sign up" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                "Click on below button to Login into existing account !!"
              </p>
              <button className="btn-log transparent" >
                <Link to="/Login" style={{ textDecoration: 'none' }}>Sign in</Link>
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;