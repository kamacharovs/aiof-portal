import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import agent from '../agent';
import { FaUnlock } from "react-icons/fa";
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeFirstName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'firstName', value }),
  onChangeLastName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'lastName', value }),
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (firstName, lastName, email, username, password) => {
    const payload = agent.Auth.register(firstName, lastName, email, username, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeFirstName = ev => this.props.onChangeFirstName(ev.target.value);
    this.changeLastName = ev => this.props.onChangeLastName(ev.target.value);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (firstName, lastName, email, username, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(firstName, lastName, email, username, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const email = this.props.email;
    const username = this.props.username;
    const password = this.props.password;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12 text-xs-center" style={{ border: "1px solid black", padding: "1rem" }}>
          
              <ListErrors errors={this.props.errors} />

              <h1>Sign Up</h1>
              <p>
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <Form onSubmit={this.submitForm(firstName, lastName, email, username, password)}>
                <Form.Text className="text-muted">
                  One account for everything finance
                </Form.Text>

                <div className="text-xs-left" style={{ paddingLeft: "3rem", paddingRight: "3rem", paddingTop: "2rem", paddingBottom: "2rem" }}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text"
                      value={firstName}
                      onChange={this.changeFirstName} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text"
                      value={lastName}
                      onChange={this.changeLastName} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                      value={email}
                      onChange={this.changeEmail} />
                  </Form.Group>

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

                  <Button variant="primary" size="lg" type="submit" block
                    disabled={this.props.inProgress}>
                    <FaUnlock size={20} />&nbsp;&nbsp;Sign up
                  </Button>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
