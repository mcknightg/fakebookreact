Posts = new Mongo.Collection('posts');
Posts.allow({
    insert:function(){
        return true;
    },
    update:function(){
        return true;
    },
    remove:function(userId,doc){
        return doc && doc.owner._id === userId;
    }
});
