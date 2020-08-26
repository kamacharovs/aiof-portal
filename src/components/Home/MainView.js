import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Accounts from './Accounts';
import Charts from './Charts';

const mapStateToProps = state => ({
  ...state.finance,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
});

const MainView = props => {
  return (
    <Container>
      <Row>
        <Col sm="4">
          <Accounts
            token={props.token} />
        </Col>
        <Col sm="8">
          <Charts />
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
