/**
 * Created by Jason on 3/19/14.
 */
$(document).ready(function(){
    var baseUrl = document.domain;

    var sessionId = '';

    var socket = io.connect();
    socket.on('connect', function(){
        var pro;
        console.log('connected to server');
        sessionId = socket.socket.sessionid;
        console.log('client POV: session id is '+sessionId);
    });

    socket.on('newUser', function(message){
        $('#messages').append('<div>'+message+'</div>')
    });

    socket.on('userMsg', function(message){
        $('#messages').append('<div>'+message+'</div>')
    });

    $('#submit').click(function(e){
        e.preventDefault();
        var data = {
            message: $('#field-message').val(),
            type: 'userMsg'
        }
        $('#field-message').val('');
        $('#messages').append('<div>'+data.message+'</div>');
        console.log('data to be send: '+ data.message);
        socket.send(JSON.stringify(data));
    });




    socket.on('newConn', function(data){
        console.log('in newConn');
        console.log(data.users);
    });

    socket.on('message', function(msg){
        console.log('get a new message');
        console.log(msg);
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


