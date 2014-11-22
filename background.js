(function() {
	"use strict";

	// Set of observed functions
	var observedFunctions =[];

	// Settings for server connection(s)
	var settings = {
		"servers" : [{"host" : "127.0.0.1", "port" : 7000}]
	};

	// Serializes data for reporting to server
	function serializeForRequest(obj, key) {
		return key + "=" + encodeURIComponent(JSON.stringify(obj));
	}

	// Sends report to each listed server
	function reportObservedFunctionCallToServer(obseredFunctionCall) {

		settings.servers.forEach(function(server){
			var xhr = new XMLHttpRequest();
			var src = "http://" + server.host + ":" + server.port + "/storeObservedFunctionCall";
			var data = 	serializeForRequest(obseredFunctionCall, "data");

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
				reportObservedFunctionCallToServer(request.data);
			} else if (request.type === "getObservedFunctions") {
				sendResponse(observedFunctions);
			}
		}
	);

}());
