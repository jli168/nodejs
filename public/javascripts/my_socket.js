/**
 * Created by Jason on 3/19/14.
 */
$(document).ready(function(){
    var baseUrl = document.domain;

    var sessionId = '';

    var socket = io.connect();
    socket.on('connect', function(){
        console.log('connected to server');
        sessionId = socket.socket.sessionid;
        console.log("connected "+sessionId);
        socket.emit('newUser', {id: sessionId, name: $('#name').val()});
    });

    socket.on('newConn', function(data){
        console.log('in newConn');
        console.log(data.users);
    });

    socket.on('userDisconnected', function(data){
       console.log('disconnected...');
       console.log(data);
    });

    socket.on('incommingMsg', function(data){
        console.log('got a new message');
        console.log(data);
    });


    socket.on('error', function(reason){
        console.log('unable to connect to server', reason);
    })




});


