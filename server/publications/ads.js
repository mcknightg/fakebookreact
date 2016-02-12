Meteor.publish('adlist',function(){
    return DBAds.find();
});