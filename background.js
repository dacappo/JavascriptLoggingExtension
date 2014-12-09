(function() {
	"use strict";

	var cacheLimit = 50;
	var observedFunctionCalls = [];

	// Settings for server connection(s)
	var settings = {
		"servers" : [{"host" : "sebastian-lekies.de", "port" : 443}]
	};

	// Serializes data for reporting to server
	function serializeForRequest(obj, key) {
		return key + "=" + encodeURIComponent(JSON.stringify(obj));
	}

	// Temporary caches function calls until the limit is reached
	function cacheObservedFunctionCall(observedFunctionCall) {
		observedFunctionCalls.push(observedFunctionCall);
		//console.log(JSON.stringify(observedFunctionCall));
		if (observedFunctionCalls.length >= cacheLimit) reportObservedFunctionCallsToServer();
	}

	// Sends report to each listed server
	function reportObservedFunctionCallsToServer() {

		// In case of multiple servers - probably not necessary
		settings.servers.forEach(function(server){
			var xhr = new XMLHttpRequest();
			var src = "https://" + server.host + ":" + server.port + "/storeObservedFunctionCalls";
			var data = 	serializeForRequest(observedFunctionCalls, "data");

			// Empty function call cache
			observedFunctionCalls = [];

			// Send cached function call
			xhr.open("POST", src, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(data);
			console.log("Observed function logged");
		});
			
	}

	// On suspend report observed function calls
	chrome.runtime.onSuspend.addListener(reportObservedFunctionCallsToServer);

	// Listens for reported function calls from content.js
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.type === "reportObservedFunction") {
				if (sender.data) request.data.tabUrl = sender.tab.url;
				cacheObservedFunctionCall(request.data);
			}
		}
	);

}());
