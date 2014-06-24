/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var database = require('./database.js').database;
var _ = require('underscore');

exports.handler = function(req, response) {

  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (req.method === 'OPTIONS') {
    console.log("options");
    headers['Allow'] = 'HEAD,GET,PUT,DELETE,OPTIONS';
    response.writeHead(statusCode, headers);
    response.end();
    return;

  }
  console.log("Request type is ",req.method);
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  //Parse the request and figure out what the client is asking for
  //Parse which HTTP method - GET/POST/PUT? (request.method)
  //Parse the URL it is requesting (request.url)


  var data={}; //Just so the server does not crash on a different URL
  data.results = [];
  if (req.url === '/1/classes/messages' && req.method === 'GET') {
    // data = {};
    //Retrieve the array of messages
    statusCode = 200;
    for(var i=0; i<database.length;i++){
      data.results.push(database[i]);
    }
    //Build the JSON object that contains the array of message objects

  } else if (req.url === '/1/classes/messages' && req.method === 'POST') {
    statusCode = 201;
    req.on('data',function(chunk){
      var message = JSON.parse(chunk.toString());
      database.unshift(message);
      console.log(database[database.length-1]);
    });

  } else if(req.url === '/1/classes/messages'){
    statusCode = 405;
  } else {
    statusCode = 404;
  }


//-------Build Response -----
//Building a response header


  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);
  console.log(JSON.stringify(data));

  response.end(JSON.stringify(data));

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  // response.end("The request type was " + req.method + " and the URL was "  + req.url);
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
