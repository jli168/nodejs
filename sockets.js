/**
 * Created by Jason on 3/19/14.
 */

/**
 * Module dependencies
 */
var sio = require('socket.io'),
    parseCookies = require('connect').utils.parseSignedCookies,
//    cookie = require('cookie'),
     fs = require('fs');

/**
 *Expose Sockets initialization
 */
module.exports = Sockets;

/**
 * Socket.io
 */

function Sockets(app, server) {
    var config = app.get('config');

    var io = sio.listen(server);

    io.sockets.on('connection', function(socket){
        console.log('Socket server is connected');

    })


}