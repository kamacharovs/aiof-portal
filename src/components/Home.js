import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      user: {}
    }
  }

  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
          </p>
        </Container>
      </Jumbotron>
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