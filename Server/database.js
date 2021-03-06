(function(exports) {
	"use strict";

    var mysql = require("mysql");
	var credentials = {
			host : "localhost",
			database : "JsObserver",
			user : process.env.USER,	
			password : process.env.KEY
	};

	var connection;

	function storeSessionStorageSetItemArguments(observedFunctionCall) {

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
	}

	function storeSessionStorageSetItem(observedFunctionCall) {

		var query = "INSERT INTO `SessionStorageSetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

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
		});

		storeSessionStorageSetItemArguments(observedFunctionCall);
	}

	function storeSessionStorageGetItemArguments(observedFunctionCall) {

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
	}

	function storeSessionStorageGetItem(observedFunctionCall) {

		var query = "INSERT INTO `SessionStorageGetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

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
		});

		storeSessionStorageGetItemArguments(observedFunctionCall);
	}

	function storeLocalStorageSetItemArguments(observedFunctionCall) {

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
	}

	function storeLocalStorageSetItem(observedFunctionCall) {

		var query = "INSERT INTO `LocalStorageSetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

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
		});

		storeLocalStorageSetItemArguments(observedFunctionCall);
	}

	function storeLocalStorageGetItemArguments(observedFunctionCall) {

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
	}

	function storeLocalStorageGetItem(observedFunctionCall) {

		var query = "INSERT INTO `LocalStorageGetItem` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

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
			
		});

		storeLocalStorageGetItemArguments(observedFunctionCall);
	}

	function storeDocumentSetCookieArguments(observedFunctionCall) {

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
	}

	function storeDocumentSetCookie(observedFunctionCall) {

		var query = "INSERT INTO `DocumentSetCookie` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

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
			
		});

		storeDocumentSetCookieArguments(observedFunctionCall);
	}

	

	function storeDocumentGetCookie(observedFunctionCall) {

		var query = "INSERT INTO `DocumentGetCookie` VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

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
		});
	}


	function storeWindowPostMessage(observedFunctionCall) {

		var query = "INSERT INTO `WindowPostMessage` VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";

		var uuid = require('node-uuid');
		observedFunctionCall.id = uuid.v1();

		var parameters = [	observedFunctionCall.id,
							observedFunctionCall.data,
							observedFunctionCall.messageOrigin, 
							observedFunctionCall.origin, 
							observedFunctionCall.url,
							observedFunctionCall.tabUrl,
							observedFunctionCall.referrer];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + observedFunctionCall.function + "!");
		});
	}

	function storeVisitedSite(visitedSite) {
		var query = "INSERT INTO JsObserver.VisitedSites (Url, Origin, CookieUsed, SessionStorageUsed, LocalStorageUsed, Timestamp) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);";

		var parameters = [
							visitedSite.url,
							visitedSite.origin, 
							visitedSite.cookieUsed,
							visitedSite.sessionStorageUsed,
							visitedSite.localStorageUsed];

		connection.query(query, parameters, function(err) {
			if (err) throw err;
			console.log("Successfully inserted " + visitedSite.origin + " visit!");
		});
	}

	exports.storeObservedFunctionCall = function(data) {
		if (!data) return;

		connection = mysql.createConnection(credentials);
		connection.connect();

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
			} else if (observedFunctionCall.function === "window.postMessage") {
				storeWindowPostMessage(observedFunctionCall);
			}
		});

		connection.end();
	};

	exports.storeVisitedSites = function(data) {
		if (!data) return;

		connection = mysql.createConnection(credentials);
		connection.connect();

		data.forEach(function(visitedSite) {
			storeVisitedSite(visitedSite);
		});

		connection.end();
	};

}(exports));
