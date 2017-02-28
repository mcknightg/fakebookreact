import { Meteor } from 'meteor/meteor';
import Images from './images';

Meteor.methods({
    'Images.changeAvatar': function changeAvatar(imageId) {
        if (imageId) {
            const image = Images.findOne({ _id: imageId });
            if (image !== undefined) {
                Meteor.users.update(Meteor.userId(), {
                    $set: {
                        'profile.avatar': image.link(),
                    },
                });
            }
        }
    },
});
