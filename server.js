const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const login = require('./routes/login');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'niceSecret',
	resave: false,
	saveUninitialized: true
}));
app.set('view engine', 'ejs')

var sess;

app.get('/', function (req, res) {
	sess = req.session;
	if(sess.username){
		res.render('index', {message: "Hello " + sess.username + ". Welcome to The Practice Library."});
	} else {
   		res.render('login', {message: null});
   	}
});

app.get('/login', function (req, res) {
	sess = req.session;
	if(sess.username){
		res.render('index', {message: "Hello " + sess.username + ". Welcome to The Practice Library."});
	} else {
   		res.render('login', {message: null});
   	}
});

app.get('/register', function(req, res) {
	sess = req.session;
	if(sess.username){
		res.render('index', {message: "Hello " + sess.username + ". Welcome to The Practice Library."});
	} else {
   		res.render('register', {message: null});
   	}
});

app.get('/index', function(req, res){
	sess = req.session;
	if(sess.username){
		res.render('index', {message: "Hello " + sess.username + ". Welcome to The Practice Library."});
	} else {
		res.render('login', {message: null});
	}
});

app.post('/register', login.register);

app.post('/login', login.login);

app.post('/logout', login.logout);

app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
});