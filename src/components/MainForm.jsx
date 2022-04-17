import React from 'react';
import ExpenseForm from './ExpenseForm';
import RevenueForm from './RevenueForm';
import {
    PushToTalkButton,
    BigTranscript
} from "@speechly/react-ui";


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

    return (
        <div className='MainForm'>
            <div className="forms-ex-rev">
            <div className="Forms1 toggleclose">
                <div className="ExpenseForm toggleclose">
                    <ExpenseForm expenseForm={expenseForm} />
                        <PushToTalkButton placement="bottom" captureKey=" " />
                        <BigTranscript placement="bottom" />
                       
                </div>
            </div>
            <div className="Forms2 toggleclose">
                <div className="RevenueForm toggleclose">
                    <RevenueForm revenueForm={revenueForm} />
                        <PushToTalkButton placement="bottom" captureKey=" " />
                        <BigTranscript placement="bottom" />
                </div>
            </div>
            </div>
            <div className="buttons" id="form-button">
                <button id="btn1" onClick={expenseForm}>Add Expense</button>
                <button id="btn2" onClick={revenueForm}>Add Income</button>
            </div>
        </div>
    )
}

export default MainForm