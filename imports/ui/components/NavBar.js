import $ from 'jquery';
import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // @TODO: Check a fix for typeahead.
        const users = Meteor.users.find({}, { fields: { profile: 1 } }).fetch();
        const usernames = users.map((user) => {
            return user.profile.fullname;
        });

        $('#typeahead').typeahead({
            name: 'users',
            local: usernames,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const user = (this.refs.searchText.value).trim();

        if (user !== '') {
            browserHistory.push(`/user/${user}`);
        }
    }

    render() {
        const {
            currentUser,
            ready,
        } = this.props;

        if (!ready) {
            return <div>Loading...</div>;
        }

        return (
            <div className="navbar navbar-blue navbar-fixed-top">
                <div className="navbar-header">
                    <button
                        type="button"
                        data-toggle="collapse"
                        data-target="navbar"
                        className="navbar-toggle"
                    >
                        <span className="sr-only" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <Link to="/dashboard" className="navbar-brand logo">
                        <i className="fa fa-facebook" />
                    </Link>
                </div>
                <nav className="collapse navbar-collapse">
                    <form
                        onSubmit={this.handleSubmit}
                        role="form"
                        className="navbar-form navbar-left"
                    >
                        <div className="input-group input-group-sm bs-example">
                            <input
                                ref="searchText"
                                id="typeahead"
                                type="text"
                                className="form-control tt-query"
                            />
                            <div className="input-group-btn searchBtn">
                                <button type="submit" className="btn btn-default">
                                    <i className="fa fa-search" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/dashboard">
                                <i className="fa fa-home" /> News Feed
                            </Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a data-toggle="dropdown" href="#" className="dropdown-toggle">
                                <i className="fa fa-user" /> {`${currentUser.profile.firstname} ${currentUser.profile.lastname}`}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/profile">Edit Profile</Link>
                                </li>
                                <li>
                                    <Link to="/signout">Logout</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

NavBar.propTypes = {
    currentUser: PropTypes.object,
    ready: PropTypes.bool,
};

export default createContainer(() => {
    const currentUser = Meteor.user();

    return {
        currentUser,
        ready: !!currentUser,
    };
}, NavBar);
