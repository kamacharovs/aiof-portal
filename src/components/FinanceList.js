import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AssetPreview, LiabilityPreview, GoalPreview } from './FinancePreview';
import { AssetLiabilityChart } from './Finance/Charts';
import { AssetTable, LiabilitiesTable, GoalsTable } from './Finance/Tables';

const FinanceList = props => {
  if (!props.assets
    || !props.goals
    || !props.liabilities) {
    return null;
  }
  return (
    <Container>
      <Row>
        <AssetLiabilityChart
          assets={props.assets}
          liabilities={props.liabilities} />
      </Row>
      <hr/>
      <Row>
        <Col sm="6">
          <h5>Assets</h5>
          {
            props.assets.map(asset => {
              return (
                <AssetPreview key={asset.name} asset={asset} />
              );
            })
          }
        </Col>
        <Col sm="6">
          <h5>Liabilities</h5>
          {
            props.liabilities.map(liability => {
              return (
                <LiabilityPreview key={liability.name} liability={liability} />
              );
            })
          }
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col sm="6">
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
      <hr/>
      <Row>
        <AssetTable assets={props.assets} />
      </Row>
      <Row>
        <LiabilitiesTable liabilities={props.liabilities} />
      </Row>
      <Row>
        <GoalsTable goals={props.goals} />
      </Row>
    </Container>
  );
};

export default FinanceList;
