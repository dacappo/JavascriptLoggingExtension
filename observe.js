var observer = {};

(function(global) {

	function report(func, args, result) {
		console.log("The function " + func + " was called with the parameters " + JSON.stringify(args) + " and returned " + result);
	}

	function getFunctionFromString(functionName) {
		var copy = window;

		functionName.split(".").forEach(function(describtor){
			copy = copy[describtor];
		})

		return copy;
	}


	global.observe = function(observedFunctionDescribtor) {

		var actualFunction = getFunctionFromString(observedFunctionDescribtor);

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
		}

		if (actualFunction) {
			eval(observedFunctionDescribtor + " = " + newFunction);
		} else {
			console.error("Function not found!");
		}
	}
	

}(observer));