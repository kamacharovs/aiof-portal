import React, { Component } from 'react';
import { getUser } from "../actions/user";
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
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
    this.handleSubmitAsync = this.handleSubmitAsync.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  async handleSubmitAsync(e) {
    e.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
    
    getUser(this.state.username)
    this.props.history.push("/");
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
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <>
        <div className="login d-flex justify-content-center">
          <Form>
            <Form.Group controlId="loginEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text"
                value={this.state.username}
                onChange={e => this.handleUserChange(e)} />
              <Form.Text className="text-muted">
                The username you have registered
          </Form.Text>
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

            <Button variant="primary" type="submit"
              onClick={e => this.handleSubmitAsync(e)} >
              Submit
          </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default connect(
  null,
  { getUser }
)(Login);