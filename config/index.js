/**
 * Created by Jason on 3/19/14.
 */

var express = require('express'),
    path = require('path'),
    url = require('url'),
    http = require('http'),
    RedisStore = require('connect-redis')(express), //provide session store in redis
    redisClient = require("redis").createClient();


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

    app.set('views', path.join(__dirname, '../','views'));

    app.use(express.static(path.join(__dirname,'../', 'public')));



    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());


    /*
        the reason not using bodyParser is that some parts of will be not be used...
     */
   // app.use(express.bodyParser()); //add bodyParser
    app.use(express.cookieParser(config.session.secret));

    app.use(express.session({
        key: 'express.sid',
        secret: 'yourownsecret',
        cookie: {
            maxAge: config.session.age || null
        },
        store: new RedisStore({
            host: config.app.host,
            port: '6379',
            db: 'sessionDb',
            prefix:'sess',
            client: redisClient
        })
    }));



    app.use(app.router);




}