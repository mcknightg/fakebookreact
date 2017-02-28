import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from './Avatar';
import FullName from './FullName';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
        };

        this.likePost = this.likePost.bind(this);
        this.renderLikes = this.renderLikes.bind(this);
    }

    likePost(event) {
        event.preventDefault();

        const {
            post,
        } = this.props;

        Meteor.call('Posts.like', post._id, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    renderLikes() {
        const {
            currentUser,
            post,
        } = this.props;

        let likes = '';
        let likeSub = 0;

        if (post.likes.indexOf(currentUser._id) !== -1) {
            likes = 'You and';
            likeSub = 1;
        }

        switch (post.likes.length - likeSub) {
            case 0:
              return likeSub > 0 ? 'You like this' : '';
            case 1:
                return likeSub > 0 ? `${likes} 1 other person likes this` : '1 person likes this';
            default:
                return `${likes} ${post.likes.length - likeSub} people like this`;
        }
    }

    render() {
        const {
            ready,
            post,
            user,
        } = this.props;


        if (!ready) {
            return <div>Loading...</div>;
        }

        let dimage = '';
        if (post.imageurl) {
            dimage = (
                <div>
                    <div className="panel-thumbnail">
                        <img
                            src={post.imageurl}
                            alt=""
                            className="img-responsive postimage img-thumbnail"
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="col-sm-12">
                <div className="panel panel-white post panel-shadow">
                    <div className="post-heading">
                        <div className="pull-left image">
                            <Avatar
                                avatar={user.profile.avatar}
                                firstName={user.profile.firstname}
                                lastName={user.profile.lastname}
                                className="img-circle avatar"
                                wrapLink={true}
                            />
                        </div>
                        <div className="pull-left meta">
                            <div className="title h5">
                                <strong>
                                    <FullName
                                        fullName={user.profile.fullname}
                                        firstName={user.profile.firstname}
                                        lastName={user.profile.lastname}
                                    />
                                </strong> made a post
                            </div>
                            <h6 className="text-muted time">An hour ago</h6>
                        </div>
                    </div>
                    <div className="col-md-12 post-description">
                        <h3>{post.message}</h3>
                        <br />
                    </div>
                    <div className="col-md-12">
                        {dimage}
                        <br />
                    </div>
                    <div className="actions">
                        <a onClick={this.likePost} href="#" className="btn btn-default stat-item">
                            <i className="fa fa-thumbs-up icon" />
                        </a>&nbsp;
                        {this.renderLikes()}
                    </div>
                    <div className="post-footer">
                        Comments List
                    </div>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    user: PropTypes.object,
    ready: PropTypes.bool,
};

export default createContainer((props) => {
    const userhandle = Meteor.subscribe('Users.User', '_id', props.post.user._id);
    const currentUser = Meteor.user();

    let user = null;
    if (userhandle.ready()) {
        user = Meteor.users.findOne({ _id: props.post.user._id });
    }

    return {
        currentUser,
        user,
        ready: !!currentUser && user !== null,
    };
}, Post);
