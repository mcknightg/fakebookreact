Main = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        let data = {};
        data.posts = [];
        data.ads = [];
        var friends = Meteor.user() ? Meteor.user().profile.friends : [];
        friends.push(Meteor.user() ? Meteor.user()._id :'');
        var posthandle = Meteor.subscribe('postlist', friends,this.state.limit);
        var adhandle = Meteor.subscribe('adlist');
        if(posthandle.ready()){
            data.posts = Posts.find({},{sort:{createdAt:-1}}).fetch();
        }
        if(adhandle.ready()){
            data.ads = DBAds.find({},{}).fetch();
        }

        return data;
    },
    getInitialState(){
        return {
            limit:3
        }
    },
    addMore:function(){
        this.setState({limit:this.state.limit + 3});
    },

    render(){
        var posts = this.data.posts.map(function (record) {
            return <Post key={record._id} post={record}/>
        });
        var ads = this.data.ads.map(function(ad){
            return <Ad key={ad._id} ad={ad}/>
        });
        return (
            <div className="col-sm-10 col-xs-11" id="main">
                <div>
                    <div className="full col-sm-9">
                        <div className="row">
                            <div className="col-sm-9">
                                <Statusform/>
                                {posts}
                                <button onClick={this.addMore}
                                        className="btn btn-lg">More</button>13
                            </div>
                            <div className="col-sm-3">
                                {ads}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});