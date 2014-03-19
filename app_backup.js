
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socket = require('socket.io');

var app = express();

var users = [];



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser()); //add bodyParser

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/msg', routes.msgform);
app.post("/msg", function(req, res){
    var msg = req.body.message;
    var name = req.body.name;

    io.sockets.emit("incommingMsg",{msg: msg, name: name});

    //res.json(200, {msg: "messaged received"});

});


var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = socket.listen(httpServer);
io.set('log level', 1); // reduce logging


io.on("connection", function(socket){
   socket.on("newUser", function(data){
       users.push({id: data.id, name:data.name});
       io.sockets.emit("newConn", {users: users});
   });

   socket.on("disconnect", function(){
       io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
   });


});