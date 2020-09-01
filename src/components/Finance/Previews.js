import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { HrPreview, H1AssetPreview, H1LiabilityPreview, RoundBorderBox, TinyPadding } from '../../style/common';
import { numberWithCommas, formatDate } from './Common';
import AssetEditor from './AssetEditor';


export const AssetsPreview = props => {
  const assets = props.assets;

  if (assets) {
    return (
      <React.Fragment>
        <RoundBorderBox>
          <TinyPadding>
            <H1AssetPreview className="text-left">Assets</H1AssetPreview>
            {
              assets.map(asset => {
                return (
                  <AssetPreview key={asset.publicKey} asset={asset} />
                );
              })
            }
          </TinyPadding>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Add asset
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <AssetEditor />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </RoundBorderBox>
      </React.Fragment>
    )
  }
  return null;
}
export const AssetPreview = props => {
  const asset = props.asset;

  if (asset) {
    return (
      <TinyPadding>
        <Row>
          <Col>
            <b>Name</b>: {asset.name}
            <HrPreview />
          </Col>
          <Col>
            <b>Type</b>: {asset.typeName}
            <HrPreview />
          </Col>
          <Col>
            <b>Value</b>: ${numberWithCommas(asset.value)}
            <HrPreview />
          </Col>
        </Row>
      </TinyPadding>
    );
  }
  return null;
}


export const LiabilitiesPreview = props => {
  const liabilities = props.liabilities;

  if (liabilities) {
    return (
      <React.Fragment>
        <RoundBorderBox>
          <TinyPadding>
            <H1LiabilityPreview className="text-left">Liabilities</H1LiabilityPreview>
            {
              liabilities.map(liability => {
                return (
                  <LiabilityPreview key={liability.name} liability={liability} />
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
export const LiabilityPreview = props => {
  const liability = props.liability;

  if (liability) {
    return (
      <TinyPadding>
        <Row>
          <Col>
            <b>Name</b>: {liability.name}
            <HrPreview />
          </Col>
          <Col>
            <b>Type</b>: {liability.typeName}
            <HrPreview />
          </Col>
          <Col>
            <b>Value</b>: ${numberWithCommas(liability.value)}
            <HrPreview />
          </Col>
        </Row>
      </TinyPadding>
    );
  }
  return null;
}


export const GoalsPreview = props => {
  const goals = props.goals;

  if (goals) {
    return (
      <React.Fragment>
        <RoundBorderBox>
          <TinyPadding>
            <H1AssetPreview className="text-left">Goals</H1AssetPreview>
            {
              goals.map(goal => {
                return (
                  <GoalPreview key={goal.name} goal={goal} />
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
export const GoalPreview = props => {
  const goal = props.goal;

  if (goal) {
    return (
      <TinyPadding style={{ marginBottom: "2rem" }}>
        <Row>
          <Col>
            <b>Name</b>: {goal.name}
            <HrPreview />
          </Col>
          <Col>
            <b>Amount</b>: ${numberWithCommas(goal.amount)}
            <HrPreview />
          </Col>
        </Row>

        <Row>
          <Col><b>Type</b>: </Col>
          <Col>{goal.typeName}</Col>
        </Row>

        <Row>
          <Col><b>Current Amount</b>: </Col>
          <Col>${numberWithCommas(goal.currentAmount)}</Col>
        </Row>

        <Row>
          <Col><b>Contribution</b>: </Col>
          <Col>${numberWithCommas(goal.contribution)}</Col>
        </Row>

        <Row>
          <Col><b>Frequency</b>: </Col>
          <Col>{goal.contributionFrequencyName}</Col>
        </Row>

        <Row>
          <Col><b>Planned Date</b>: </Col>
          <Col>{formatDate(goal.plannedDate)}</Col>
        </Row>
      </TinyPadding>
    );
  }
  return null;
}
