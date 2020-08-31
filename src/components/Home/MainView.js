import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Accounts from './Accounts';
import { ContainerAiof } from '../../style/common';

const mapStateToProps = state => ({
  ...state.home,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
});

const MainView = props => {
  return (
    <ContainerAiof>
      <Row>
        <Col sm="4">
          <Accounts
            token={props.token} />
        </Col>
      </Row>
    </ContainerAiof>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
