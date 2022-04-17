import React from 'react';
import "../../resources/styles/Users.css"
import profilePic from '../../images/profilePic.jpg';

function UserCard(props) {
    const { data, labelMonth,handleDelete } = props;
    const day =  data.Day;
    const month = labelMonth[data.Month-1];
    const year = data.Year;

    
  return (
      <div className="card-user">
          {(data.profile_photo) ? <img src={`data:image/jpeg;base64,${data.profile_photo}`} alt="" className="card__image" /> : <img src={profilePic} alt="" className="card__image" /> }
          <p className="card__name">{data.first_name + " " + data.last_name}</p>
          <div className="grid-container">
              <div className="joined">
                  Joined on <span>{day+" "+month+" "+year}</span>
              </div>
              <div className="grid-child-email">
                  Email <br /> <p>{data.email}</p>
              </div>

              <div className="grid-child-age">
                  Age <br /> <p>{data.age}</p>
              </div>

          </div>
          <button className="btn-user  draw-border" name={data.user_id} onClick={e => handleDelete(e)}>Delete</button>

      </div>
  )
}

export default UserCard