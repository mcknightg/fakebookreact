import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Avatar extends Component {
    render() {
        const {
            avatar,
            firstName,
            lastName,
            className,
            wrapLink,
        } = this.props;

        if (!avatar) {
            return (
                <img
                    className={this.props.className}
                    src='/images/generic-user-profile.png'
                    alt="Image"
                />
            );
        }

        const personLink = (`/user/${firstName}${lastName}`).toLowerCase();
        const avatarImg = <img className={className} src={avatar} alt="Image" />;

        if (wrapLink) {
            return (
                <Link to={personLink}>
                    {avatarImg}
                </Link>
            );
        }

        return avatarImg;
    }
}

Avatar.propTypes = {
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    className: PropTypes.string,
    wrapLink: PropTypes.bool,
};

export default Avatar;
