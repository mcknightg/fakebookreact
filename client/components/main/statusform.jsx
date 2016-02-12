Statusform = React.createClass({
    mixins:[ReactMeteorData],
    getMeteorData(){
           let data = {};
        return data;
    },
    getInitialState(){
        return {
            image:'',
            filename:''
        }
    },
    resetFields(){
        ReactDOM.findDOMNode(this.refs.sharing).value = "";
        ReactDOM.findDOMNode(this.refs.sharing).focus();
    },
    submitForm(e){
        e.preventDefault();
        var that = this;
        var message = this.refs.sharing.value;
        var imageurl = this.refs.imagepath.value;
            Meteor.call('Posts.insert',message,imageurl,function(err){
                if(err){
                    console.log(err);
                }
            });
            this.setState({filename:''});
            this.resetFields();


    },
    uploadFile(e){
        e.preventDefault();
        var that = this;
        FS.Utility.eachFile(e, function(file) {
            Images.insert(file, function (err, fileObj) {
                that.setState({filename:fileObj.data.blob.name,imageurl:'/cfs/files/images/' + fileObj._id + '/' + fileObj.data.blob.name});
            });
        });

    },
    render(){

        return (
            <div className="panel panel-default">
                <div className="panel-content">
                    <div className="panel-heading">
                        Update Status
                    </div>
                    <form onSubmit={this.submitForm} className="form center-block">
                        <input type="hidden" ref="imagepath" value={this.state.imageurl}/>
                        <div className="panel-body">
                            <div className="form-group">
                                <textarea ref="sharing" className="form-control input-lg"
                                          autofocus=""
                                          placeholder="What do you want to share?"></textarea>
                            </div>
                            <h3>{this.state.filename||''}</h3>
                        </div>
                        <div className="panel-footer">
                            <div>
                                <ul className="pull-left list-inline">
                                    <li><input onChange={this.uploadFile} ref="file" className='filepicker' id="file" type="file"/></li>
                                </ul>
                                <button type="submit" className="btn btn-primary btn-sm postbutton">Post</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
});
