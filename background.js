(function() {

	var observedFunctions =["localStorage.getItem",
							"localStorage.setItem",
							"sessionStorage.getItem",
							"sessionStorage.setItem"];

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.data === "observedFunctions") {
				sendResponse(observedFunctions);
			}
		}
	);

}());
