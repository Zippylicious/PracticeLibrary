const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const login = require('./routes/login');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
   res.render('login', {message: null});
});

app.get('/login', function (req, res) {
  	res.render('login', {message: null});
});

app.get('/register', function(req, res) {
	res.render('register', {message: null})
});

app.post('/register', login.register);

app.post('/login', login.login);

app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
});