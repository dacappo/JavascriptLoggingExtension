(function() {
	"use strict";

	var currentlyObservedFunctions;

	// Listen for messages from OBSERVER
	window.addEventListener("message", function(event) {
		// Only own window as source allowed
		if (event.source !== window) {
			return;
		}

		// Only messages from the page and not the content script
		if (event.data.sender && (event.data.sender === "OBSERVER")) {
			handleObservedFunctionCall(event.data.dataset);
		}
	});


	// Create the script element
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");

	// Get script that is later on inlcuded into the page
	var xhr = new XMLHttpRequest();
	var src = chrome.extension.getURL("observe.js");
	xhr.open("GET", src, false);
	xhr.send();

	// Set the script code
	script.text = xhr.responseText;

	// Get functions that sould be observed from background script
	chrome.runtime.sendMessage({"data" : "observedFunctions"}, function(response){
		response.forEach(function(observedFunction) {
			script.text += 'observer.observe("' + observedFunction + '");';
		});
		document.documentElement.insertBefore(script, document.documentElement.firstChild);		
	});
