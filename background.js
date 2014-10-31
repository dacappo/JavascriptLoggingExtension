(function() {

	chrome.runtime.onMessage.addListener(
		function(flow) {
			// Log to server
			if (settings.reportToServer) {
				reportFlow(flow);
			}

			// Log locally
			
		}
	);

}());
