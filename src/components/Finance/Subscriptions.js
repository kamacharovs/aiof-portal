import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RoundGrayBorderBox, MutedH2, CoolLink } from '../../style/common';

class Subscriptions extends React.Component {
    render() {
        if (this.props.subscriptions) {
            return (
                <React.Fragment>
                    <Container>
                            {
                                this.props.subscriptions.map(subscription => {
                                    return (
                                        <Row>
                                        <RoundGrayBorderBox>
                                            <Row>
                                                <Col>
                                                    <h5>{subscription.name}</h5>
                                                </Col>
                                                <Col>
                                                    <p className="text-muted">$99</p>
                                                </Col>
                                                
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col>
                                                Name
                                                </Col>
                                                <Col>
                                                {subscription.name}
                                                </Col>
                                            </Row>
                                            <Row>

                                            </Row>
                                        </RoundGrayBorderBox>
                                        </Row>
                                    );
                                })
                            }
                    </Container>
                </React.Fragment>
            )
        }
        return <h2>Subscriptions</h2>;
    }
}

export default Subscriptions;