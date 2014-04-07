/**
 * Created by Jason on 3/11/14.
 */

var express = require('express');
var res = express.response;
console.log('in message module');
console.log(res.constructor.name);

res.message = function (msg, type){
    type = type || 'info';
    var sess = this.req.session;  //what will be this?
    console.log('in message res.message function');
    console.log(this.constructor.name);
    console.log(this.req.constructor.name);
    if(this==res){
        console.log('this is res');
    } else{
        console.log('this is not res');
    }
    sess.messages = sess.messages || [];
    sess.messages.push({type: type, string: msg});
};

res.error = function(msg){
    console.log('in res.error function');
    console.log(this.constructor.name);
    return this.message(msg, 'error');
};




module.exports = function(req, res, next){
    res.locals.messages = req.session.messages || {};
    res.locals.removeMessages = function(){
        req.session.messages = [];
    };
    next();
};