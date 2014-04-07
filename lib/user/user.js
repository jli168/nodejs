/**
 *
 * Created by Jason on 3/11/14.
 */

var redis = require('redis');
var bcrypt = require('bcrypt-nodejs');
var db = redis.createClient(6379, '127.0.0.1');
//redis.debug_mode = true;

module.exports= User;

function User(obj){
//    console.log('in User constructor');
//    console.log(obj);
    for(var key in obj){
        this[key] = obj[key]; //here, it is this[key], not User[key]!!!
    }
}

User.prototype.save = function(fn){
    if(this.id){
        this.update(fn);
    }else {
        var user = this;
        db.incr('user:ids', function(err, id){
            if(err) return fn(err);
            user.id = id;
            user.hashPassword(function(err){
                if(err) return fn(err);
                user.update(fn);
            });
        });
    }
};


User.prototype.update = function(fn){
    var user = this;
    var id = user.id;
//    console.log('in user update');
//    console.log(user);
    db.set('user:id:'+user.name, id, function(err){
        if(err) return fn(err);
        db.hmset('user:'+id, user, function(err){
            fn(err);
        });
    });
};


User.prototype.hashPassword = function(fn){
    var user = this;
    bcrypt.genSalt(12, function(err, salt){
        if(err) return fn(err);
        user.salt = salt;
        bcrypt.hash(user.pass, salt, null, function(err, hash){
            if(err) return fn(err);
            user.pass = hash;
            fn();
        });
    });
};

//use name to initialize a User object.
User.getByName = function(name, fn){
    User.getId(name, function(err, id){
        if(err) return fn(err);
        User.get(id, fn);
    });
};

User.getId = function(name, fn){
    db.get('user:id:'+name, fn);
};

User.get = function(id, fn){
    db.hgetall('user:'+id, function(err, user){
        if(err) return fn(err);
        console.log('in User.get...hgetall');
        console.log(user);
        fn(null, new User(user));
    });
};

User.authenticate = function(name, pass, fn){
    User.getByName(name, function(err, user){
       if(err) return fn(err);
       if(!user.id) return fn();
       bcrypt.hash(pass, user.salt, null, function(err, hash){
           if(err) return fn(err);
           if(hash === user.pass) return fn(null, user);
           fn();
       });
    })
};
//
//var tobi = new User({
//    name : 'Tobi',
//    pass: 'tobi brother',
//    age: '2'
//});
//
//tobi.save(function(err){
//    if(err) throw err;
//    console.log('user id %d', tobi.id);
//    console.log(tobi);
//});
//
//









