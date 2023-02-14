const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');

app.use(bodyParser.json()); //Express body parser for incomming HTTP requests for stuff like req.body

app.get('/bills', (req, res) => { //Get request handler 
  fs.readFile('./data.json', (err, data) => { //data.json is read
    if (err) {
      res.status(500).send({ error: 'Error reading data.json file' });
    } else {
      res.json(JSON.parse(data)); //JSON.parse is used to parse the data into a JavaScript object
    }
  });
});

app.post('/bills', (req, res) => { //Post requst handler with check for errors
  fs.readFile('./data.json', (err, data) => { //Reads data from data.json file
    if (err) {
      res.status(500).send({ error: 'Error reading data.json file' });
    } else {
      const bills = JSON.parse(data); //If it works it will assignt it to the variable bills
      bills.push(req.body); //Use the Node push method to add the new bill to the array
      fs.writeFile('./data.json', JSON.stringify(bills), (err) => { //Writes the new bill to data.json file
        if (err) {
          res.status(500).send({ error: 'Error writing to data.json file' });
        } else {
          res.send({ message: 'Bill added successfully' });
        }
      });
    }
  });
});

app.listen(5000, () => {console.log("Server started on port 5000")}) //Tells the server to listen for commands @ port 5000



