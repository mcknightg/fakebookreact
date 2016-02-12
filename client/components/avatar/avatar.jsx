Avatar = React.createClass({
    getInitialState(){
        let state = {};
        state.avatar = 'http://placehold.it/60x60';
        return state;
    },
    mixins: [ReactMeteorData],
    getMeteorData(){
        var userhandle = Meteor.subscribe('userlist',this.props.user);
        var imagehandle = Meteor.subscribe('imagelist',this.props.user);
        var data = {};
        if(userhandle.ready() && imagehandle.ready()){
            data.usr = Meteor.users.findOne({_id:this.props.user});
            data.img = Images.findOne({_id:data.usr.profile.avatar});
        }
        return data;
    },
    render(){
        var avatar = this.state.avatar;


        if(this.data.img){
            avatar = this.data.img.url();
        }
        return (
            <img className={this.props.klass} src={avatar} alt="Image"/>
        )
    }
});