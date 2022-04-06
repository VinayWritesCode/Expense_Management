import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../resources/styles/Profile.css';
import profilePic from '../images/profilePic.jpg';
import addIcon from '../images/addIcon.webp';


function Profile() {

  const [userInfo, setUserInfo] = useState({
    "first_name": "", "last_name": "", "age": "", "email": "", "profile_photo": "" })
  const [score, setScore ] = useState({"score": "0", "stype": ""})

  

  let navigate = useNavigate();
  useEffect(() => {

    if (localStorage.getItem('token')) {
      // user have auth-token
    }
    else {
      navigate('/Login');
    }
    getProfileInfo();
    // eslint-disable-next-line
  }, [])

  const date = new Date();
  const currentYear = date.getFullYear();

  const getProfileInfo = async () => {
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getProfileInfo.php`;
    const params = new URLSearchParams()
    params.append('token', localStorage.getItem('token'))
    params.append('year', currentYear)
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
          console.log(result.data.message[0])
          setUserInfo(result.data.message[0])
          setScore({ "score": result.data.score, "stype": result.data.stype})
        }
        else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        // Do somthing
      })
  }

  const refreshPage = () => {
    window.location.reload();
  }


  const changeUserPhoto = async (e) => {

    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/updateData/updateProfilePhoto.php`;
    const params = new FormData()
   // const params = new URLSearchParams()
    params.append('photo', e.target.files[0]);
    const config = {
      headers: {
        'Content-Type': 'Multipart/form-data',
        'token': localStorage.getItem('token'),
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
          refreshPage();
        }
        else {
          alert(result.data.message);
        }
      })
      .catch((err) => {
        // Do somthing
      })

  }

  const onAdd = (e) => {
    console.log({ [e.target.name]: e.target.value})
    changeUserPhoto(e);
  }

  return (
    <div className='container-profile'>
      <div className="content-profile">
        <div className="card-profile">
          <div className="first-info-profile">
            {(userInfo.profile_photo) ? <img src={`data:image/jpeg;base64,${userInfo.profile_photo}`} alt="" /> : <img src={profilePic} alt="" />}
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={addIcon} alt="" />
              </label>
              <input id="file-input" type={"file"} name="profile_photo" onChange={e => onAdd(e)} />
            </div>
          </div>
          
          <div className="profileinfo">
            <h1>Hi, {userInfo.first_name}</h1>
            <h3>Score : {score.score+"%"}({score.stype})</h3>
            <p className="bio">" Score help you to identify your current year performance "</p>
          </div>
        </div>
        
      </div>
      <div className="profile-title">
        <h2 className='title'>Your Profile Details</h2>
      </div>
      <div className="user-data">
        <div className="card-profile">
          <div className="profileinfo center-by-vs ">
            <div style={{color: "#fff"}}>
              <div>
               <div className='col-vs'>
                  <label><h4 >First Name :</h4></label>
                  <span><h4 >{userInfo.first_name}</h4></span>
                 </div> 
                <div className='col-vs'>
                  <label><h4 >Last Name :</h4></label>
                  <span><h4 >{userInfo.last_name}</h4></span>
                </div> 
                <div className='col-vs'>
                  <label><h4 >Age :</h4></label>
                  <span><h4 >{userInfo.age}</h4></span>
                </div> 
                <div className='col-vs'>
                  <label><h4 >Email </h4></label>
                  <span><h4 >{":"+userInfo.email}</h4></span>
                </div> 
              </div>
            </div>

          </div>
        </div>
      </div>
       
    </div>
  )
}

export default Profile