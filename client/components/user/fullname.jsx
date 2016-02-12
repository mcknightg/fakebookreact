Fullname = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var userhandle = Meteor.subscribe('userlist',this.props.user);
        var data = {};
        if(userhandle.ready()){
            data.usr = Meteor.users.findOne({_id:this.props.user});
        }
        return data;
    },
    render(){
        var fullname='';
        var personlink = '';
        if(this.data.usr){

            fullname= this.data.usr.profile.firstname + " " + this.data.usr.profile.lastname;
            personlink = '/user/' + (this.data.usr.profile.firstname + this.data.usr.profile.lastname).toLowerCase();
        }
        return (
            <a className={this.props.klass} href={personlink}>{fullname}</a>
        )
    }
});