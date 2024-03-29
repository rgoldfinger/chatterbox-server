/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

// var database = require('./database.js').database;
var _ = require('underscore');
var fs = require('fs');
var db = require('./database.js').newDB;
var url = require('url');
var path = require('path');


var mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

// var newDB = require('./database.js').newDB;

// var data = newDB.readAll();

exports.handler = function(req, response) {

  //-------Build Response -----
  //Building a response header
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (req.method === 'OPTIONS') {
    headers['Allow'] = 'HEAD,GET,PUT,DELETE,OPTIONS';
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
    return;

  }

  //Parse the request and figure out what the client is asking for
  //Parse which HTTP method - GET/POST/PUT? (request.method)
  //Parse the URL it is requesting (request.url)


  var data={}; //Just so the server does not crash on a different URL
  data.results = [];

  if (req.url === '/1/classes/messages' && req.method === 'GET') {

    statusCode = 200;
    db.readAll(function(datab){
      for(var i = 0; i < datab.length; i++){
        data.results.push(datab[i]);
      }
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data));
    });
  } else if (req.url === '/1/classes/messages' && req.method === 'POST') {
    console.log("In Post");
    statusCode = 201;
    req.on('data',function(chunk){
      var message = JSON.parse(chunk.toString());
      db.writeOne(message,function(){
          response.writeHead(statusCode, headers);
          response.end(JSON.stringify(data));
          console.log("Just finished handling with callback");
        });
    });

  } else if(req.url === '/1/classes/messages'){
    statusCode = 405;
    response.writeHead(statusCode, headers);
    response.end();
  } else {
    var uri = url.parse(req.url).pathname;
    if (uri === '/') {
      uri = '/index.html';
    }

    var fileName = path.join(process.cwd(), 'client', uri);
    console.log("Filename is ",fileName);

    fs.exists(fileName, function(exists) {
      if (exists) {

        var mimeType = mimeTypes[path.extname(fileName)];
        headers['Content-Type'] = mimeType;
        response.writeHead(200, headers);
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(response);
        // response.end();

      } else {
        statusCode = 404;
        response.writeHead(statusCode, headers);
        response.end();

      }
    });
  }


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
