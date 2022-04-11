import axios from 'axios';
import React, { useState } from 'react';



function UpdateForm(props) {

    
    const { data, showUpdate, setShowUpdate, refreshPage } = props;

    const [ formData, setFormData ] = useState(data);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((formData.datetime || formData.DateTime) && formData.Amount) {

            let updateType;
            const params = new URLSearchParams()
            if(showUpdate.type === "Expense"){

                updateType = "updateExpense.php";
                params.append('spendid', formData.spendid)
                params.append('datetime', formData.datetime)
                params.append('type', formData.Type)
                params.append('remark', formData.Type)
            } else { 
                updateType = "updateRevenue.php"; 
                params.append('recieved_id', formData.recieved_id)
                params.append('datetime', formData.DateTime) 
             }
            params.append('amount', formData.Amount)
            params.append('remark', formData.Remark)

            const url = `http://localhost:8808/Server_Expense_Management/api/UserData/updateData/${updateType}`;
           
            

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
                        alert(" Expense Update successfully");
                        setShowUpdate('false');
                    }
                    else {
                        console.log(result.data.message);
                    }
                })
                .catch((err) => {
                    alert("Unsuccessful");
                })
        } else {
            alert("Please enter your Data");
        }

        closeForm();
        refreshPage();

    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(e.target.value);
    }

    const closeForm = () => {
        setShowUpdate({
            status: "false",
            type: ""
        });
    }

    if (formData.status === "false"){
         return (
             <div className="loading">Loading ...</div>
         )
    }
    else{

  return (
      <div>
          <button id="close" onClick={closeForm} >x</button>
          <form>
              <table cellPadding="8px" cellSpacing="17.5vh" >
                  <thead>
                      {
                          (showUpdate.type === "Expense") ? <th colSpan="2" align='center' id="form-title">Expense Form</th> : <th colSpan="2" align='center' id="form-title">Income Form</th>
                      }
                      
                  </thead>
                  <tr>
                      <th>Date :</th>
                      {
                          (showUpdate.type === "Expense") ? <td><input type="date" className="input" value={formData.datetime} name="datetime" onChange={(e) => onChange(e)} required /></td> : <td><input type="date" className="input" value={formData.DateTime} name="DateTime" onChange={(e) => onChange(e)} required /></td>
                      }
                     </tr>
                  <tr>
                      <th>Amount :</th>
                      <td><input type="text" placeholder="Enter Amount" className="input" value={formData.Amount} name="Amount" onChange={(e) => onChange(e)} required /></td>
                  </tr>
                  {
                      (showUpdate.type === "Expense") ? <tr>
                          <th>Type :</th>
                          <td><select className="input" value={formData.Type} name="Type" onChange={(e) => onChange(e)}>
                              <option value="none">Select Type</option>
                              <option value="Food & Grocery">Food & Grocery</option>
                              <option value="Petrol/Diesel/Electricity">Petrol/Diesel/Electricity</option>
                              <option value="Rent">Rent</option>
                              <option value="Shopping">Shopping</option>
                              <option value="Recharges & Bill Payment">Recharges & Bill Payment</option>
                              <option value="Others">Others</option>
                          </select></td>
                      </tr> : "" 
                  }
                  <tr>
                      <th>Remark :</th>
                      <td><input type="text" className="input" placeholder="Add Remark" value={formData.Remark} name="Remark" onChange={(e) => onChange(e)} /></td>
                  </tr>
                  <tr>
                      <td colSpan="2"><input type="button" className="input" style={{ cursor: "pointer" }} onClick={handleSubmit} value="Submit" /></td>
                  </tr>

              </table>
          </form>
      </div>
  )
    }
}

export default UpdateForm;