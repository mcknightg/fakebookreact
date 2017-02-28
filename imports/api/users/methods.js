import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'Users.changeEmail': function changeEmail(email) {
        if (email) {
            Meteor.users.update(Meteor.userId(), {
                    $set: {
                        'emails.0.address': email,
                    },
            });
        }
    },
    'Users.getDataById': function getDataById(userId) {
        if (userId) {
            return Meteor.users.find(
                {
                    _id: userId,
                },
                {
                    fields:
                        {
                            'profile.firstname': 1,
                            'profile.lastname': 1,
                            'profile.fullname': 1,
                        },
                },
            ).fetch();
        }

        return null;
    },
});

// getDataById, alternate method to get post user full name using Meteor methods
// use it in client like this:
//
// getUserDataById(userId) {
//     Meteor.call('Users.getDataById', userId, (error, result) => {
//         if (error) {
//             console.log('Error:', error);
//         } else {
//             this.setState({ fullName: result[0].profile.fullname });
//         }
//     });
//
//     return this.state.fullName;
// }

