import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'

const mapDispatchToProps = dispatch => ({

});

const AssetPreview = props => {
  const asset = props.asset;

  return (
    <Card style={{ width: '18rem' }}>
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

export default connect(() => ({}), mapDispatchToProps)(AssetPreview);
