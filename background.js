(function() {
	"use strict";

	var observedFunctions =["localStorage.getItem",
							"localStorage.setItem",
							"sessionStorage.getItem",
							"sessionStorage.setItem"];

	var settings = {
		"servers" : [{"host" : "127.0.0.1", "port" : 7000}]
	};

	function serializeForRequest(obj, key) {
		return key + "=" + encodeURIComponent(JSON.stringify(obj));
	}

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
