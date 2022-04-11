import React from 'react';
import '../../resources/styles/Card.css'

function AdminCard(props) {
  const { title , number } = props;
  return (
    <div>
          <div className="card">
              <div className="row1">
                  <h4>{title} </h4>
              </div>
              <div className="row2"><span>{number}</span></div>
          </div>
    </div>
  )
}

export default AdminCard