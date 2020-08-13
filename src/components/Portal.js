import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
            <Container fluid>
                <Row>
                    <Col>
                        This is where the Assets will be
                    </Col>
                    <Col>
                        This is where the Liabilities will be
                    </Col>
                    <Col>
                        This is where the Goals will be
                    </Col>
                </Row>
            </Container>
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