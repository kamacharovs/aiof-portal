import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Accounts from './Accounts';
import { connect } from 'react-redux';
import { USER_FINANCE } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.finance,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onFinanceTabClick: (tab, pager, payload) => dispatch({ type: USER_FINANCE, tab, pager, payload }),
});

const MainView = props => {
  return (
    <Container>
      <Row>
        <Col sm="4">
          <Accounts
            token={props.token} />
        </Col>

      </Row>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
