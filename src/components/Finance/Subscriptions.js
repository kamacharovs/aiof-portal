import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { RoundGrayBorderBox, MutedP } from '../../style/common';

class Subscriptions extends React.Component {
    render() {
        if (this.props.subscriptions) {
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
                                        <h3>Name</h3>
                                        <p class="text-muted">Description</p>
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
}

export default Subscriptions;