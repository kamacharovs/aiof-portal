import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AssetPreview from './FinancePreview';

const FinanceList = props => {
  if (props.token) {
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
            <h2>Assets</h2>
            {
              props.assets.map(asset => {
                return (
                  <AssetPreview asset={asset} />
                );
              })
            }
          </Col>
          <Col>
            <h2>Liabilities</h2>
          </Col>
          <Col>
            <h2>Goals</h2>
          </Col>
        </Row>
      </Container>
    );
  }

  return null;
};

export default FinanceList;
