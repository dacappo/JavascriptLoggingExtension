(function(exports) {
	"use strict";

    var mysql = require("mysql");
	var credentials = {
			host : "localhost",
			database : "JsObserver",
			user : process.env.USER,	
			password : process.env.KEY
	};

	function storeSessionStorageSetItemArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `SessionStorageSetItemArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeSessionStorageSetItem(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `SessionStorageSetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeSessionStorageSetItemArguments(observedFunctionCall);
		});

		connection.end();
	}

	function storeSessionStorageGetItemArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `SessionStorageGetItemArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeSessionStorageGetItem(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `SessionStorageGetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeSessionStorageGetItemArguments(observedFunctionCall);
		});

		connection.end();
	}

	function storeLocalStorageSetItemArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `LocalStorageSetItemArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeLocalStorageSetItem(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `LocalStorageSetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeLocalStorageSetItemArguments(observedFunctionCall);
		});

		connection.end();
	}

	function storeLocalStorageGetItemArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `LocalStorageGetItemArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeLocalStorageGetItem(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `LocalStorageGetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeLocalStorageGetItemArguments(observedFunctionCall);
		});

		connection.end();
	}

	function storeDocumentSetCookieArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `DocumentSetCookieArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeDocumentSetCookie(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `DocumentSetCookie` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeDocumentSetCookieArguments(observedFunctionCall);
		});

		connection.end();
	}

	function storeDocumentGetCookieArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `DocumentGetCookieArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeDocumentGetCookie(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `DocumentGetCookie` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeDocumentGetCookieArguments(observedFunctionCall);
		});

		connection.end();
	}

	function storeWindowAddEventListenerArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `WindowAddEventListenerArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeWindowAddEventListener(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `WindowAddEventListener` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeWindowAddEventListenerArguments(observedFunctionCall);
		});

		connection.end();
	}


	function storeWindowPostMessageArguments(observedFunctionCall) {

		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `WindowPostMessageArguments` VALUES (?, ?, ?)";
		
		// Fix since cookie arguments are not given as array
		var args = JSON.parse(observedFunctionCall.arguments);

		// Loop through arguments array
		args.forEach(function(arg, pos) {
			var parameters = [observedFunctionCall.id, JSON.stringify(arg), pos];

			connection.query(query, parameters, function(err) {
				if (err) throw err;
			});
		});

		connection.end();
	}

	function storeWindowPostMessage(observedFunctionCall) {
		// Connect to MySql database
		var connection = mysql.createConnection(credentials);

		var query = "INSERT INTO `WindowPostMessage` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		connection.connect();

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.result, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
			storeWindowPostMessageArguments(observedFunctionCall);
		});

		connection.end();
	}

	exports.storeObservedFunctionCall = function(data) {
		if (!data) return;		

		data.forEach(function(observedFunctionCall) {
			if (observedFunctionCall.function === "sessionStorage.setItem") {
				storeSessionStorageSetItem(observedFunctionCall);
			} else if (observedFunctionCall.function === "sessionStorage.getItem") {
				storeSessionStorageGetItem(observedFunctionCall);
			} else if (observedFunctionCall.function === "localStorage.setItem") {
				storeLocalStorageSetItem(observedFunctionCall);
			} else if (observedFunctionCall.function === "localStorage.getItem") {
				storeLocalStorageGetItem(observedFunctionCall);
			} else if (observedFunctionCall.function === "document.setCookie") {
				storeDocumentSetCookie(observedFunctionCall);
			} else if (observedFunctionCall.function === "document.getCookie") {
				storeDocumentGetCookie(observedFunctionCall);
			} else if (observedFunctionCall.function === "window.addEventListener") {
				storeWindowAddEventListener(observedFunctionCall);
			} else if (observedFunctionCall.function === "window.postMessage") {
				storeWindowPostMessage(observedFunctionCall);
			}
		});
	};

}(exports));
