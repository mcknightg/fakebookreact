Ad = React.createClass({
    render(){
        var adImage = this.props.ad.image ? <p><img src={this.props.ad.image} className="img img-responsive"/></p> : '';
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel panel-header">
                        <h4>&nbsp;{this.props.ad.title}</h4>
                    </div>
                    <div className="panel-body">
                        {adImage}
                        <div className="clearfix"></div>
                        <hr/>
                        {this.props.ad.text}
                    </div>
                </div>

            </div>

        )
    }
});