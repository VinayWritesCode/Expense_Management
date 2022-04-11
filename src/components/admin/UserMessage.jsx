import axios from 'axios'
import React, {useState, useEffect} from 'react'
import MessageCard from './MessageCard'

function UserMessage() {

  const [contactInfo, setContactInfo] = useState([{ "first_name": "", "last_name": "", "profile_photo": "", "subject": "", "message": "" }])
 

  useEffect(() => {
    fetchMessage()
    // eslint-disable-next-line
  }, [])
  
  const fetchMessage = async () => {

    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/admin/userContact.php`;
    const Admintoken = localStorage.getItem('admintoken');
    const params = new URLSearchParams()
    params.append('admintoken', Admintoken)
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        if (result.data.status === "true") {
          setContactInfo(result.data.contactInfo);
        }
        else {
          alert("Sorry, No Data");
        }
      })
      .catch((err) => {
        alert("Sorry, Server Error");
      })


  }
 
  return (
    <div>
      <div className="title">
        <h5>Admin Messages</h5>
      </div>
      {
        contactInfo.map(item => {
          return <div key={item.id}>
              <MessageCard first_name={item.first_name} last_name={item.last_name} profile_photo={item.profile_photo} subject={item.subject} message={item.message} />
          </div>
        })
      }
     </div>

  )
}

export default UserMessage