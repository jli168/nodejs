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
        res.render('index');
    });

}


















