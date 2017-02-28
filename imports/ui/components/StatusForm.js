import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Images from '../../api/images/images';

class StatusForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageId: '',
            fileName: '',
        };

        this.resetFields = this.resetFields.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    resetFields() {
        this.refs.sharing.value = '';
        this.refs.sharing.focus();
    }

    submitForm(event) {
        event.preventDefault();
        const message = this.refs.sharing.value.trim();
        const imageId = this.state.imageId;
        let imageURL = '';

        if (imageId) {
            const image = Images.findOne({ _id: imageId });
            if (image) {
                imageURL = image.link();
            }
        } else {
            imageURL = '';
        }

        Meteor.call('Posts.insert', message, imageURL, (error) => {
            if (error) {
                console.log(error);
            } else {
                this.setState({ image: '', fileName: '' });
                this.resetFields();
            }
        });
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
                        this.setState({ imageId: result._id, fileName: result.name });
                    }
                });

                upload.start();
            }
        }
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-content">
                    <div className="panel-heading">
                        Update Status
                    </div>
                    <form onSubmit={this.submitForm} className="form center-block">
                        <div className="panel-body">
                            <div className="form-group">
                                <textarea
                                    placeholder="What do you want to share?"
                                    className="form-control input-lg"
                                    ref="sharing"
                                    id="sharing"
                                >
                                </textarea>
                                <h3>{this.state.fileName}</h3>
                            </div>
                            <div className="panel-footer">
                                <div>
                                    <ul className="pull-left list-inline">
                                        <li>
                                            <input
                                                onChange={this.uploadFile}
                                                ref="file"
                                                type="file"
                                                id="file"
                                                className="filepicker"
                                            />
                                        </li>
                                    </ul>
                                    <button className="btn btn-primary btn-sm postbutton">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('Images.all');

    return {};
}, StatusForm);
