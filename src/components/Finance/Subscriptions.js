import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { RoundGrayBorderBox, MutedH2, CoolLink } from '../../style/common';

const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: { username: "gkama" }, //state.common.currentUser,
    subscriptions: state.currentUser.subscriptions,
});

const mapDispatchToProps = dispatch => ({
});

class Subscriptions extends React.Component {
    render() {
        if (this.props.subscriptions) {
            return (
                <React.Fragment>
                    <Helmet>
                        <title>{this.props.appName} | Subscriptions</title>
                    </Helmet>
                    <Container>
                        <Row>
                            <Col sm="2">
                                <Row>
                                    <Col sm="2">
                                        <MutedH2>Finance</MutedH2>
                                        <hr />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="2">
                                        <nav className="navbar" style={{ padding: "0" }}>
                                            <ul className="navbar-nav">
                                                <li className="nav-item">
                                                    <CoolLink to={`/@${this.props.currentUser.username}/finance/subscriptions`}>Subscriptions</CoolLink>
                                                </li>
                                                <li className="nav-item">
                                                    <CoolLink to="/">Link 2</CoolLink>
                                                </li>
                                                <li className="nav-item">
                                                    <CoolLink to="/">Link 3</CoolLink>
                                                </li>
                                            </ul>
                                        </nav>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="10">
                                <Row>
                                    {
                                        this.props.subscriptions.map(subscription => {
                                            return (
                                                <RoundGrayBorderBox>
                                                    <Row>
                                                        <Col>
                                                            <h2>{subscription.name}</h2>
                                                        </Col>
                                                        <Col>
                                                            <p class="text-muted">$99</p>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <h3>Name</h3>
                                                    <p class="text-muted">Description</p>
                                                </RoundGrayBorderBox>
                                            );
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            )
        }
        return <h2>Subscriptions</h2>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);