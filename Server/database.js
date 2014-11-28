(function(exports) {
	"use strict";
 
	var credentials = {
			host : "localhost",
			database : "JsObserver",
			user : process.env.USER,	
			password : process.env.KEY
	};

	function storeArguments(functionCallId, args) {

		// Connect to MySql database
		var mysql = require("mysql");
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `FunctionCallArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		if (!Array.isArray(args)) args = [args];

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [functionCallId, arg, pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	exports.storeObservedFunctionCall = function(data) {

		// Connect to MySql database
		var mysql = require("mysql");
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `FunctionCalls` (Id, Function, Result, Origin, Url, TabUrl, Referrer, Timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		data.forEach(function(observedFunctionCall) {
			var uuid = require('node-uuid');
			observedFunctionCall.id = uuid.v1();

			var parameters = [	observedFunctionCall.id,
								observedFunctionCall.function,
								observedFunctionCall.result, 
								observedFunctionCall.origin, 
								observedFunctionCall.url,
								observedFunctionCall.tabUrl,
								observedFunctionCall.referrer];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
				console.log("Successfully inserted " + observedFunctionCall.function + "!");
				storeArguments(observedFunctionCall.id, JSON.parse(observedFunctionCall.arguments));
			});

		});

		connection.end();
	};

	exports.getObservedFunctions = function(callback) {

		var mysql = require("mysql");
		var connection = mysql.createConnection(credentials);
		var	query = "SELECT ObservedFunction FROM JsObserver.ObservedFunctions";
		var	result = [];		

		connection.connect();

		connection.query(query, function(err, rows) {
			if (err) throw err;
			
			rows.forEach(function(row) {
				result.push(row.ObservedFunction);
			});

			callback(result);
		});

		connection.end();
	};
}(exports))
