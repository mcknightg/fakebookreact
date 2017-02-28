import { Meteor } from 'meteor/meteor';

Meteor.publish('Users.User', (searchField, data) => {
    return Meteor.users.find(
        {
            [searchField]: data,
        },
        {
            fields:
                {
                    'profile.firstname': 1,
                    'profile.lastname': 1,
                    'profile.fullname': 1,
                    'profile.avatar': 1,
                },
        },
    );
});
