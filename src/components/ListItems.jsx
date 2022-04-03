import React from 'react';
import axios from 'axios';
import '../resources/styles/ListItem.css';




function ListItems(props) {
   
  const { data, status, setData, setShowUpdate, refreshPage } = props;
  


  const handleExpenseDelete = async (e)=> {
    const spendid = e.target.name;
      const url = `http://localhost:8808/Server_Expense_Management/api/UserData/deleteData/deleteExpense.php`;
      const params = new URLSearchParams()
      params.append('token', localStorage.getItem('token'))
      params.append('spendid', spendid)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }

      await axios.post(url, params, config)
        .then((result) => {
          console.log(result)
          if (result.data.status === "true") {
            alert("Deleted Successfully")
            refreshPage();
          }
          else {
            alert(result.data.message);
          }
        })
        .catch((err) => {
          // Do somthing
        })
    }

  const handleExpenseEdit = async (item) => {

      setData(item);
    setShowUpdate({ status: "true",
      type: "Expense"
    })
      
  }

  const handleRevenueDelete = async (e) => {
    const recievedid = e.target.name;
    const url = `http://localhost:8808/Server_Expense_Management/api/UserData/deleteData/deleteRevenue.php`;
    const params = new URLSearchParams()
    params.append('token', localStorage.getItem('token'))
    params.append('recievedid', recievedid)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }

    await axios.post(url, params, config)
      .then((result) => {
        console.log(result)
        if (result.data.status === "true") {
          alert("Deleted Successfully")
          refreshPage();
        }
        else {
          
          alert(result.data.message);
          console.log(result);
        }
      })
      .catch((err) => {
        // Do somthing
      })
  }

  const handleRevenueEdit = async (item) => {
    setData(item);
    setShowUpdate({
      status: "true",
      type: "Revenue"
    })
  }

  return (
    <div>
      <div className="listCard"  >
            <table cellPadding={20} cellSpacing={25} align={"center"} >
            
          {(status === "Expenses") ? <>{
            data.map(item => {
              return <div key={item.spendid}>
                <tr>
                  <th>Date Time</th>
                  <th>Type</th>
                  <th>Amount Spend</th>
                  <th>Remark</th>
                </tr>
              <tr>
                <td>{item.datetime}</td>
                <td>{item.Type}</td>
                <td>{item.Amount}</td>
                <td>{item.Remark}</td>
                <td colSpan={2}>
                    <input type="button" value="Delete" name={item.spendid} onClick={(e)=>{handleExpenseDelete(e)}} style={{ margin: "10px" }} />
                    <input type="button" value="Update" name={item.spendid} onClick={(e) => { handleExpenseEdit(item) }} style={{ margin: "10px" }} />
                </td>
              </tr>
                <tr> <td colSpan={6}><hr /></td></tr>
              </div>
            })
          } </>:""
          }

          {
            (status === "Revenues") ? <> {
              data.map(item => {
                return <div key={item.recieved_id}>
                  <tr>
                    <th>Date Time</th>
                    <th>Amount Recieved</th>
                    <th>Remark</th>
                  </tr>
                  <tr>
                    <td>{item.DateTime}</td>
                    <td>{item.Amount}</td>
                    <td>{item.Remark}</td>
                    <td colSpan={2}>
                      <input type="button" value="Delete" name={item.recieved_id} onClick={(e) => {handleRevenueDelete(e)}} style={{ margin: "10px" }} />
                      <input type="button" value="Update" name={item.recieved_id} onClick={(e)=>{handleRevenueEdit(item)}} style={{ margin: "10px" }} />
                    </td>
                  </tr>
                  <tr> <td colSpan={5}><hr /></td></tr>
                </div>
              })
            }</> : "" 
          }
          
            </table>
        </div>
    </div>
  )
}

export default ListItems