import React, { Component } from 'react';
import { getUser } from "../actions/user";
import { connect } from 'react-redux';
import './Portal.css';

class Portal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }

    render() {
        return (
            <div>
                <h2>This is the portal page. what happens here</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.user.username,
        user: state.user.user,
        isLoggedIn: state.user.isLoggedIn
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getUser: (username, password) => {
            dispatch(getUser(username, password));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal);