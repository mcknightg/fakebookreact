DBMessage = new Mongo.Collection('message');
DBMessage.allow({
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