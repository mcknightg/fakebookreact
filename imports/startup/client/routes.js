import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import HomeLayout from '../../ui/layouts/HomeLayout';
import Layout from '../../ui/layouts/Layout';
import Sidebar from '../../ui/components/Sidebar';
import Main from '../../ui/components/Main';
import Profile from '../../ui/components/Profile';
import UserHome from '../../ui/components/UserHome';
import NotFound from '../../ui/pages/NotFound';

const authenticate = (nextState, replace) => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};

const checkUser = (nextState, replace) => {
    if (Meteor.userId()) {
        replace({
            pathname: '/dashboard',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};

const signout = () => {
    Meteor.logout(() => {
        browserHistory.push('/');
    });
};

Meteor.startup(() => {
    render(
        <Router history={ browserHistory }>
            {/* Public Routes */}
            <Route path="/" component={ HomeLayout } onEnter={ checkUser } />

            {/* Private Routes */}
            <Route path="/dashboard" component={ Layout }>
                <IndexRoute name="dashboard" components={{ sidebar: Sidebar, content: Main }} onEnter={ authenticate } />
                <Route name="profile" path="/profile" components={{ sidebar: Sidebar, content: Profile }} onEnter={ authenticate } />
                <Route name="user" path="/user/:fullname" components={{ sidebar: Sidebar, content: UserHome }} onEnter={ authenticate } />
                <Route name="signout" path="/signout" onEnter={ signout } />
            </Route>
            <Route path="*" component={ NotFound } />
        </Router>,
        document.getElementById('react-root'),
    );
});
