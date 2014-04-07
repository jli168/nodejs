/**
 * Created by Jason on 3/26/14.
 */

exports.mainroom_form = function(req, res){
    res.render('main_chatroom');
}

exports.createroom_form = function(req, res){
    res.render('createroom_form');
}

exports.createroom_submit = function(req, res){
    room_name = req.body.chatroom_name;
    room_info = req.body.chatroom_info;

}

