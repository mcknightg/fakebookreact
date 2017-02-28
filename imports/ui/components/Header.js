import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messageClass: 'hidden',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    displayError(message) {
        this.setState({
            message,
            messageClass: 'alert alert-danger message',
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            message: '',
            messageClass: 'hidden',
        });

        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
                this.displayError(error.reason);
            } else {
                browserHistory.push('/dashboard');
            }
        });
    }

    render() {
        return (
            <div>
                <span className="navbar-react">
                    <i className="fa fa-facebook" />akebook
                </span>
                <div className="collapse navbar-collapse" id="navbar">
                    <form
                        onSubmit={this.handleSubmit}
                        role="form"
                        id="signin"
                        className="navbar-form navbar-right"
                    >
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user" />
                            </span>
                            <input
                                type="text"
                                placeholder="Email Address"
                                id="email"
                                ref="email"
                                className="form-control"
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock" />
                            </span>
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                ref="password"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <br />
                        <span className={this.state.messageClass}>
                            {this.state.message}
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}

export default Header;
