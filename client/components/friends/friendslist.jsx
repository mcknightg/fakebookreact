FriendsList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let data = {};
        var userhandle = Meteor.subscribe("userlist");
        if(userhandle.ready()){
            data.currentUser = Meteor.user();
        }
        return data;
    },
    render(){
        var rows = this.data.currentUser && this.data.currentUser.profile.friends.length > 0 ? this.data.currentUser.profile.friends.map(function (userfriend) {
            var friend = Meteor.users.findOne({_id:userfriend});
            if(friend)
                var fullname = (friend.profile.firstname + friend.profile.lastname).toLowerCase();
                var link = '/user/' + fullname;
                return (
                <div key={userfriend._id} className="space well col-md-3">
                    <Avatar user={friend._id}/>
                    &nbsp;<Fullname user={friend._id}/>
                </div>
                )
        }):[<a href="#"><i className="fa fa-list-alt fa-2x top50"></i> No Friends</a>];
        return (
            <div className="container ">
                {rows}
            </div>
        )
    }
});
