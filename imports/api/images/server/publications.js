import { Meteor } from 'meteor/meteor';
import Images from '../images';

Meteor.publish('Images.all', function() {
    return Images.find({
        userId: this.userId,
    }).cursor;
});
