/**
 * Created by Jason on 3/12/14.
 */

var User = require('../user/user');

module.exports = function(req, res, next){
    var user;
    if(req.hasOwnProperty('session') && req.session.hasOwnProperty('user')){
        user = req.session.user;
    }

    if(!user || !user.id) return next();
    var uid = user.id;
    User.get(uid, function(err, user){
        if(err) return next(err);
//        console.log('in middleware user');
//        console.log(user);
        res.locals.user = user;
        next();
    });

}