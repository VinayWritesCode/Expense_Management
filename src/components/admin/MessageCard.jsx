import React from 'react';
import "../../resources/styles/MessageCard.css";
import profilePic from '../../images/profilePic.jpg';

function MessageCard(props) {
  const { first_name, last_name, profile_photo, subject, message, datetime } = props;
  return (

    <div className="message-card-container">
      <div className="message-card">
        <div className="partOne">
          {(profile_photo) ? <img src={`data:image/jpeg;base64,${profile_photo}`} alt="" /> : <img src={profilePic} alt="" />}

          <div className="name">{first_name + " " + last_name}</div>
        </div>
        <div className="partTwo">
          <span>Subject : {subject} </span>
          <span>Message : {message} </span>
          <span>Date : {datetime}</span>
        </div>
      </div>
    </div>
  )
}

export default MessageCard