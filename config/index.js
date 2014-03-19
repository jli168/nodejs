/**
 * Created by Jason on 3/19/14.
 */

var express = require('express'),
    path = require('path'),
    url = require('url'),
    http = require('http');



module.exports = Config;

function Config(app){
    console.log('Attempt to load from config.json');
    try{
        config = require('./config.json');
    }catch(err){
        console.log('failed to load confi.json');
    }


    app.set('config', config);

    app.set('port', config.app.port);

    app.set('view engine', 'ejs');

    app.set('redisURL', config.redisURL);

    app.set('views', path.join(__dirname, 'views'));

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());


    app.use(express.cookieParser(config.session.secret));

    app.use(express.session({
        key: "chatroom",
        cookie: {
            maxAge: config.session.age || null
        }
    }));

 //   app.use(express.bodyParser()); //add bodyParser


    app.use(app.router);




}