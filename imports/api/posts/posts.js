import { Mongo } from 'meteor/mongo';

const Posts = new Mongo.Collection('posts');

export default Posts;

Posts.allow({
    insert: () => true,
    update: () => true,
    remove: () => true,
});
