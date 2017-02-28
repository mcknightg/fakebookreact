import { Meteor } from 'meteor/meteor';
import Posts from '../posts';

Meteor.publish('Posts.list', function() {
    return Posts.find({}, { sort: { createdAt: -1 } });
});
