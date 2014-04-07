/**
 * Created by Jason on 3/19/14.
 */

exports.has = Object.prototype.hasOwnProperty;

/**
 * merge object 'b' into 'a'
 * @param {Object}a
 * @param {Object}b
 * @returns {Object}a
 */
exports.merge = function merge(a, b){
    for(var key in b){
        if(exports.has.call(b, key) && b[key]){
            if('object' === type(b[key])){
                if('undefined' === type(a[key]))
                    a[key] ={};
                exports.merge(a[key], b[key]);
            }else{
                a[key] = b[key];
            }
        }
    }
    return a;
};

//make sure user logged in
exports.requireLogin = function(req, res, next){
    if(req.session.loggedIn){
        next();
    }else{
        res.error('User not logged in');
        res.render('index',{title: "first chat room"});
    }
}
