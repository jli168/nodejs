/**
 * Created by Jason on 3/19/14.
 */

/**
 * Module dependencies
 */
var sio = require('socket.io'),
    parseCookies = require('connect').utils.parseSignedCookies,
    connect = require('connect'),
    cookie = require('cookie'),
     fs = require('fs');
var express = require('express');
/**
 *Expose Sockets initialization
 */
module.exports = Sockets;


// from connect library
/// Parse the given cookie header string into an object
/// The object has the various cookies as keys(names) => values
/// @param {String} str
/// @return {Object}
var parse = function(str, opt) {
    opt = opt || {};
    var obj = {}
    var pairs = str.split(/[;,] */);
    var dec = opt.decode || {};

    pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=')

        // skip things that don't look like key=value
        if (eq_idx < 0) {
            return;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        // quoted values
        if ('"' == val[0]) {
            val = val.slice(1, -1);
        }

        // only assign once
        if (undefined == obj[key]) {
            try {
                obj[key] = dec(val);
            } catch (e) {
                obj[key] = val;
            }
        }
    });

    return obj;
};





/**
 * Socket.io
 */
function Sockets(app, server) {
    var config = app.get('config');

/*
    var io = sio.listen(server);
    io.set('authorization', function(data, accept){
        console.log('in auth');
        console.log(data.headers.cookie);
        console.log('first type of '+ typeof data.headers.cookie);
        console.log(JSON.stringify(data.headers.cookie));



//        if(typeof data.headers.cookie === 'object'){
//            console.log('cookie is an obj');
//        }else{
//            console.log('cookie is not an obj');
//            console.log('type of '+ typeof data.headers.cookie);
//        }


        if(data.headers.cookie){
          //  data.cookie = parse(data.headers.cookie);

          //var cookies = parseCookies(cookie.parse(hsData.headers.cookie), config.session.secret)

            data.cookie = parseCookies(cookie.parse(data.headers.cookie), config.session.secret);
            console.log(typeof data.cookie);
            console.log(data.cookie);


            //data.cookie = parseCookies(data.headers.cookie);
            data.sessionID = data.cookie['express.sid'];
            console.log('seesionID is '+data.sessionID);
        }else{
            return accept('No cookie transmitted', false);
        }

        accept(null, true);
    });

*/

    var io = sio.listen(server);
    io.set('authorization', function (data, accept) {
        // check if there's a cookie header
        if (data.headers.cookie) {
            // if there is, parse the
            var tempCo = cookie.parse(data.headers.cookie);
            console.log('in auth to check data');
            console.log(typeof tempCo);
            console.log(tempCo);

            data.cookie = parseCookies(tempCo,'yourownsecret')
            console.log(typeof data.cookie);
            console.log(data.cookie);
//             data.cookie = parseCookies(tempCo,'yourownsecret');


            // note that you will need to use the same key to grad the
            // session id, as you specified in the Express setup.
            data.sessionID = data.cookie['express.sid'];

        } else {
            // if there isn't, turn down the connection with a message
            // and leave the function.
            return accept('No cookie transmitted.', false);
        }
        // accept the incoming connection
        accept(null, true);
    });


    io.sockets.on('connection', function(socket){
        console.log('Socket server is connected');
        console.log('A socket with sessionID '+socket.handshake.sessionID
        +' is connected');


    })


}