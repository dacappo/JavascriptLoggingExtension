(function() {
	"use strict";

	/* Create the script element */
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");

	/* get script that is lateron inlcuded into the page */
	var xhr = new XMLHttpRequest();
	var src = chrome.extension.getURL("observe.js");
	xhr.open("GET", src, false);
	xhr.send();

	/* Set the script code */
	script.text = xhr.responseText;

	/* Write the script tag into the DOM */
	document.documentElement.insertBefore(script, document.documentElement.firstChild);
}());