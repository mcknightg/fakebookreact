import React, { Component } from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {
    getLinks() {
        const links = [
            { _id: '1', href: '/profile', icon: 'fa fa-user fa-2x', text: 'Profile' },
            { _id: '2', href: '/dashboard', icon: 'fa fa-rss fa-2x', text: 'News Feed' },
            { _id: '3', href: '/messages', icon: 'fa fa-comment fa-2x', text: 'Messages' },
            { _id: '4', href: '/friends', icon: 'fa fa-users fa-2x', text: 'Friends' },
        ];

        return links.map((link) => {
            return (
                <li key={link._id}>
                    <Link to={link.href}>
                        <i className={link.icon} />
                        {link.text}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="column col-sm-2 col-xs-1 sidebar-offcanvas">
                <ul className="nav">
                    <li>
                        <a href="#" className="visible-xs text-center">
                            <i className="fa fa-list-alt" />
                        </a>
                    </li>
                </ul>
                <ul className="nav hidden-xs" id="lg-menu">
                    {this.getLinks()}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
