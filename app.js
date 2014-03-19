/**
 * Created by Jason on 3/19/14.
 */
var express = require('express');

var app = exports.app = express();

/**
 * Configure application
 */

require('./config')(app);

/**
 * Routes
 */
require('./routes')(app);

/**
 * Web Server
 */
exports.server = require('http')
    .createServer(app).listen(app.get('port'),function(){
        console.log("Chatroom server is started on port %d", app.get('port'));
    });

/**
 * Socket.io
 */
require('./sockets')(app, exports.server);

process.on('uncaughtException', function(err){
    console.log('Exception: ' + err.stack);
});
