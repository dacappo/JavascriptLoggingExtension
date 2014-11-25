// Global observer object
var observer = {};

(function(exports) {
	"use strict";

	// Copy of postMesage API that enables its observing
	var alternativePostMessage = window.postMessage;

	// Reports function call to content.js
	function report(func, args, result) {
		alternativePostMessage({
			"sender" : "OBSERVER",
		 	"dataset" : {
		 		"function" : func,
		 		"arguments" : JSON.stringify(args),
		 		"result" : result,
		 		"url" : window.location.href,
		 		"referrer" : window.document.referrer,
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

	/* New setter function for cookies */
  	function setCookie(input) {

	    // Restore the document.cookie property
	    delete document.cookie;

	    // Set the cookie
	  	document.cookie = input;

	    // Redefine the getter and setter for document.cookie
	    exports.wrapCookie();

	    // Log function call
	    report("document.setCookie", input, null);
  	}

  	/* New getter function for cookies */
  	function getCookie() {

	    // Restore the document.cookie property
	    delete document.cookie;

	    // Cache the resulting cookie value
	    var result = document.cookie;

	    // Redefine the getter and setter for document.cookie
	    exports.wrapCookie();

	    // Log cookie values
	    report("document.getCookie", null , result);

	    // Return the cookie value
	    return result;
  	}

 	/* Wraps the setter and getter of document.cookie */
  	exports.wrapCookie = function() {
    	Object.defineProperty(document, "cookie", { "get" : getCookie, "set" : setCookie});
  	};

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

	// Wrap document.cookie by default
	exports.wrapCookie();

}(observer));