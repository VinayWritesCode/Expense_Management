import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpeechContext } from "@speechly/react-client";



function ExpenseForm(props) {

    const [expenseData, setexpenseData] = useState({ datetime: "", Amount: "", Type: "none", Remark: "" });
    const { segment } = useSpeechContext();

    const { expenseForm } = props;
    useEffect(() => {
        if (segment) {
            // Handle speech segment and make tentative changes to app state
            segment.entities.forEach((e) => {
                switch (e.type) {
                    case 'amount':
                        setexpenseData({ ...expenseData, Amount: e.value })
                        break;
                    case 'type':

                        const selectType = document.querySelector('#ExpenseTypeSelection');
                        for (let i = 0; i < selectType.length; i++) {
                            if ((selectType[i].value).includes(e.value)) {
                                setexpenseData({ ...expenseData, Type: e.value })
                            }
                        }

                        if (selectType.value === "None" || !selectType.value) {
                            setexpenseData({ ...expenseData, Type: "OTHERS" })
                        }
                        break;

                    case 'date':
                        setexpenseData({ ...expenseData, datetime: e.value })
                        console.log(e);
                        break;

                    default:
                        break;
                }
            });
            if (segment.isFinal) {
                // Handle speech segment and make permanent changes to app state
            }

        }
        // eslint-disable-next-line
    }, [segment])

    const handleExpenseSubmit = async (e) => {
        e.preventDefault();

        if (expenseData.datetime && expenseData.Amount && expenseData.Type) {

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
                        console.log(result.data.message);
                    }
                })
                .catch((err) => {
                    alert("Unsuccessful");
                })
        } else {
            alert("Please enter your data");
        }

    }
    const onChange = (e) => {
        setexpenseData({ ...expenseData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <button id="close" onClick={expenseForm}>x</button>
            <form>
                <table cellPadding="8px" cellSpacing="17.5vh" >
                    <thead><tr><th colSpan="2" align='center' id="form-title">Expense Form</th></tr>
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
                            <td><select className="input" id="ExpenseTypeSelection" value={expenseData.Type} name="Type" onChange={(e) => onChange(e)}>
                                <option value="NONE">Select Type</option>
                                <option value="FOOD & GROCERY">Food & Grocery</option>
                                <option value="PETROL/DIESEL/ELECTRICITY">Petrol/Diesel/Electricity</option>
                                <option value="RENT">Rent</option>
                                <option value="SHOPPING">Shopping</option>
                                <option value="RECHARGES & BILL PAYMENT">Recharges & Bill Payment</option>
                                <option value="OTHERS">Others</option>
                            </select></td>
                        </tr>
                        <tr>
                            <th>Remark :</th>
                            <td><input type="text" className="input" placeholder="Add Remark" value={expenseData.Remark} name="Remark" onChange={(e) => onChange(e)} required /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="button" className="input" style={{ cursor: "pointer" }} onClick={handleExpenseSubmit} value="ADD" /></td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    )
}

export default ExpenseForm