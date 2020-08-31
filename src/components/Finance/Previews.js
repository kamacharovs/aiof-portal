import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { HrPreview, H1AssetPreview, H1LiabilityPreview, RoundBorderBox, TinyPadding } from '../../style/common';
import { numberWithCommas } from './Common';


export const AssetsPreview = props => {
  const assets = props.assets;

  if (assets) {
    return (
      <React.Fragment>
        <RoundBorderBox>
          <TinyPadding>
            <H1AssetPreview className="text-left">Assets</H1AssetPreview>
            {
              props.assets.map(asset => {
                return (
                  <AssetPreview key={asset.name} asset={asset} />
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
export const AssetPreview = props => {
  const asset = props.asset;

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

export const LiabilitiesPreview = props => {
  const liabilities = props.liabilities;

  if (liabilities) {
    return (
      <React.Fragment>
        <RoundBorderBox>
          <TinyPadding>
            <H1LiabilityPreview className="text-left">Liabilities</H1LiabilityPreview>
            {
              props.liabilities.map(liability => {
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

export const GoalPreview = props => {
  const goal = props.goal;

  return (
    <RoundBorderBox>
      <TinyPadding>
        <p>
          <b>{goal.name}</b><br />
        </p>
        <p className="text-muted">
          <i>type: </i>{goal.typeName} <br />
          <i>amount: </i>${goal.amount} <br />
          <i>current amount: </i>${goal.currentAmount} <br />
          <i>contribution: </i>${goal.contribution} <br />
          <i>contribution frequency: </i>{goal.contributionFrequencyName} <br />
          <i>planned date: </i>{goal.plannedDate}
        </p>
      </TinyPadding>
    </RoundBorderBox>
  );
}
