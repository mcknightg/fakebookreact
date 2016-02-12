Meteor.publish('userlist',function(){
    return Meteor.users.find({},{fields:{profile:1,emails:1,_id:1}});
});