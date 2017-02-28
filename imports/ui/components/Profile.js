import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Images from '../../api/images/images';
import Avatar from './Avatar';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            className: 'img-circle img-responsive custom-input-file',
            editMode: false,
            email: '',
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.ready === true) {
            this.setState({ email: newProps.currentUser.emails[0].address });
        }
    }

    toggleEdit() {
        this.setState({ editMode: !this.state.editMode });
    }

    changeEmail(event) {
        event.preventDefault();
        const newEmail = this.refs.email.value.trim();

        if (newEmail !== this.state.email) {
            Meteor.call('Users.changeEmail', newEmail, (error) => {
                if (error) {
                    console.log(error);
                }
            });

            this.setState({ email: newEmail });
        }

        this.toggleEdit();
    }

    uploadFile(event) {
        event.preventDefault();

        if (event.currentTarget.files && event.currentTarget.files[0]) {
            const file = event.currentTarget.files[0];

            if (file) {
                const upload = Images.insert({
                    file: event.currentTarget.files[0],
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                }, false);

                upload.on('end', (error, result) => {
                    if (error) {
                        console.log('Error during upload:', error);
                        this.setState({ imageId: '', fileName: '' });
                    } else {
                        Meteor.call('Images.changeAvatar', result._id, (errorAvatar) => {
                            if (errorAvatar) {
                                console.log('Error during changeAvatar:', errorAvatar);
                            } else {
                                this.setState({ className: 'img-circle img-responsive custom-input-file updated' });
                            }
                        });
                    }
                });

                upload.start();
            }
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

        const editMode = <input
            ref="email"
            defaultValue={this.state.email}
            onBlur={this.changeEmail}
            type="text"
        />;

        const emailLink = `mailto:${currentUser.emails[0].address}`;
        const mailBlock = this.state.editMode ? editMode : <a href={emailLink}>{this.state.email}</a>;

        return (
            <div className="row">
                <div className="col-md-2 hidden-xs text-center">
                    <Avatar
                        avatar={currentUser.profile.avatar}
                        firstName={currentUser.profile.firstname}
                        lastName={currentUser.profile.lastname}
                        className={this.state.className}
                        wrapLink={false}
                    />
                    <div>
                        <label htmlFor="avatar">
                            <div className="inputWrapper">
                                <input
                                    onChange={this.uploadFile}
                                    id="avatar"
                                    type="file"
                                    className="fileInput change-avatar"
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <div className="col-md-9 col-xs-9">
                    <h2>{`${currentUser.profile.firstname} ${currentUser.profile.lastname}`}</h2>
                    <table className="table table-user-information">
                        <tbody>
                        <tr>
                            <td onClick={this.toggleEdit}>Email</td>
                            <td>{mailBlock}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    currentUser: PropTypes.object,
    ready: PropTypes.bool,
};

export default createContainer(() => {
    const currentUser = Meteor.user();

    return {
        currentUser,
        ready: !!currentUser,
    };
}, Profile);
