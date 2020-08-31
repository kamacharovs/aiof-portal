import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCog } from "react-icons/fa";
import { USER_FINANCE } from '../../constants/actionTypes';
import { CoolLink } from '../../style/common';

const mapStateToProps = state => ({
  ...state.home,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onFinanceTabClick: (tab, pager, payload) => dispatch({ type: USER_FINANCE, tab, pager, payload }),
});

const Cash = props => {
  return (
    <Container>
      <Row>
        <Col className="text-left"><h6>Cash</h6></Col>
        <Col className="text-right"><h6>$0.00</h6></Col>
      </Row>
      <Row>
        <Col sm="10">
          <nav className="navbar" style={{ padding: "0" }}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <CoolLink to="/">Link 1</CoolLink>
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
        <Col sm="2">
        </Col>
      </Row>
    </Container>
  );
}

const CreditCards = props => {
  return (
    <Container>
      <Row>
        <Col className="text-left"><h6>Credit Cards</h6></Col>
        <Col className="text-right"><h6>$0.00</h6></Col>
      </Row>
      <Row>
        <Col sm="10">
          <nav className="navbar" style={{ padding: "0" }}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <CoolLink to="/">Link 1</CoolLink>
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
        <Col sm="2">
        </Col>
      </Row>
    </Container>
  );
}

const Investments = props => {
  return (
    <Container>
      <Row>
        <Col className="text-left"><h6>Investments</h6></Col>
        <Col className="text-right"><h6>$0.00</h6></Col>
      </Row>
      <Row>
        <Col sm="10">
          <nav className="navbar" style={{ padding: "0" }}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <CoolLink to="/">Link 1</CoolLink>
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
        <Col sm="2">
        </Col>
      </Row>
    </Container>
  );
}

class Accounts extends React.Component {
  render() {
    if (!this.props.token
      || this.props.token === 'undefined') {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col className="text-left">Accounts</Col>
          <Col className="text-right"><a href="#"><FaCog size={30} style={{ fill: "gray" }} /></a></Col>
        </Row>
        <hr />
        <Cash />
        <hr />
        <CreditCards />
        <hr />
        <Investments />
      </Container>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
