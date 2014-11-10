(function(){
	"use strict";

	var http = require("http");
	http.createServer(function (request, response) {
		// Get GET parameters from URL
		var url = require("url");
		var parameters = url.parse(request.url, true).query;

		// Connect to MySql database
		var mysql = require("mysql");
		var connection = mysql.createConnection({
			host : "localhost",
			user : "",
			password : ""
		});

		connection.connect();

		connection.query("INSERT INTO ...", function(err) {
			if (err) throw err;

			console.log("Successfully inserted!");
		});
		

		response.writeHead(200, {"Content-Type": "text/plain"});
		response.end(JSON.stringify(parameters));
	}).listen(7000, "127.0.0.1");
	console.log("Server is up and running at http://127.0.0.1:7000");
}());