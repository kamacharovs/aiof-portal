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
        <Card.Title>Asset: {asset.name}</Card.Title>
        <Card.Text>
          Asset of type `{asset.typeName}` and value `{asset.value}`
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default connect(() => ({}), mapDispatchToProps)(AssetPreview);
