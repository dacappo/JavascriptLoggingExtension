(function(exports) {
	"use strict";

	var password = process.env.KEY;

	exports.storeObservedFunctionCalls = function(data) {

		var query = "INSERT INTO `FunctionCalls` (function, arguments, result, origin, url, timestamp) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		// Connect to MySql database
		var mysql = require("mysql");
		var connection = mysql.createConnection({
			host : "localhost",
			database : "JsObserver",
			user : "observer" ,	
			password : password	//process.env.KEY
		});

		connection.connect();

		data.forEach(function(observedFunctionCall) {
			var parameters = [	observedFunctionCall.function, 
								observedFunctionCall.arguments, 
								observedFunctionCall.result, 
								observedFunctionCall.origin, 
								observedFunctionCall.url];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
				console.log("Successfully inserted " + observedFunctionCall.function + "!");
			});
		});

		connection.end();
	};

	exports.getObservedFunctions = function(callback) {

		var query = "SELECT ObservedFunction FROM JsObserver.ObservedFunctions";
		var result = [];

		// Connect to MySql database
		var mysql = require("mysql");
		var connection = mysql.createConnection({
			host : "localhost",
			database : "JsObserver",
			user : "observer" ,	
			password : password	//process.env.KEY
		});

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