const mysql = require('mysql');
const passHash = require('password-hash');
const emailValid = require("email-validator");
const connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'password',
	database: 'practice_library'
});
connection.connect(function(err){
	if(err){
		console.log("Error connecting to DB: " + err);
	} else {
		console.log("Connection to DB established")
	}
});

exports.register = function(req, res){
	var today = new Date();

	if(!emailValid.validate(req.body.email)){
		return res.render('register', {message: "This email is not valid, please try again."});
	}

	if(req.body.password == null || req.body.password.length < 8){
		return res.render('register', {message: "This password is not valid, please try again.\nRemember passwords must be longer than 7 characters."});
	}

	var user = {
		"first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"username": req.body.username,
		"email": req.body.email,
		"password": passHash.generate(req.body.password),
		"created": today,
		"modified": today
	}

	if(!checkProp(user)){
		return res.render('register', {message: "Not all fields were filled out, please try again."});
	}

	//check for duplicate emails and usernames
	connection.query("SELECT * FROM users WHERE username = ?", [user.username], function(err, results){
		if(err){
			console.log("Error checking for username duplicates: " + err);
			return res.render('register', {message: "Sorry, an error occurred. Please try again later."});
		} else {
			if(results.length != 0){
				return res.render('register', {message: "Please try another username."});
			}
		}

			connection.query("SELECT * FROM users WHERE email = ?", [user.email], function(err, results){
				if(err){
					console.log("Error checking for username duplicates: " + err);
					return res.render('register', {message: "Sorry, an error occurred. Please try again later."});
				} else {
					if(results.length != 0){
						return res.render('register', {message: "Please try another email."});
					}
				}

					connection.query("INSERT INTO users SET ?", user, function(err, results){
						if(err){
							console.log("Error inserting into users" + err);
							return res.render('register', {message: "Sorry, an error occurred. Please try again later."});
						} else {
							return res.render('login', {message: "You have been successfully registered! Please log in here."});
						}
					});
			});
	});
};

function checkProp(obj){
	for(var prop in obj){
		if(obj[prop] == null || obj[prop] == ""){
			return false;
		}
	}
	return true;
};

exports.login = function(req, res){
	var username = req.body.username;
	connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, results){
		if(err){
			console.log("Error retrieving user from DB:" + err);
			return res.render('login', {message: "Login failed, please try again."});
		} else {
			if(results.length != 0){
				var password = results[0].password;
				if(passHash.verify(req.body.password, password)){
					var sess = req.session;
					sess.username = req.body.username;
					return res.render('index', {message: "Hello " + sess.username + ". Welcome to The Practice Library."}); //add in message and session stuff here
				} else {
					return res.render('login', {message: "Your username and password did not match, please try again."});
				}
			} else {
				return res.render('login', {message: "Your username and password did not match, please try again."});
			}
		}
	});
};

exports.logout = function(req, res){
	req.session.destroy(function(err){
		if(err){
			console.log("Error destroying user session: " + err);
		} else {
			return res.render('login', {message: "You have been successfully logged out!"});
		}
	});
};