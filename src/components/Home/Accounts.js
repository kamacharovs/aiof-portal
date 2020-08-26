import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCog } from "react-icons/fa";
import { connect } from 'react-redux';
import { USER_FINANCE } from '../../constants/actionTypes';

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
        <Col><h6>Cash</h6></Col>
        <Col><h6>$0.00</h6></Col>
      </Row>
      <Row>
        <Col>Account 1</Col>
      </Row>
      <Row>
        <Col>Account 2</Col>
      </Row>
      <Row>
        <Col>Account 3</Col>
      </Row>
    </Container>
  );
}

const CreditCards = props => {
  return (
    <Container>
      <Row>
        <Col><h6>Credit Cards</h6></Col>
        <Col><h6>$0.00</h6></Col>
      </Row>
      <Row>
        <Col>Account 1</Col>
      </Row>
      <Row>
        <Col>Account 2</Col>
      </Row>
    </Container>
  );
}

const Investments = props => {
  return (
    <Container>
      <Row>
        <Col><h6>Investments</h6></Col>
        <Col><h6>$0.00</h6></Col>
      </Row>
      <Row>
        <Col>Account 1</Col>
      </Row>
      <Row>
        <Col>Account 2</Col>
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
        <Col sm="6" className="text-sm-left">Accounts</Col>
        <Col sm="6" className="text-sm-right"><a href="#"><FaCog size={30} style={{ fill: "gray" }} /></a></Col>
        </Row>
        <hr/>
        <Cash />
        <hr/>
        <CreditCards />
        <hr/>
        <Investments />
      </Container>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
