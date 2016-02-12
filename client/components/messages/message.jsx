Messages = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let data = {};
        var messagehandle = Meteor.subscribe('messageList');
            data.currentUser = Meteor.user();
            data.messages = DBMessage.find({$or:[{'to._id':Meteor.userId()},{'fromuser':Meteor.userId()}]},{sort:{createdOn:-1}}).fetch();

        return data;
    },
    removeMessage(e){
        e.preventDefault();
        console.log(e.target);
        Meteor.call('removeMessage',e.target.id);
    },
    render(){

        var rows = this.data.messages.map(function (message) {
            var msgfrom = Meteor.users.findOne({_id:message.fromuser});
            var timesince = moment(message.createdOn ).fromNow();
            var klass='primary-font text-muted';
            if(message.fromuser === Meteor.userId()){
                klass = 'primary-font green  text-muted';
            }
            var address = <strong className={klass}>{msgfrom && msgfrom.profile.firstname} {msgfrom && msgfrom.profile.lastname}{message.fromuser === Meteor.userId()? ' -> ' + message.to.profile.firstname + ' ' + message.to.profile.lastname:'' }</strong>
            return (
            <li key={message._id} className="left clearfix"><span className="chat-img pull-left">
                           <Avatar key={message._id} user={msgfrom._id} klass="img-circle"/>
                        </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        {address} <small className="pull-right text-muted">
                        <span className="fa fa-time"></span>{timesince} <span id={message._id} onClick={this.removeMessage} className="fa fa-trash"></span></small>
                    </div>
                    <p>
                        <strong>{message.title}</strong><br/>
                        {message.message}
                    </p>
                </div>
            </li>

            )
        });
        if(this.data.messages.length === 0){
            rows = <a href="#"><i className="fa fa-list-alt fa-2x"></i> No Messages</a>
        }
        return (
            <div className="column col-sm-7 col-xs-1 sidebar-offcanvas" id="sidebar">

                <ul className="nav">
                    <li><a href="#" data-toggle="offcanvas" className="visible-xs text-center"><i
                        className="fa fa-list-alt"></i></a></li>
                </ul>
                <ul className="nav hidden-xs push-down-50" id="lg-menu">
                    {rows}
                </ul>
            </div>
        )
    }
});
