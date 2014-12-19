(function() {
	"use strict";

	var status = {
		"url" : location.href,
        "origin" : location.origin,
        "cookieUsed" : false,
        "sessionStorageUsed" : false,
        "localStorageUsed" : false
	};

	// Reports observed function call to background.js
	function handleVisitedSiteCall(dataset) {
		chrome.runtime.sendMessage({"type" : "reportVisitedSite", "data" : dataset});
	}

	window.addEventListener("unload", function(event) {
        handleVisitedSiteCall(status);
    });

    // Listen for messages from OBSERVER
	window.addEventListener("message", function(event) {
		// Only own window as source allowed
		if (event.source !== window) return;

		// Only messages from the page and not the content script
		if (event.data.sender && (event.data.sender === "OBSERVER")) {
			if (event.data.dataset.function === "sessionStorage.setItem" ||	event.data.dataset.function === "sessionStorage.getItem") {
				status.sessionStorageUsed = true;
			} else if (	event.data.dataset.function === "localStorage.setItem" || event.data.dataset.function === "localStorage.getItem") {
				status.localStorageUsed = true;
			} else if (	event.data.dataset.function === "document.setCookie" || event.data.dataset.function === "document.getCookie") {
				status.cookieUsed = true;
			}
		}
	});

}());
