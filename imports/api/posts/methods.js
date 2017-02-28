import { Meteor } from 'meteor/meteor';
import Posts from './posts';

Meteor.methods({
    'Posts.insert': function postsInsert(message, imageURL) {
        const post = {
            user: Meteor.user(),
            createdAt: new Date(),
            imageurl: imageURL,
            message,
            likes: [],
            comments: [],
        };

        Posts.insert(post);
    },
    'Posts.like': function postsInsert(postId) {
        Posts.update(postId, {
            $addToSet: {
                likes: Meteor.userId(),
            },
        });
    },
});
