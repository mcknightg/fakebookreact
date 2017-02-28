import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from './Avatar';

class UserHome extends Component {
    render() {
        const {
            ready,
            user,
        } = this.props;

        if (!ready && !user) {
            return <div>Loading...</div>;
        }

        let userHeader = '';
        if (user != null && user.profile.fullname) {
            userHeader = <Avatar
                avatar={user.profile.avatar}
                firstName={user.profile.firstname}
                lastName={user.profile.lastname}
                className="img-circle avatar"
                wrapLink={false}
            />;
        } else {
            userHeader = 'No User Found';
        }

        let userFullName = '';
        if (user != null && user.profile) {
            userFullName = `${user.profile.firstname} ${user.profile.lastname}`;
        } else {
            userFullName = 'No User Found';
        }

        return (
            <div>
                <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h2>{userHeader}</h2>
                        </div>
                        <div className="panel-body">
                            <h2>{userFullName}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserHome.propTypes = {
    className: PropTypes.string,
    currentUser: PropTypes.object,
    user: PropTypes.object,
    ready: PropTypes.bool,

};

export default createContainer((props) => {
    const userhandle = Meteor.subscribe('Users.User', 'profile.fullname', props.params.fullname);
    const currentUser = Meteor.user();

    let user = null;
    if (userhandle.ready()) {
        user = Meteor.users.findOne({ 'profile.fullname': props.params.fullname });
    }

    return {
        currentUser,
        user,
        ready: !!currentUser && user !== null,
    };
}, UserHome);
