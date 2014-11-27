(function(exports) {
	"use strict";

	var password = process.env.KEY;
	var user = process.env.USER;

	function storeArguments(connection, functionCallId, args) {

		var query = "INSERT INTO `FunctionCallArguments` (FunctionCallId, Argument, Position) VALUES (?, ?, ?)";

		args.forEach(function(argument, pos) {
			var parameters = [functionCallId, argument, pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});
	}

	exports.storeObservedFunctionCall = function(data) {

		var query = "INSERT INTO `FunctionCalls` (Id, Function, Result, Origin, Url, TabUrl, Referrer, Timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		// Connect to MySql database
		var mysql = require("mysql");
		var connection = mysql.createConnection({
			host : "localhost",
			database : "JsObserver",
			user :  user,	
			password : password	//process.env.KEY
		});

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
				storeArguments(connection, observedFunctionCall.id, JSON.parse(observedFunctionCall.arguments));
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
			user : user,	
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