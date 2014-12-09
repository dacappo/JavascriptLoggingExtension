// Global observer object
var observer = {};

(function(exports) {
	"use strict";

	// Filter local addresses
	if (location.origin === "http://localhost" ||
		location.origin === "https://localhost" ||
		location.origin === "http://127.0.0.1" ||
		location.origin === "https://127.0.0.1") return ;

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

	// New setter function for cookies
  	function setCookie(input) {

	    // Restore the document.cookie property
	    delete document.cookie;

	  	document.cookie = input;

	    // Redefine the getter and setter for document.cookie
	    exports.observeCookie();

	    report("document.setCookie", [input], null);
  	}

  	/* New getter function for cookies */
  	function getCookie() {

	    // Restore the document.cookie property
	    delete document.cookie;

	    var result = document.cookie;

	    // Redefine the getter and setter for document.cookie
	    exports.observeCookie();

	    report("document.getCookie", [null] , result);
	    return result;
  	}

 	// Observes the setter and getter of document.cookie
  	exports.observeCookie = function() {
    	Object.defineProperty(document, "cookie", { "get" : getCookie, "set" : setCookie});
  	};

  	// Observes callbacks on the message listener
  	exports.observePostMessage = function() {
		window.addEventListener("message", function(event) {
			// Only other windows as source allowed
			if (event.source === window) return;
			
			window.postMessage({
				"sender" : "OBSERVER",
		 		"dataset" : {
			 		"function" : "window.postMessage",
			 		"data" : [JSON.stringify(event.data)],
			 		"url" : window.location.href,
			 		"referrer" : window.document.referrer,
			 		"origin" : window.location.origin,
			 		"messageOrigin" : event.origin
				}
		 	}, "*");
		});
  	};

	// Observes functions given by a describtor
	exports.observe = function(observedFunctionDescribtor) {

		// Copy functionality of observed function
		var actualFunction = getFunctionFromString(observedFunctionDescribtor);

		// Return in case function is not existent
		if (!actualFunction) return;

		// Create wrapper function
		var newFunction = function() {
			var args, result;

			args = Array.prototype.slice.call(arguments);
			result = actualFunction.apply(this, args);
			report(observedFunctionDescribtor, args, result);
			return result;
		};

		// Override observed function with wrapper
		wrapFunction(observedFunctionDescribtor, newFunction);
		
	};
	
	exports.observeCookie();
	exports.observePostMessage();

	exports.observe("sessionStorage.setItem");
	exports.observe("sessionStorage.getItem");
	exports.observe("localStorage.setItem");
	exports.observe("localStorage.getItem");

}(observer));