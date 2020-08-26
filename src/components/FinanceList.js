import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AssetPreview, LiabilityPreview, GoalPreview } from './FinancePreview';
import { AssetLiabilityChart } from './Finance/Charts';

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
    <Container>
      <Row>
        <AssetLiabilityChart
          assets={props.assets}
          liabilities={props.liabilities} />
      </Row>
      <Row>
        <Col>
          <h5>Assets</h5>
          {
            props.assets.map(asset => {
              return (
                <AssetPreview key={asset.name} asset={asset} />
              );
            })
          }
        </Col>
        <Col>
          <h5>Liabilities</h5>
          {
            props.liabilities.map(liability => {
              return (
                <LiabilityPreview key={liability.name} liability={liability} />
              );
            })
          }
        </Col>
        <Col>
          <h5>Goals</h5>
          {
            props.goals.map(goal => {
              return (
                <GoalPreview key={goal.name} goal={goal} />
              );
            })
          }
        </Col>
      </Row>
    </Container>
  );
};

export default FinanceList;
