(function() {
	chrome.runtime.onMessage.addListener(
		function(flow) {
			// Log to server
			if (settings.reportToServer) {
				reportFlow(flow);
			}

			// Log locally
			if (flow.type === "firstOrder") {
				logFirstOrderFlow(flow);
			} else if (flow.type === "secondOrder") {
				secondOrderFlows.push(flow);
				checkForVulnerability(flow);
			}

		}
	);
}());