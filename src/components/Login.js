import 'babel-polyfill'
import React, { Component } from 'react';
import { getUser } from "../actions/user";
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import './App.css';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    this.props.getUser(
      this.state.username,
      this.state.password)
    
    if (this.state.error === '') {
      this.props.history.push("/home");
    }
  }

  handleUserChange(e) {
    this.setState({
      username: e.target.value,
    });
  };

  handlePassChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <>
        <div className="login d-flex justify-content-center">
          <Form>
            <Form.Group controlId="loginEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                value={this.state.username}
                onChange={e => this.handleUserChange(e)} />
            </Form.Group>

            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                value={this.state.password}
                onChange={e => this.handlePassChange(e)} />
            </Form.Group>

            <Form.Group controlId="loginRememberMe">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="outline-secondary" size="lg" block type="submit"
              onClick={e => this.handleSubmit(e)} >
              Log in
          </Button>
          </Form>
        </div>
      </>
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

function mapDispatchToProps(dispatch) {
  return { 
     getUser: (username, password) => {
        dispatch(getUser(username, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);