import React, { useState } from 'react';
import axios from 'axios';



function ExpenseForm(props) {

    const [expenseData, setexpenseData] = useState({ datetime: null, Amount: null, Type: null, Remark: null});
 

    const { expenseForm } = props;

    const handleExpenseSubmit = async (e) => {
        e.preventDefault();

        if (expenseData.datetime  && expenseData.Amount && expenseData.Type){

        const url = `http://localhost:8808/Server_Expense_Management/api/UserData/addData/addExpense.php`;

        const params = new URLSearchParams()
        params.append('datetime', expenseData.datetime)
        params.append('amount', expenseData.Amount)
        params.append('type', expenseData.Type)
        params.append('remark', expenseData.Remark)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        axios.defaults.headers.post['auth-token'] = localStorage.getItem('token');

        await axios.post(url, params, config)
            .then((result) => {
                console.log(result.data)
                if (result.data.status === "true") {
                    alert("New Expense information added successfully");
                    expenseForm();
                }
                else {
                    console.log(result.message);
                }
            })
            .catch((err) => {
                alert("Unsuccessful");
            })
        }else{
            alert("Please enter your data");
        }

    }
    const onChange = (e) => {
        setexpenseData({ ...expenseData, [e.target.name]: e.target.value })
        console.log(e.target.value);
    }

  return (
    <div>
          <button id="close" onClick={expenseForm}>x</button>
          <form>
              <table cellPadding="8px" cellSpacing="17.5vh" >
                  <thead>
                          <th colSpan="2" align='center' id="form-title">Expense Form</th>
                      </thead>
                      <tr>
                          <th>Date :</th>
                      <td><input type="date" className="input" value={expenseData.datetime} name="datetime" onChange={(e) => onChange(e)} required /></td>
                      </tr>
                      <tr>
                          <th>Amount :</th>
                      <td><input type="text" placeholder="Enter Amount" className="input" value={expenseData.Amount} name="Amount" onChange={(e) => onChange(e)} required /></td>
                      </tr>
                      <tr>
                          <th>Type :</th>
                      <td><select className="input" value={expenseData.Type} name="Type" onChange={(e) => onChange(e)}>
                              <option value="none">Select Type</option>
                              <option value="Food & Grocery">Food & Grocery</option>
                              <option value="Petrol/Diesel/Electricity">Petrol/Diesel/Electricity</option>
                              <option value="Rent">Rent</option>
                              <option value="Shopping">Shopping</option>
                              <option value="Recharges & Bill Payment">Recharges & Bill Payment</option>
                              <option value="Others">Others</option>
                          </select></td>
                      </tr>
                      <tr>
                          <th>Remark :</th>
                      <td><input type="text" className="input" placeholder="Add Remark" value={expenseData.Remark} name="Remark" onChange={(e) => onChange(e)} /></td>
                      </tr>
                      <tr>
                          <td colSpan="2"><input type="button" className="input" style={{ cursor: "pointer" }} onClick={handleExpenseSubmit} value="Submit" /></td>
                      </tr>
                  
              </table>
          </form>
    </div>
  )
}

export default ExpenseForm