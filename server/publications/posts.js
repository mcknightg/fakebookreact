Meteor.publish('postlist',function(friends,limit){
    return Posts.find({'user._id': { $in: friends }},
        {sort:{createdAt:-1},limit:limit});
});