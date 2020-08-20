import React from 'react';
import Card from 'react-bootstrap/Card'

export const AssetPreview = props => {
  const asset = props.asset;

  return (
    <Card key={asset.name} style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{asset.name}</Card.Title>
        <Card.Text>
          Type: <b>{asset.typeName}</b> <br/>
          Value: <b>${asset.value}</b>
        </Card.Text>  
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Footer>
    </Card>
  );
}

export const LiabilityPreview = props => {
  const liability = props.liability;

  return (
    <Card key={liability.name} style={{ width: '16rem' }}>
      <Card.Body>
        <Card.Title>{liability.name}</Card.Title>
        <Card.Text>
          Type: <b>{liability.typeName}</b> <br/>
          Value: <b>${liability.value}</b>
        </Card.Text>  
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
      </Card.Footer>
    </Card>
  );
}

export const GoalPreview = props => {
  const goal = props.goal;

  return (
    <Card key={goal.name} style={{ width: '16rem' }}>
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
