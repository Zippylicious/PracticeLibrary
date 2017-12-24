const express = require('express');
const bodyParser = require('body-parser');
const app = express()

const login = require('.routes/loginroutes');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {input:null, error:'Nothing entered yet'});
})

app.post('/', function (req, res) {
  var input = req.body.input_field;
  if(input){
  	res.render('index', {input:input, error:null})
  } else{
  	res.render('index', {input:null, error:'Nothing found'});
  }  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})