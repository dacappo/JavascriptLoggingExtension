(function(){
	"use strict";

	var http = require("http");
	var url = require("url");
	http.createServer(function (request, response) {
		// Get GET parameters from URL
		var parameters = url.parse(request.url, true).query;

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end(JSON.stringify(parameters));
	}).listen(7000, "127.0.0.1");
	console.log("Server running at http://127.0.0.1:7000");
}());