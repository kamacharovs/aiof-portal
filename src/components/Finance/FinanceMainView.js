import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { FINANCE_PAGE_LOADED, FINANCE_PAGE_UNLOADED } from '../../constants/actionTypes';
import { ContainerAiof, CoolLink, MutedH2 } from '../../style/common';

const mapStateToProps = state => ({
  ...state.finance,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  finance: state.finance,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: FINANCE_PAGE_LOADED, payload }),
});

class FinanceMainView extends React.Component {
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.onLoad(Promise.all([
        agent.UserProfile.get(this.props.currentUser.username)
      ]));
    }
  }

  componentWillUnmount() {
  }

  render() {
    const subscriptions = this.props.finance.subscriptions;

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Finance</title>
        </Helmet>
        <Container>
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
        </Container>
      </React.Fragment>
    );
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(FinanceMainView);