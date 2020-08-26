import React from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import ListErrors from './ListErrors';
import agent from '../agent';
import { connect } from 'react-redux';
import { FaUnlock } from "react-icons/fa";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import { CoolLink, RoundBorderBox, RoundBorderBoxText } from '../style/common';

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
    const username = this.props.username || "";
    const password = this.props.password || "";
    const isEnabled = username && password ? username.length > 0 && password.length > 0 : false;

    return (
      <Container>
        <Row>
          <RoundBorderBox className="col-md-6 offset-md-3 col-xs-12 text-center">

            <ListErrors errors={this.props.errors} />

            <h1>Sign In</h1>
            <p>
              <CoolLink to="/register">
                Need an account?
                </CoolLink>
            </p>

            <Form onSubmit={this.submitForm(username, password)}>
              <Form.Text className="text-muted">
                One account for everything finance
                </Form.Text>

              <RoundBorderBoxText className="text-left">
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text"
                    required
                    value={username}
                    onChange={this.changeUsername} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"
                    required
                    value={password}
                    onChange={this.changePassword} />
                </Form.Group>

                <Form.Group>
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button variant="primary" size="lg" type="submit" block
                  disabled={!isEnabled}>
                  <FaUnlock size={20} />&nbsp;&nbsp;Sign in
                  </Button>

                <Form.Text muted={true} className="text-center">
                  <br />
                  <i>By clicking Sign In, you agree to our <a href="#">Terms</a> and have read and acknowledge our <a href="#">US Privacy Statement</a>.</i>
                </Form.Text>
              </RoundBorderBoxText>
            </Form>

          </RoundBorderBox>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
