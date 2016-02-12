Navbar = React.createClass({
    getInitialState(){
        return {
            searchText:''
        };
    },
    mixins: [ReactMeteorData],
    getMeteorData(){
        let data = {};
        data.currentUser = Meteor.user();
        return data;
    },
    componentDidMount(){
        var users = Meteor.users.find({},{fields:{'profile':1}}).fetch();
        var usernames = [];
        users.map(function(user){
            usernames.push(user.profile.fullname);
        });
        $('#typeahead').typeahead({
            name: 'users',
            local: usernames
        });
    },
    handleSubmit(e){
        e.preventDefault();
        FlowRouter.go('/user/' + (this.refs.searchText.value).trim());
    },
    render(){
        var fullname = '';
        if(this.data.currentUser && this.data.currentUser.profile){
            fullname = this.data.currentUser.profile.firstname + ' ' + this.data.currentUser.profile.lastname;
        }
        return (
        <div className="navbar navbar-blue navbar-fixed-top">
            <div className="navbar-header">
                <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a href="/dashboard" className="navbar-brand logo"><i className="fa fa-facebook"></i></a>
            </div>
            <nav className="collapse navbar-collapse" role="navigation">
                <form onSubmit={this.handleSubmit}  className="navbar-form navbar-left">
                    <div className="input-group input-group-sm bs-example">
                        <input ref="searchText" type="text" className="form-control tt-query" id="typeahead" />
                        <div className="input-group-btn searchBtn">
                            <button className="btn btn-default" type="submit"><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                </form>
                <ul className="nav navbar-nav">
                    <li>
                        <a href="/dashboard"><i className="fa fa-home"></i> News Feed</a>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-user"></i> {fullname}</a>
                        <ul className="dropdown-menu">
                            <li><a href="/profile">Edit Profile</a></li>
                            <li><a href="/signout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

        )
    }
});