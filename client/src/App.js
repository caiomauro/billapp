import React, { useState } from 'react'
import LoadData from "./Components/load-data"

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
    <div className="border">
      <div className="flex flex-col max-h-72 overflow-auto border">
        <LoadData />
      </div>
      <div className="flex">
        <form className="flex flex-col text-center w-5/6 gap-2">
          <label className="text-xl font-bold">
            Name:
          </label>
          <input className="rounded-md" type="text" name="name" id = "name" />

          <label className="text-xl font-bold">
            Address:
          </label>
          <input className="rounded-md" type="text" name="address" id = "address" />

          <label className="text-xl font-bold">
            Hospital:
          </label>
          <input className="rounded-md" type="text" name="hospital" id = "hospital" />

          <label className="text-xl font-bold">
            Date (Month/Day/Year):
          </label>
          <input className="rounded-md" type="text" name="date" id = "date" />

          <label className="text-xl font-bold">
            Amount:
          </label>
          <input className="rounded-md" type="text" name="amount" id = "amount" />

          <button className="rounded-md bg-indigo-500 p-1 px-3" onClick={handleAddBill}>Add Bill</button>
        </form>
      </div>
    </div>
  );
};

export default App