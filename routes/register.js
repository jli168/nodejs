/**
 * Created by Jason on 3/11/14.
 */

var User = require('../lib/user/user');

exports.form = function(req, res){
    res.render('register', {title:'Register'});
};


exports.submit = function(req, res, next){
    var data = req.body.user;
    User.getByName(data.name, function(err, user){
       if(err) return next(err);

        if(user.id){
            res.error('Username is taken');
            res.redirect('back');
        } else {
            user = new User({
                name: data.name,
                pass: data.pass
            });
//            console.log('in register.submit, before save user');
//            console.log(user);
            user.save(function(err){
                if(err) return next(err);
                req.session.uid = user.id;
                res.message("successfully saved", 'good');
//                console.log('in register.submit,after save user');
//                console.log(user);
                res.redirect('/');
            })
        }
    });
};
