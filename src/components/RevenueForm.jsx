import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpeechContext } from "@speechly/react-client";

function RevenueForm(props) {
    const { revenueForm } = props;
    const [revenueData, setRevenueData] = useState({ datetime: "", Amount: "", Remark: "" });
    const { segment } = useSpeechContext();

    useEffect(() => {
        if (segment) {

            // Handle speech segment and make tentative changes to app state
            segment.entities.forEach((e) => {
                switch (e.type) {
                    case 'amount':
                        setRevenueData({ ...revenueData, Amount: e.value })
                        break;

                    case 'date':
                        setRevenueData({ ...revenueData, datetime: e.value })
                        console.log(e.value)
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


    const handleRevenueSubmit = async (e) => {
        e.preventDefault();
        if (revenueData.datetime && revenueData.Amount) {
            const url = `http://localhost:8808/Server_Expense_Management/api/UserData/addData/addRevenue.php`;

            const params = new URLSearchParams()
            params.append('datetime', revenueData.datetime)
            params.append('amount', revenueData.Amount)
            params.append('remark', revenueData.Remark)

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

                        alert("New Income information added successfully");
                        revenueForm();
                    }
                    else {
                        alert(result.message);
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
        setRevenueData({ ...revenueData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <button id="close" onClick={revenueForm}>x</button>
            <form>
                <table width="100%" cellPadding="15px" cellSpacing="30px" align="center">
                    <tbody>
                        <tr>
                            <th colSpan="2" align='center' id="form-title">Income Form</th>
                        </tr>
                        <tr>
                            <th>Date :</th>
                            <td><input type="date" className="input" value={revenueData.datetime} name="datetime" onChange={(e) => onChange(e)} required /></td>
                        </tr>
                        <tr>
                            <th>Amount :</th>
                            <td><input type="text" placeholder="Enter Amount" className="input" value={revenueData.Amount} name="Amount" onChange={(e) => onChange(e)} required /></td>
                        </tr>

                        <tr>
                            <th>Remark :</th>
                            <td><input type="text" className="input" placeholder="Add Remark" value={revenueData.Remark} name="Remark" onChange={(e) => onChange(e)} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="button" className="input" style={{ cursor: "pointer" }}
                                onClick={handleRevenueSubmit} value="ADD" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default RevenueForm