var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'password',
	database: 'users'
});
connection.connect(function(err){
	if(err){
		console.log("Error connecting to DB: " + err);
	} else {
		console.log("Connection to DB established")
	}
});

exports.register = function(req, res){

};

exports.login = function(req, res){

};