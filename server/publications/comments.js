Meteor.publish('comments',function(postid){
    return Comments.find({post:postid},{sort:{createdOn:-1}});
});