import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { RoundGrayBorderBox, MutedP } from '../../style/common';

export const Subscriptions = props => {
    if (props.subscriptions) {
        return (
            <Container>
                <Row>
                    {
                        props.subscriptions.map(subscription => {
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
                                </RoundGrayBorderBox>
                            );
                        })
                    }
                </Row>
            </Container>
        )
    }
    return null;
}