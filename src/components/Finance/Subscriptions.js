import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RoundBorderBox, TinyPadding, H1Preview, HrPreview } from '../../style/common';
import { numberWithCommas } from './Common';

export const Subscriptions = props => {
    const subscriptions = props.subscriptions;
  
    if (subscriptions) {
      return (
        <React.Fragment>
          <RoundBorderBox>
            <TinyPadding>
              <H1Preview className="text-left">Subscriptions</H1Preview>
              {
                subscriptions.map(subscription => {
                  return (
                    <SubscriptionPreview key={subscription.name} subscription={subscription} />
                  );
                })
              }
            </TinyPadding>
          </RoundBorderBox>
        </React.Fragment>
      )
    }
    return null;
  }
  export const SubscriptionPreview = props => {
    const subscription = props.subscription;
  
    if (subscription) {
      return (
        <TinyPadding style={{marginBottom: "2rem"}}>
          <Row>
            <Col>
              <b>Name</b>: {subscription.name}
              <HrPreview />
            </Col>
            <Col>
              <b>Amount</b>: ${numberWithCommas(subscription.amount)}
              <HrPreview />
            </Col>
          </Row>
          <Row>
            <Col><b>Frequency</b>:</Col>
            <Col>{subscription.paymentFrequencyName}</Col>
          </Row>
          <Row>
            <Col><b>Description</b>:</Col>
            <Col>{subscription.description}</Col>
          </Row>
        </TinyPadding>
      );
    }
}
