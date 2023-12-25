import React, { useEffect, useState } from 'react';


function LoadData() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleClick();
    }, []);

    const handleClick = () => { //Function to load the data.json file from the server//When loading is true, loading text will be displayed
        setLoading(true)
        fetch("/bills") //Fetch the data.json file stored in the server @/bills
          .then(res => res.json()) //Parse the data.json file
          .then(data => {
            setData({ file: data }); //Set the pared data to the backendData variable //When loading is false, the data will be displayed
          });
        setLoading(false)
      };

return(
    <div>
        {loading ? (<p>loading</p>) : (typeof data.file === 'undefined') ? ( //If empty it will display a message to the user
          <p>Please use the buttons below to show the available data.</p>
        ) : (
          data.file.map((bill, i) => ( //If it has data, it will display the data in the HTML
          <div key={i}>
            <p>Name: {bill.name} Address: {bill.address} Issuer: {bill.hospital} Date Issued: {bill.date} Balance: ${bill.amount}</p>
          </div>
          ))
        ) }
    </div>
)
};

export default LoadData;
