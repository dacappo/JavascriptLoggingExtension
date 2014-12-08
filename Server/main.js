// Trivial stuff - no comments needed
(function(){
	"use strict";

	var https = require("https");
	var fs = require("fs");

	var options = {
		key : fs.readFileSync("../../../ssl/private/sebastian-lekies.de.key"),
		cert: fs.readFileSync("../../../ssl/certs/sebastian-lekies.de.crt"),
		ca: fs.readFileSync("../../../ssl/certs/sub.class1.server.ca.pem")
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

		}		
	}).listen(8000, "0.0.0.0");
	console.log("Server is up and running at 0.0.0.0:8000");
}());
