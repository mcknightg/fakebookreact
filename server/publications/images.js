Meteor.publish('imagelist',function(){
    return Images.find();
});