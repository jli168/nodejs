/**
 * Created by Jason on 3/12/14.
 */

var User = require('../lib/user/user');

exports.form = function(req, res){
    res.render('login', {title: 'Login'});
};

exports.submit = function(req, res, next){
    var data = req.body.user;

    User.authenticate(data.name, data.pass, function(err, user){
        if(err) next(err);
        if(user){
            console.log('log in success! with user id: '+user.id);
           // req.session.uid = user.id;
            //i want uer's all info, not just id
            req.session.user = user;
            req.session.loggedIn = true;
            res.message("successfully logged in", "good");
            res.redirect('/');
        }else{
            console.log('log in failed!')
            res.error('login failed');
            res.redirect('back');
        }
    });
};

exports.logout = function(req, res){
    req.session.destroy(function(err){
        if(err) throw err;
        res.redirect('/');
    });
}