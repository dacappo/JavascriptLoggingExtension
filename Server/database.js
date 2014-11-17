"use strict";

exports.storeObservedFunctionCall = function(data) {

	var query = "INSERT INTO `functionCalls` (function, arguments, result, url, timestamp) VALUES (?, ?, ?, ?, ?)";
	var parameters = [data.function, data.arguments, data.result, data.url, data.timestamp];

	// Connect to MySql database
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host : "localhost",
		database : "dacappa_jsobserver",
		user : "observer" ,	//process.env.USER,
		password : ""	//process.env.KEY
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
		user : "observer" ,	//process.env.USER,
		password : ""	//process.env.KEY
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