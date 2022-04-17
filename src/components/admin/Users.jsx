import axios from 'axios';
import React, {useState, useEffect} from 'react';
import UserCard from './UserCard';


function Users(props) {

  const {labelMonth} = props;
  const [userInfo, setUserInfo] = useState([{"first_name":"", "last_name":"","age": "", "email":"", "profile_photo":""}]);
  const [searchUser, setSearchUser] = useState({ "firstName": "", "lastName": "", "searchBy": "searchAll"})
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [])

  const fetchUser = async () => {
    let firstName = "";
    let lastName = "";
    if(searchUser.searchBy === "both"){
      firstName = searchUser.firstName;
      lastName = searchUser.lastName;
    } else if (searchUser.searchBy === "firstName"){
      firstName = searchUser.firstName;
    } else if (searchUser.searchBy === "lastName"){
      lastName = searchUser.lastName;
    }

    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/admin/Users/getUsers.php`;
    const Admintoken = localStorage.getItem('admintoken');
    const params = new URLSearchParams()
    params.append('admintoken', Admintoken)
    params.append('firstName', firstName)
    params.append('lastName', lastName)
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

  const search = () => {
    fetchUser();
  }


  const handleDelete = async (e) => {
    let user_id = e.target.name;
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/admin/Users/deleteUser.php`;
    const Admintoken = localStorage.getItem('admintoken');
    const params = new URLSearchParams()
    params.append('admintoken', Admintoken)
    params.append('user_id', user_id);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
           alert("Deleted Successfully")
        }
        else {
          alert("Sorry, No Data");
        }
      })
      .catch((err) => {
        alert("Sorry, Cannot Delete Data");
      })

    fetchUser();
  }


  const handleChange = (e) => {
    setSearchUser({ ...searchUser, [e.target.name]: e.target.value });
  }

  


    return (
      <>
        
        <div className="title">
          <h5>Website Users</h5>
        </div>
        <div className="searchUsers">
          
          <div className="inputSearch">
            <div className="select-Search">
              Search By
              <select name="searchBy" className='input' onChange={e => setSearchUser({ ...searchUser, [e.target.name]: e.target.value })}>

                <option value="searchAll" >Search All</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="both">Full Name</option>
              </select>
            </div>
          {
          (searchUser.searchBy === "firstName" || searchUser.searchBy === "both") ? <input type="text" name="firstName" className='input' value={searchUser.firstName} placeholder='Enter First Name' onChange={e => handleChange(e)} /> : ""
          }
          {
              (searchUser.searchBy === "lastName" || searchUser.searchBy === "both") ? <input type="text" name="lastName" className='input' value={searchUser.lastName} placeholder='Enter Last Name' onChange={e => handleChange(e)} /> : ""
          }
            <button onClick={search}>Search</button>
          </div>
        
        </div>
        <div className="container-user">

          {
            userInfo.map(item => {
              return <div key={(Math.random() * 10) + item.user_id}>
                <UserCard data={item} labelMonth={labelMonth} handleDelete={handleDelete}/>
              </div>
            })
          }
        </div>
        </>
    )
}

export default Users