const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
let history = []
try {
  history=JSON.parse(fs.readFileSync('out.json','utf8'))
} catch (error) {
  console.log('что-то пошло не так!')
}
app.post('/user', (req, res) => {
  history.push(req.body) 
  fs.writeFile('out.json', JSON.stringify(history,null,2), 'utf8', () => {
    console.log('Мы записали данные, ура!')
  });
  res.send(`hellow world ${port}`)
});

// listen on the port
app.listen(port);


