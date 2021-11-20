const express = require('express');
const fs = require('fs');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

let apiRoutes = require("./routes.js")

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const dbPath = 'mongodb://localhost/firstrest';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
  console.log('connected');
}, error => {
  console.log(error, 'error');
});
var db=mongoose.connection;

//Check DB Connection
if (!db)
  console.log("Error connecting db");
else
  console.log("DB Connected Successfully");

let history = {}
try {
  history = JSON.parse(fs.readFileSync('out.json', 'utf8'))

} catch (error) {
  console.log('что-то пошло не так!')
}
app.post('/create-mess', (req, res) => {
  if (history[req.body.id]) {
    history[req.body.id].push(req.body.history)
  }
  else {
    history[req.body.id] = [req.body.history]
  }

  fs.writeFile('out.json', JSON.stringify(history, null, 2), 'utf8', () => {
    console.log('мы записали create-mess')
  });
  res.send(`hellow world ${port}`)
});

app.use('/api', apiRoutes)

// listen on the port
app.listen(port);

app.post('/history', (req, res) => {
  res.send(history)
});






