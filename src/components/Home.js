import React, { Component }  from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      user : {}
    }
  }

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
      username: state.user.username,
      user: state.user.user,
      isLoggedIn: state.user.isLoggedIn
  };
};

export default connect(
  mapStateToProps
)(Home)