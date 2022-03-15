import React from 'react';

function MainForm() {

    const expenseForm = () => {
        let ExpenseForm = document.getElementsByClassName('ExpenseForm');
        let formtag = document.getElementsByClassName('Forms1');
        formtag[0].classList.toggle('toggleclose');
        ExpenseForm[0].classList.toggle('toggleclose');
    }


    const revenueForm = () => {
        let RevenueForm = document.getElementsByClassName('RevenueForm');
        let formtag = document.getElementsByClassName('Forms2');
        formtag[0].classList.toggle('toggleclose');
        RevenueForm[0].classList.toggle('toggleclose');
    }


    const handleExpenseSubmit = () => {
        alert("Expense Submitted");
        expenseForm();
    }

    const handleRevenueSubmit = () => {
        alert("Revenue Submitted");
        revenueForm();
    }

  return (
    <div>
          <div className="Forms1 toggleclose">
              <div className="ExpenseForm toggleclose">
                  <button id="close" onClick={expenseForm}>x</button>
                  <form>
                      <table cellPadding="8px" cellSpacing="17.5vh">
                          <tbody>
                          <tr>
                              <th colSpan="2">Expense Form</th>
                          </tr>
                          <tr>
                              <th>Date :</th>
                              <td><input type="date" className="input" required /></td>
                          </tr>
                          <tr>
                              <th>Amount :</th>
                              <td><input type="text" placeholder="Enter Amount" className="input" required /></td>
                          </tr>
                          <tr>
                              <th>Type :</th>
                              <td><select className="input">
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
                              <td><input type="text" className="input" placeholder="Add Remark" /></td>
                          </tr>
                          <tr>
                              <td colSpan="2"><input type="button" className="input" style={{ cursor: "pointer"}} onClick={handleExpenseSubmit} value="Submit" /></td>
                          </tr>
                          </tbody>
                      </table>
                  </form>
              </div>
          </div>
          <div className="Forms2 toggleclose">
              <div className="RevenueForm toggleclose">
                  <button id="close" onClick={revenueForm}>x</button>
                  <form>
                      <table width="100%" cellPadding="10px" cellSpacing="30px" align="center">
                          <tbody>
                          <tr>
                              <th colSpan="2">Revenue Form</th>
                          </tr>
                          <tr>
                              <th>Date :</th>
                              <td><input type="date" className="input" required /></td>
                          </tr>
                          <tr>
                              <th>Amount :</th>
                              <td><input type="text" placeholder="Enter Amount" className="input" required /></td>
                          </tr>

                          <tr>
                              <th>Remark :</th>
                              <td><input type="text" className="input" placeholder="Add Remark" /></td>
                          </tr>
                          <tr>
                              <td  colSpan="2"><input type="button" className="input" style={{ cursor: "pointer"}}
                                  onClick={handleRevenueSubmit} value="Submit" /></td>
                          </tr>
                          </tbody>
                      </table>
                  </form>
              </div>
          </div>
          <div className="buttons">
              <button id="btn1" onClick={expenseForm}>Add Expense</button>
              <button id="btn2" onClick={revenueForm}>Add Revenue</button>
          </div>
    </div>
  )
}

export default MainForm