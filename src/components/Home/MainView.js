import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accounts from './Accounts';
import { ContainerAiof } from '../../style/common';
import { CalculatorCard } from '../Common/Calculator';

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
        <Col>
          <CalculatorCard text={"mortgage and then some how far can it extend"} />
        </Col>
      </Row>
    </ContainerAiof>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
