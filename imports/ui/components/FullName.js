import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class FullName extends Component {
    render() {
        const {
            fullName,
            firstName,
            lastName,
            className,
        } = this.props;

        const personLink = (`/user/${fullName}`).toLowerCase();

        return (
            <Link to={personLink} className={className}>{`${firstName} ${lastName}`}</Link>
        );
    }
}

FullName.propTypes = {
    fullName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default FullName;
