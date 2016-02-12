DBFeature = new Mongo.Collection('feature');
DBFeature.allow({
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