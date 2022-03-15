import React, { useState } from 'react';
import ListItems from './ListItems';
import '../resources/styles/UpdateList.css';

function UpdateList() {
  
  const [listStatus, setListStatus ] = useState("Expenses");

  const showExpenses = () => {
        setListStatus("Expenses");
  }

  const showRevenues = () => {
        setListStatus("Revenues");
  }

  return (
    <div>
      <div className="title">
        <h2> List Of All {listStatus} </h2>
      </div>
      <div className="buttons">
        <input type="button" onClick={showExpenses} value="Expense" />
        <input type="button" onClick={showRevenues} value="Revenue" />
      </div>
      <div className="items">
          <ListItems />
      </div>
    </div>
  )
}

export default UpdateList