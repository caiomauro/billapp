import React, { useState } from 'react'

function App() {  

  const [backendData, setBackendData] = useState({});
  const [loading, setLoading] = useState(false);


  const handleClick = () => { //Function to load the data.json file from the server
    setLoading(true); //When loading is true, loading text will be displayed
    fetch("/bills") //Fetch the data.json file stored in the server @/bills
      .then(res => res.json()) //Parse the data.json file
      .then(data => {
        setBackendData({ file: data }); //Set the pared data to the backendData variable
        setLoading(false); //When loading is false, the data will be displayed
      });
  };

  const handleAddBill = () => {  //Function to add a new bill to the data.json file
    const formData = { //formData retrieves values from the HTML form below
      name: document.getElementById('name').value,
      address: document.getElementById('address').value,
      hospital: document.getElementById('hospital').value,
      date: document.getElementById('date').value,
      amount: document.getElementById('amount').value
    }; 
    fetch("/bills", {method: 'POST',headers: {'Content-Type': 'application/json' //POST request is sent, the server expects a JSON object,
      },body: JSON.stringify(formData)}) //JSON.stringify converts the object into a JSON string
      .then(res => res.json())
      .then(data => {
        console.log(data); //Take the server respons and log it to the console
      });
  };

  // HTML sent to Index.js to be rendered at ID = root (did not change this much to keep assignment simple and clean)
  return (
    <div>
      {loading ? ( //Loading variable is used here to control displaying of data, when false it check for the backendData variable
        <p>Loading...</p>
      ) : (
        (typeof backendData.file === 'undefined') ? ( //If empty it will display a message to the user
          <p>Please use the buttons below to show the available data.</p>
        ) : (
          backendData.file.map((bill, i) => ( //If it has data, it will display the data in the HTML
            <p key={i}>{bill.name} {bill.address} {bill.hospital} {bill.date} {bill.amount}</p>
          ))
        )
      )}
      <button onClick={handleClick}>Load Current Bills</button>
      <form>
        <label>
          Name:
          <input type="text" name="name" id = "name" />
        </label>
        <br/>
        <label>
          Address:
          <input type="text" name="address" id = "address" />
        </label>
        <br/>
        <label>
          Hospital:
          <input type="text" name="hospital" id = "hospital" />
        </label>
        <br/>
        <label>
          Date (Month/Day/Year):
          <input type="text" name="date" id = "date" />
        </label>
        <br/>
        <label>
          Amount:
          <input type="text" name="amount" id = "amount" />
        </label>
        <br/>
        <button onClick={handleAddBill}>Add Bill</button>
      </form>
    </div>
  );
};

export default App