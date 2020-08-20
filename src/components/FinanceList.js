import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AssetPreview from './FinancePreview';

const FinanceList = props => {
    if (!props.assets
      || !props.goals
      || !props.liabilities) {
      return null;
    }

    if (props.assets.length === 0) {
      return (
        <div className="article-preview">
          No assets... yet.
        </div>
      );
    }
    if (props.goals.length === 0) {
      return (
        <div className="article-preview">
          No goals... yet.
        </div>
      );
    }
    if (props.liabilities.length === 0) {
      return (
        <div className="article-preview">
          No liabilities... yet.
        </div>
      );
    }

    return (
      <Container fluid>
        <Row>
          <Col>
            <h5>Assets</h5>
            {
              props.assets.map(asset => {
                return (
                  <AssetPreview asset={asset} />
                );
              })
            }
          </Col>
          <Col>
            <h5>Liabilities</h5>
          </Col>
          <Col>
            <h5>Goals</h5>
          </Col>
        </Row>
      </Container>
    );
};

export default FinanceList;
