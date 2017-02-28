import React, { Component } from 'react';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import FeatureList from '../components/FeatureList';

class HomeLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <FeatureList />
                        </div>
                        <div className="col-md-5 col-md-offset-1">
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeLayout;
