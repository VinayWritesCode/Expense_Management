import axios from 'axios';
import React, {useState, useEffect} from 'react';
import UserCard from './UserCard';


function Users(props) {

  const {labelMonth} = props;
  const [userInfo, setUserInfo] = useState([{"first_name":"", "last_name":"","age": "", "email":"", "profile_photo":""}]);
    
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [])

  const fetchUser = async () => {

    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/admin/Users/getUsers.php`;
    const Admintoken = localStorage.getItem('admintoken');
    const params = new URLSearchParams()
    params.append('admintoken', Admintoken)
    params.append('firstName', "")
    params.append('lastName', "")
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
             setUserInfo(result.data.message);
        }
        else {
          alert("Sorry, No Data");
        }
      })
      .catch((err) => {
        alert("Sorry, Cannot fetch Data");
      })


  }



  


    return (
      <>
        
        <div className="title">
          <h5>Website Users</h5>
        </div>
        <div className="searchUsers">
          <input type="text" placeholder='Search user here' />
          <button>Search</button>
        </div>
        <div className="container-user">

          {
            userInfo.map(item => {
              return <div key={(Math.random() * 10) + item.user_id}>
                <UserCard data={item} labelMonth={labelMonth}/>
              </div>
            })
          }
        </div>
        </>
    )
}

export default Users