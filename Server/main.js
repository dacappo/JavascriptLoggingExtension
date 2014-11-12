(function(){
	"use strict";

	var http = require("http");
	http.createServer(function (request, response) {
		console.log("Request received from " + request.url + "! ");

		// Get GET parameters from URL
		var url = require("url");
		var qs = require("querystring");
		var path = url.parse(request.url, true).pathname;

		if (path === "/storeObservedFunctionCall") {
			var body = "";

			request.on("data", function(data){
				body += data;
			});

			console.log(body);

			request.on("end", function() {
				var parameters = qs.parse(body);
				var database = require("./database");
				database.storeObservedFunctionCall(JSON.parse(parameters.data));
			});
			
		} else if (path === "/") {

		}

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end();
	}).listen(7000, "127.0.0.1");
	console.log("Server is up and running at http://127.0.0.1:7000");
}());