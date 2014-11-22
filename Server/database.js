"use strict";

var password = process.env.KEY;

exports.storeObservedFunctionCall = function(data) {

	var query = "INSERT INTO `functionCalls` (function, arguments, result, origin, url, timestamp) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
	var parameters = [data.function, data.arguments, data.result, data.origin, data.url];

	// Connect to MySql database
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host : "localhost",
		database : "dacappa_jsobserver",
		user : "observer" ,	
		password : password	//process.env.KEY
	});

	connection.connect();

	connection.query(query, parameters, function(err) {
		if (err) throw err;
		console.log("Successfully inserted " + data.function + "!");
	});

	connection.end();
};

exports.getObservedFunctions = function(callback) {

	var query = "SELECT * FROM dacappa_jsobserver.observedFunctions";
	var result = [];

	// Connect to MySql database
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host : "localhost",
		database : "dacappa_jsobserver",
		user : "observer" ,	
		password : password	//process.env.KEY
	});

	connection.connect();

	connection.query(query, function(err, rows) {
		if (err) throw err;
		
		rows.forEach(function(row) {
			result.push(row.observedFunction);
		});

		callback(result);
	});

	connection.end();
};