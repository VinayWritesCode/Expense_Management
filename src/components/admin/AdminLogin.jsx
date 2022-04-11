import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../resources/styles/login.css';
import { useNavigate } from 'react-router-dom';


function AdminLogin() {

    const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    useEffect(() => {
        // if user already login
        if (localStorage.getItem('admintoken')) {
            navigate('/admin/Home');
        }
        // eslint-disable-next-line
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/admin/adminLogin.php`;

        const params = new URLSearchParams()
        params.append('email', adminLogin.email)
        params.append('password', adminLogin.password)
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        await axios.post(url, params, config)
            .then((result) => {
                if (result.data.status === "true") {
                    let token = result.data['auth-token'];
                    let adminName = result.data['name'];
                    localStorage.setItem('admintoken', JSON.stringify(token));
                    localStorage.setItem('adminName', adminName);
                    console.log(localStorage.getItem('token'));
                    alert("Voila !! Admin Login successfully !!");
                    navigate('/admin/Home');
                }
                else {
                    alert("Sorry, Login unsuccessfull");
                }
            })
            .catch((err) => {
                alert("Sorry, Login unsuccessfull");
            })


    }
    const handleChange = (e) => {
        setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value })
    }

    console.log(localStorage.getItem('token'));
    return (
        <div className='Login ' >
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup sign-in">
                        <form onSubmit={handleSubmit} className="sign-in-form">
                            <h2 className="title">Admin Login</h2>
                            <div className="input-field">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                <input type="text" placeholder="Email" value={adminLogin.email} name="email" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input-field">
                                <i className="fa fa-key"></i>
                                <input type="password" placeholder="Password" value={adminLogin.password} name="password" onChange={(e) => handleChange(e)} />
                            </div>
                            <input type="submit" value="Login" className="btn-log solid" />

                        </form>

                    </div>
                    <div className="panels-container">
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>Hello , Admin </h3>
                                <p>
                                    Please enter your login details to view your dashboard
                                </p>
                                
                            </div>
                            <div className="image"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin