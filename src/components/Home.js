import React, { Component }  from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>This is home</h1>
        <p>
          Username: {this.props.username}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      username: state.username,
      user: state.user
  };
};

export default connect(
  mapStateToProps
)(Home)