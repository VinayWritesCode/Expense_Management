import React, { useState } from 'react';
import ListItems from './ListItems';
import '../resources/styles/UpdateList.css';




function UpdateList() {

  const [listStatus, setListStatus] = useState("Expenses");
  const [data, setdata] = useState([]);






  const showExpenses = async () => {
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/getData/getAllExpense.php`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': '+wLhcj5ZMLOd3BFhh/04OQ==',
          mode: 'cors'
        }
      })
      const json = await response.json();
      console.log(json);
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
        <ListItems data={data} />
      </div>
    </div>
  )
}

export default UpdateList