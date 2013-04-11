//console colours
var	blue  	= '\033[34m',
	green 	= '\033[32m',
	red   	= '\033[31m',
	yellow 	= '\033[33m',
	reset 	= '\033[0m';


console.log(blue+'Musarc App Starting');

var express = require('express')
,	http 	= require('http')
,	app 	= express()
,	server 	= http.createServer(app);

app.configure('development', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.logger());
});

app.configure('production', function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler());
});

server.listen(process.env.PORT || 8080, function (err) {
  if (err) {
    throw err;
  }

  console.log(green+'info: '+reset+'Express server started on '+yellow+'%s:'+yellow+'%s'+reset+'.', server.address().address, server.address().port);
  console.log(green+'info: '+reset+'App running in '+yellow+process.env.NODE_ENV+reset+' mode.');
});