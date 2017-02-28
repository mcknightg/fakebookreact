import { Meteor } from 'meteor/meteor';
import Ads from '../ads';

Meteor.publish('Ads.list', function() {
    return Ads.find({}, {});
});
