import React, { Component, PropTypes } from 'react';

class Ad extends Component {
    render() {
        const adImage = this.props.ad.imageId ? <p><img src={this.props.ad.imageId} alt="image" /></p> : '';

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel panel-header">
                        <h4>{this.props.ad.title}</h4>
                    </div>
                    <div className="panel-body">
                        {adImage}
                        <div className="clearfix"></div>
                        <hr />
                        {this.props.ad.text}
                    </div>
                </div>
            </div>
        );
    }
}

Ad.propTypes = {
    ad: PropTypes.object.isRequired,
};

export default Ad;
