var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var busboy = require('connect-busboy');
var session = require('express-session');
var csrf = require('csurf');
var mysql=require('mysql');
var conn=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'nodejs',
	port:3306
});
conn.connect();
conn.query('select 1+1 as solution',function(err,rows,fields){
	if(err)
		throw err;
	console.log('the solution is :',rows[0].solution);
});
conn.end();


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var book = {name: 'Practical Node.js',
		  publisher: 'Apress',
		  keywords: 'node.js express.js mongodb websocket oauth',
		  discount: 'PNJS15'
		}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//false use node.js core,true use qs module
app.use(cookieParser());
//app.use(session());
//app.use(csrf());
app.use(express.static(path.join(__dirname, 'public')));
console.log(app.get('env'));

app.set('jsonp callback name','cb');
app.set('case sensitive routing', true);
/**
 * json filter
 */
app.set('json replacer',function(key,value){
	if(key==='discount')
		return undefined;
	else
		return value;
});

app.set('json spaces',4);
app.set('query parser', 'simple');
app.set('subdomain offset', 3);




//file upload
//app.use('/upload', busboy({immediate: true}));
//app.use('/upload', function(request, response) {
// request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
// file.on('data', function(data){
// fs.writeFile('upload' + fieldname + filename, data);
// });
// file.on('end', function(){
// console.log('File' + filename + 'is ended');
// });
// });
// request.busboy.on('finish', function(){
// console.log('Busboy is finished');
// response.status(201).end();
// })
//});

app.use('/', routes);
app.use('/users', users);
app.get('/jsonp', function(request, response){
	  response.jsonp(book);
})
app.get('/json', function(request, response){
	  response.send(book);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//-----------------------------------------------------
var debug = require('debug')('nodeexpress:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.set('origins', 'http://192.168.36.129:3000');
io.sockets.on('connection', function (socket) {
 socket.on('messageChange', function (data) {
 console.log(data);
 socket.emit('receive', data.message.split('').reverse().join('') );
 });
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


//module.exports = app;
