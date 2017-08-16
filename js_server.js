var http = require('http');
var fs = require('fs');

function errorResposne(response) {
	response.writeHead(404,{"Content-Type": "text/plain"});
	response.write("Error 404: Page not found");
	response.end;
}

function onRequest(request,response)
{
	if(request.method == 'GET' && request.url == "/")
	{
		response.writeHead(200,{"Content-Type": "text/html"});
		fs.createReadStream("./simple.html").pipe(response);
	}
	else
	{
			errorResposne(response);
	}
}


http.createServer(onRequest).listen(8080);
console.log("server is now running");