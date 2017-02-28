import React, { Component, PropTypes } from 'react';
import NavBar from '../components/NavBar';

class Layout extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="box">
                    <div className="srow row-offcanvas row-offcanvas-left push-down-50">
                        <NavBar />
                        {this.props.sidebar}
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    sidebar: PropTypes.object,
    content: PropTypes.object,
};

export default Layout;
