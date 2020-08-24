import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import agent from '../agent';
import { connect } from 'react-redux';
import { FaUnlock } from "react-icons/fa";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mainStyle = {
  border: "1px solid black",
  padding: "1rem"
}
const loginStyle = {
  paddingLeft: "3rem",
  paddingRight: "3rem",
  paddingTop: "2rem",
  paddingBottom: "2rem"
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (username, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(username, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (username, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const username = this.props.username;
    const password = this.props.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 text-xs-center" style={mainStyle}>

              <ListErrors errors={this.props.errors} />

              <h1>Sign In</h1>
              <p>
                <Link to="/register">
                  Need an account?
                </Link>
              </p>

              <Form onSubmit={this.submitForm(username, password)}>
                <Form.Text className="text-muted">
                  One account for everything finance
                </Form.Text>

                <div className="text-xs-left" style={loginStyle}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                      value={username}
                      onChange={this.changeUsername} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                      value={password}
                      onChange={this.changePassword} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>

                  <Button variant="primary" size="lg" type="submit" block
                    disabled={this.props.inProgress}>
                    <FaUnlock size={20} />&nbsp;&nbsp;Sign in
                  </Button>

                  <Form.Text className="text-muted text-xs-center">
                    <br/>
                    <i>By clicking Sign In, you agree to our <a href="#">Terms</a> and have read and acknowledge our <a href="#">US Privacy Statement</a>.</i>
                  </Form.Text>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
