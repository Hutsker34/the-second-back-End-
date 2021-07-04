const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
let history = {}
try {
  history=JSON.parse(fs.readFileSync('out.json','utf8'))
  console.log(history)
} catch (error) {
  console.log('что-то пошло не так!')
}
app.post('/user', (req, res) => {
  if(history[req.body.id]){history[req.body.id].push(req.body.history) }
  else {
    history[req.body.id]=[req.body.history]
  }
  console.log(req.body)
  fs.writeFile('out.json', JSON.stringify(history,null,2), 'utf8', () => {
    console.log('Мы записали данные, ура!')
  });
  res.send(`hellow world ${port}`)
});

// listen on the port
app.listen(port);

app.post('/history',(req, res) =>{
  res.send(history)
  });
  

