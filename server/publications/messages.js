Meteor.publish('messageList',function(){
    return DBMessage.find();
});