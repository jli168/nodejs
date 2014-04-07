//
///*
// * GET home page.
// */
//
//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};
//
//exports.msgform = function(req, res){
//    res.render('msg_form');
//}
//exports.msgsubmit2 = function(req, res){
//    var msg = req.body.message;
//    var name = req.body.name;
//
//    io.sockets.emit("incommingMsg",{msg: msg, name: name});
//
//    res.json(200, {msg: "messaged received"});
//
//};
//

var utils = require('../utils');
var register = require('./register');
var login = require('./login');
var chatroom = require('./chatroom');
/**
 * Expose routes
 */
module.exports = Routes;


/**
 * define routes for app
 * @param {Express} ass 'Express' instance
 */

function Routes(app){
    var config = app.get('config');


    /*
     *   Homepage
     */
    app.get('/', function(req, res, next){
        console.log('session: '+ req.sessionID);
//        if(typeof req.cookies['PHPSESSID'] !== 'undefined'){
//            console.log('PHPSESSID.sid '+req.cookies['PHPSESSID']);
//        }
//        if(typeof req.cookies['app.sess'] !== 'undefined'){
//            console.log('app.sess '+req.cookies['app.sess']);
//        }
        res.cookie('count', 10);
        res.render('index', {title: "first chat room"});
    });


    app.get('/msg_form', function(req, res){
        console.log('in /msg_form route');
//        console.log('session: '+ req.sessionID);
//        console.log(req.cookies);
//        console.log('now it is session');
//        console.log(req.session);
//        console.log(req.session.cookie);

        res.render('msg_form');
    });


    app.get('/register', register.form);
    app.post('/register', register.submit);
    app.get('/login', login.form);
    app.post('/login', login.submit);
    app.post('/logout', login.logout);

    app.get('/main_chatroom', utils.requireLogin, chatroom.mainroom_form);
    app.get('/create_chatroom', utils.requireLogin, chatroom.createroom_form);
    app.post('/create_chatroom', utils.requireLogin, chatroom.createroom_submit);


}


















