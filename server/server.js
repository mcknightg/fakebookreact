Meteor.startup(function () {
    if (DBFeature.find().fetch().length === 0) {
        var features = [
            {
                icon: "fa fa-image fa-2x",
                bigtext: "See photos and updates",
                littletext: 'from friends in News Feed'
            },
            {
                icon: "fa fa-share fa-2x",
                bigtext: "Share what\'s new",
                littletext: 'in your life on your Timeline'
            },
            {
                icon: "fa fa-search fa-2x",
                bigtext: "Find more",
                littletext: 'of what you\'re looking for with Fakebook search'
            }
        ];

        _.each(features, function (featureData) {
            DBFeature.insert(featureData);
        });
    }
    if (DBAds.find().fetch().length === 0) {
        DBAds.insert({title: 'First Advertisement', text: 'This is on sale now.'});
    }
    Meteor.methods({
        'Posts.insert': function (message, imageurl) {
            var post = {
                user: Meteor.user(),
                createdAt: new Date(),
                imageurl: imageurl,
                message: message,
                likes: [],
                comments: []
            };
            Posts.insert(post);
        },
        'Post.remove':function(id){
                Posts.remove(id);
        },
        'changeEmail':function(email){
            Meteor.users.update(this.userId,{$set:{'emails.0.address':email}});
        },
        'addComment': function (message, post) {
            var user = this.userId;
            var date = new Date();
            var comment = {message: message, post: post._id, user: user, createdOn: date};
            Comments.insert(comment)
        },
        'changeAvatar': function (user, fileid) {
            var file = 'http://placehold.it/150x150';
            if (fileid) {
                file = Images.findOne({_id: fileid});
            }
            var data = file._id;

            Meteor.users.update(this.userId, {$set: {'profile.avatar': data}});
        },
        'sendMessage':function(person,subject,message){
            var to = Meteor.users.findOne({_id: person});
            var from = Meteor.users.findOne({_id: this.userId});
            var msg = {
                to:to,
                fromuser:from._id,
                title:subject,
                message:message,
                createdOn:new Date()
            };
            console.log(msg);
            if (person == this.userId) {
                throw new Meteor.Error("You can not send yourself a message.")
            }
            DBMessage.insert(msg);
        },
        'askFriend': function (friendid, message) {

            var from = Meteor.users.findOne({_id: this.userId});
            var to = Meteor.users.findOne({_id: friendid});
            var message = {
                to: to,
                fromuser: from._id,
                title: from.profile.firstname + ' ' + from.profile.lastname + ' wants to be your friend.',
                message: message
            };
            console.log(friendid, this.userId);
            if (friendid == this.userId) {
                throw new Meteor.Error("You can not friend yourself.")
            }
            DBMessage.insert(message);
        },
        'confirmFriend': function (message) {
            console.log(message.to._id, message.fromuser);
            Meteor.users.update(message.to._id, {$addToSet: {'profile.friends': message.fromuser}});
            Meteor.users.update(message.fromuser, {$addToSet: {'profile.friends': message.to._id}});
            DBMessage.remove(message._id);
        },
        'removeFriend': function (userid, friendid) {

        },
        'likePost': function (userid, postid) {
            console.log(userid, postid);
            Posts.update(postid, {$addToSet: {likes: this.userId}});
        }

    })
});
