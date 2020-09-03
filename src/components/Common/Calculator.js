import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Calculator from '../../style/icons/Calculator.svg';

const StyledCalculatorCard = styled(Card)`
  display: inline-block;
  text-align: center;
  max-width: 250px;
`;
const StyledCalculatorCardHeader = styled(Card.Header)`
  background: none;
`;

export const CalculatorCard = props => {
    const title = props.title ? props.title : "Calculator";
    const text = props.text ? props.text : "";
    const footer = props.footer ? props.footer : "";

    return (
        <StyledCalculatorCard>
            <StyledCalculatorCardHeader>
                {title}
            </StyledCalculatorCardHeader>
            <Card.Body>
                <Card.Title>
                    <img src={Calculator} alt="Calculator" style={{width: "100px", height: "100px"}} />
                </Card.Title>
                <Card.Text>
                    Calculate your {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {footer}
            </Card.Footer>
        </StyledCalculatorCard>
    );
}