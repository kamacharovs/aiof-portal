import React from 'react';
import Card from 'react-bootstrap/Card'
import { RoundBorderBox, TinyPadding } from '../style/common';

export const AssetPreview = props => {
  const asset = props.asset;

  return (
    <RoundBorderBox>
      <TinyPadding>
        <h3>{asset.name}</h3>
        <h5><b>{asset.typeName}</b></h5>
        <p className="text-muted"><b>${asset.value}</b></p>
      </TinyPadding>  
    </RoundBorderBox> 
  );
}

export const LiabilityPreview = props => {
  const liability = props.liability;

  return (
    <RoundBorderBox>
      <TinyPadding>
        <h5><b>{liability.typeName}</b></h5>
        <p className="text-muted"><b>${liability.value}</b></p>
      </TinyPadding>
    </RoundBorderBox>   
  );
}

export const GoalPreview = props => {
  const goal = props.goal;

  return (
    <Card style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{goal.name}</Card.Title>
        <Card.Text>
          Type: <b>{goal.typeName}</b> <br/>
          Amount: <b>${goal.amount}</b> <br/>
          Current amount: <b>${goal.currentAmount}</b> <br/>
          Contribution: <b>${goal.contribution}</b> <br/>
          Contribution frequency: <b>{goal.contributionFrequencyName}</b> <br/>
          Planned date: <b>{goal.plannedDate}</b> <br/>
        </Card.Text>  
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Footer>
    </Card>
  );
}
