const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/user', (req, res) => {
  console.log  (JSON.stringify(req.body))
  fs.writeFile('out.json', JSON.stringify(req.body), 'utf8', () => {
    console.log('Мы записали данные, ура!')
  });
  res.send(`hellow world ${port}`)
});

// listen on the port
app.listen(port);
