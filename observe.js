"use strict";

// Global observer object
var observer = {};

(function(exports) {

	// Reports function call to content.js
	function report(func, args, result) {
		window.postMessage({
			"sender" : "OBSERVER",
		 	"dataset" : {
		 		"function" : func,
		 		"arguments" : JSON.stringify(args),
		 		"result" : result,
		 		"url" : window.location.href,
		 		"origin" : window.location.origin
		 	}
		 }, "*");
	}

	// Gets copy of function based on a string describtor relative to window
	function getFunctionFromString(functionDescribtor) {
		// Window as global element
		var copy = window;

		// Retrieve function from string representation
		functionDescribtor.split(".").forEach(function(describtor){
			copy = copy[describtor];
		});

		return copy;
	}

	// Overrides a function given by a describtor with a new function
	function wrapFunction(functionDescribtor, newFunction) {
		var reference = window;
		var describtorParts = functionDescribtor.split(".");
		describtorParts.forEach(function(describtor, i) {
			if (describtorParts.length - 1 >  i ) {
				reference = reference[describtor];
			} else {
				reference[describtor] = newFunction;
			}
		});
	}

	// Function to observe functions given by a describtor
	exports.observe = function(observedFunctionDescribtor) {

		// Copy functionality of observed function
		var actualFunction = getFunctionFromString(observedFunctionDescribtor);

		// Return in case function is not existent
		if (!actualFunction) return;

		// Create wrapper function
		var newFunction = function() {
			var args, result;

			// Get array of arguments
			args = Array.prototype.slice.call(arguments);

			// Call the observed function with given arguments;
			result = actualFunction.apply(this, args);

			// Report observed function call
			report(observedFunctionDescribtor, args, result);

			// Return actual results
			return result;
		};

		// Override observed function with wrapper
		wrapFunction(observedFunctionDescribtor, newFunction);
		
	};

}(observer));