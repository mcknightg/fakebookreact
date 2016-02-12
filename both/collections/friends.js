DBFriends = new Mongo.Collection('friends');
DBFriends.allow({
    insert:function(){
        return true;
    },
    update:function(){
        return true;
    },
    remove:function(){
        return true;
    }
});