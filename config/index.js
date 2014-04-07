/**
 * Created by Jason on 3/19/14.
 */

var log = require('debug')('MYAPP'),
    express = require('express'),
    path = require('path'),
    url = require('url'),
    http = require('http'),
    RedisStore = require('connect-redis')(express), //provide session store in redis
    messages = require('../lib/messages'),
    user = require('../lib/middleware/user');


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


    var redisClient = require("redis").createClient();

    //make sure redisClient is working
    redisClient
        .on('error', function(err) {
            console.log('Error connecting to redis %j', err);
        }).on('connect', function() {
            console.log('Connected to redis.');
        }).on('ready', function() {
            console.log('Redis client ready.');
        });

//    console.log('Saving redisClient connection in app');
    app.set('redisClient', redisClient);

//    console.log('Creating and saving a session store instance with redis client.');
    app.set('sessionStore', new RedisStore({client: redisClient}));

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
        store: app.get('sessionStore')
    }));


    app.use(user);
    app.use(messages);
    app.use(app.router);




}