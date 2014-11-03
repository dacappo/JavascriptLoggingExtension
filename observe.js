var observer = {};

(function(global) {

	function report(func, args, result) {
		console.log("The function " + func + " was called with the parameters " + JSON.stringify(args) + " and returned " + result);
	}

	global.observe = function(observedFunction) {

		var newFunction = function() {
			var args, result;

			// Get array of arguments
			args = Array.prototype.slice.call(arguments);

			// Call the observed function with given arguments;
			result = observedFunction.apply(this, args);

			// Report observed function call
			report(observedFunction, args, result);

			// Return actual results
			return result;
		}

		observedFunction = newFunction;
	}
	

}(observer));