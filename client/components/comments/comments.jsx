CommentsList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let data = {};
        data.comments = [];
        var commenthandle = Meteor.subscribe('comments',this.props.post._id );
        if(commenthandle.ready()){
            data.comments = Comments.find({post:this.props.post._id}).fetch();
        }
        return data;
    },
    addMessage(e){
        e.preventDefault();
        var comment = ReactDOM.findDOMNode(this.refs.comment).value.trim();
        var post = this.props.post;
        if (comment !== '') {
            Meteor.call('addComment', comment, post);
            ReactDOM.findDOMNode(this.refs.comment).value = '';
        }
    },
    render(){
        var rows = this.data.comments.map(function(comment){
            var timesince = moment(comment.createdOn ).fromNow();
            return (
                <li id={comment._id} className="comment">
                    <a className="pull-left" href="#">
                        <Avatar klass="small" user={comment.user}/>
                    </a>
                    <div className="comment-body">
                        <div className="comment-heading">
                            <h4 className="user"><Fullname user={comment.user}/></h4>
                            <h5 className="time">{timesince}</h5>
                        </div>
                        <p>{comment.message} &nbsp;</p>
                    </div>
                </li>
            )
        });
        return (
        <div>
            <div className="input-group">
                <input ref="comment" className="form-control" placeholder="Add a comment" type="text"/>
                    <span className="input-group-addon">
                        <i onClick={this.addMessage} className="fa fa-edit"></i>
                    </span>
            </div>
            <ul className="comments-list">
                {rows}
            </ul>
        </div>

        )
    }
});
