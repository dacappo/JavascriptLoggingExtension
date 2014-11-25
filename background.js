(function() {
	"use strict";

	// Set of observed functions
	var cacheLimit = 30;
	var observedFunctions = [];
	var observedFunctionCalls = [];

	// Settings for server connection(s)
	var settings = {
		"servers" : [{"host" : "127.0.0.1", "port" : 7000}]
	};

	// Serializes data for reporting to server
	function serializeForRequest(obj, key) {
		return key + "=" + encodeURIComponent(JSON.stringify(obj));
	}

	function cacheObservedFunctionCalls(obseredFunctionCall) {
		observedFunctionCalls.push(observedFunctionCall);
		if (observedFunctionCalls.size >= 30) reportObservedFunctionCallsToServer();
	}

	// Sends report to each listed server
	function reportObservedFunctionCallsToServer() {

		// In case of multiple servers - probably not necessary
		settings.servers.forEach(function(server){
			var xhr = new XMLHttpRequest();
			var src = "http://" + server.host + ":" + server.port + "/storeObservedFunctionCalls";
			var data = 	serializeForRequest(observedFunctionCalls, "data");

			// Empty function call cache
			observedFunctionCalls = [];

			// Send cached function calls
			xhr.open("POST", src, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(data);
			console.log("Observed function logged");
		});
			
	}

	// Gets observed functions set from server when new window is created
	chrome.windows.onCreated.addListener(function(){
		settings.servers.forEach(function(server){
			var xhr = new XMLHttpRequest();
			var src = "http://" + server.host + ":" + server.port + "/getObservedFunctions";

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status === 200) {
					observedFunctions = JSON.parse(xhr.responseText);
					console.log(observedFunctions);
					console.log("Observed functions set!");
				}
			};

			xhr.open("POST", src, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send();
		});
	});

	// Listens for reported function calls from content.js
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.type === "reportObservedFunction") {
				cacheObservedFunctionCall(request.data);
			} else if (request.type === "getObservedFunctions") {
				sendResponse(observedFunctions);
			}
		}
	);

}());
