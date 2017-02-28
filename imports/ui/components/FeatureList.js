import React, { Component } from 'react';

class FeatureList extends Component {
    getFeatures() {
        const features = [
            { _id: '1', icon: 'fa fa-imageId fa-2x', bigtext: 'See fotos and updates', littletext: 'from friends in News Feed' },
            { _id: '2', icon: 'fa fa-share fa-2x', bigtext: 'Share what\'s new', littletext: 'in your life on your timeline' },
            { _id: '3', icon: 'fa fa-search fa-2x', bigtext: 'Find more', littletext: 'of what you\'re looking for with Fakebook search' },
        ];

        return features.map((feature) => {
            return (
                <li key={feature._id}>
                    <h3 className="btn btn-lg">
                        <i className={feature.icon} />
                        <span>
                            <strong> {feature.bigtext}</strong>
                            <small> {feature.littletext}</small>
                        </span>
                    </h3>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <h2 className="col-md-11 featurelist hidden-xs">
                    Connect with friends and the world around you on Fakebook
                </h2>
                <ul className="ds-btn hidden-xs">
                    {this.getFeatures()}
                </ul>
            </div>
        );
    }
}

export default FeatureList;

