"use strict";

var observer = {};

(function(global) {

	function report(func, args, result) {
		window.postMessage({
			"sender" : "OBSERVER",
		 	"dataset" : {
		 		"function" : func,
		 		"arguments" : JSON.stringify(args),
		 		"result" : result,
		 		"timestamp" : new Date().getTime(),
		 		"url" : window.location.href
		 	}}, "*");

		console.log("The function " + func + " was called with the parameters " + JSON.stringify(args) + " and returned " + result);
	}

	function getFunctionFromString(functionName) {
		// Window as global element
		var copy = window;

		// Retrieve function from string representation
		functionName.split(".").forEach(function(describtor){
			copy = copy[describtor];
		});

		return copy;
	}


	global.observe = function(observedFunctionDescribtor) {

		// Copy functionality of observed function
		var actualFunction = getFunctionFromString(observedFunctionDescribtor);

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

		// Prevent XSS by checking for valid function-describtor
		if (actualFunction) {
			eval(observedFunctionDescribtor + " = " + newFunction);
		} else {
			console.error("Function not found!");
		}
		
	};

}(observer));