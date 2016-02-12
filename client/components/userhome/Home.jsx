Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let data = {};
        var userhandle = Meteor.subscribe('userlist');
        if(userhandle.ready()){
            data.currentUser = Meteor.user();
            data.homeUser = Meteor.users.findOne({'profile.fullname':this.props.fullname});
        }

        return data;
    },
    getInitialState(){
        return {
            username: FlowRouter.getParam("fullname"),
            status:'',
            message:'row hide'
        }
    },
    sendMessage(e){
        e.preventDefault();
        var subject = ReactDOM.findDOMNode(this.refs.subject).value;
        var message = ReactDOM.findDOMNode(this.refs.message).value;
        Meteor.call('sendMessage',this.data.homeUser._id,subject,message);
        this.setState({message:'row hide',status:'Message Sent'});
    },
    showSendMessage(){
        var message = 'row';
        if(this.state.message.indexOf('hide')=== -1){
            message = 'row hide';
        }
        this.setState({message:message,status:''});
    },
    askFriend(){
        if(this.data.homeUser._id !== Meteor.userId() && this.data.homeUser.profile.friends.indexOf(Meteor.userId()) === -1){
            var msg = this.data.homeUser.profile.firstname + ' ' + this.data.homeUser.profile.lastname + ' wants to be your friend.';
            Meteor.call('sendMessage',this.data.homeUser._id,'Please Confirm',msg);
            this.setState({status:'Friendship Requested'});
        } else{
            this.setState({status:'You are already friends ;)'});
        }

    },
    render(){
        return (
            <div>
                <messageForm/>
                <div className="col-md-9">
                    <div className="panel panel-default">
                        <div className="panel-heading">

                            <h2><Avatar user={this.data.homeUser && this.data.homeUser._id}/></h2>
                        </div>
                        <div className="panel-body">
                            <h2>{this.data.homeUser && this.data.homeUser.profile.firstname} {this.data.homeUser && this.data.homeUser.profile.lastname}</h2>
                            <hr/>
                            <button onClick={this.askFriend} className="btn btn-lg btn-success space">Request Friend</button>
                            <button onClick={this.showSendMessage}  type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Send a Message</button>
                        </div>
                        <h3>{this.state.status}</h3>
                    </div>
                    <div className={this.state.message}>
                        <div className="col-md-8">
                            <div className="well well-sm">
                                <form id="messageForm">
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    To:</label>
                                                <div className="input-group">
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-envelope"></span>
                                        </span>
                                                    <input readOnly type="to" id="to" name="to" className="form-control" placeholder="Send Message To"  value={this.data.homeUser && this.data.homeUser.profile.firstname + " " + this.data.homeUser.profile.lastname}/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="subject">
                                                        Subject</label>
                                                    <input type="text" ref="subject" id="subject" name="subject" className="form-control" placeholder="Subject" required="required" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">
                                                        Message</label>
                                                    <textarea ref="message" name="message" id="message" className="form-control" rows="9" cols="25" required="required" placeholder="Message"></textarea>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-12">


                                            <div className="control-group">
                                                <label className="control-label" for="button1id"></label>
                                                <div className="controls">
                                                    <button onClick={this.sendMessage} id="button1id" name="button1id" className="btn btn-success space">Send</button>
                                                    <button id="button2id" name="button2id" className="btn btn-danger space">Clear</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>


                </div>
            </div>

        )
    }
});