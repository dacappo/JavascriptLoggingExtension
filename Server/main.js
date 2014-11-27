// Trivial stuff - no comments needed
(function(){
	"use strict";

	var https = require("https");
	var fs = require("fs");

	var options = {
		key : fs.readFileSync("../../../myssl/private/privkey.pem"),
		cert: fs.readFileSync("../../../myssl/public/cert.pem")
	};

	https.createServer(options, function (request, response) {
		response.writeHead(200, {"Content-Type": "text/plain"});

		// Get GET parameters from URL
		var url = require("url");
		var qs = require("querystring");
		var path = url.parse(request.url, true).pathname;

		if (path === "/storeObservedFunctionCalls") {
			var body = "";

			request.on("data", function(data){
				body += data;
			});

			request.on("end", function() {
				var parameters = qs.parse(body);
				var database = require("./database");
				var parsedParameters;

				try {
					parsedParameters = JSON.parse(parameters.data);
				} catch(e) {
					console.log("JSON parse error occured!");
				}

				console.log("--- Report received! ---");
				database.storeObservedFunctionCall(parsedParameters);
			});

			response.end();

		} else if (path === "/getObservedFunctions") {
			var database = require("./database");
			database.getObservedFunctions(function(data){
				console.log(JSON.stringify(data));
				response.write(JSON.stringify(data));
				response.end();
			});
		}
		
	}).listen(7000, "0.0.0.0");
	console.log("Server is up and running at http://0.0.0.0:7000");
}());
