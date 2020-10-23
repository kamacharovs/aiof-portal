import React from 'react';
import { Helmet } from 'react-helmet';
import agent from '../agent';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { LoginPaper } from '../style/mui';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { CoolLink } from '../style/common';
import { UPDATE_FIELD_AUTH, REGISTER, REGISTER_PAGE_UNLOADED } from '../constants/actionTypes';


const mapStateToProps = state => ({ ...state.auth, appName: state.common.appName });

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
    this.changeFocus = ev => this.setState({ focused: true });
    this.changeFirstName = ev => this.props.onChangeFirstName(ev.target.value);
    this.changeLastName = ev => this.props.onChangeLastName(ev.target.value);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (firstName, lastName, email, username, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(firstName, lastName, email, username, password);
    }

    this.classes = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    }));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const focused = this.props.focused || false;
    const firstName = this.props.firstName || "";
    const lastName = this.props.lastName || "";
    const email = this.props.email || "";
    const username = this.props.username || "";
    const password = this.props.password || "";
    const isFirstNameValid = firstName ? firstName.length > 0 && firstName.length < 200 : false;
    const isLastNameValid = lastName ? lastName.length > 0 && lastName.length < 200 : false;
    const isEmailValid = email ? email.length > 0 && email.length < 200 : false;
    const isUsernameValid = username ? username.length > 0 && username.length < 200 : false;
    const isPasswordValid = password ? password.length > 8 && password.length < 50 : false;
    const isEnabled = isFirstNameValid && isLastNameValid && isEmailValid && isUsernameValid && isPasswordValid;

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Register</title>
        </Helmet>
        <Container maxWidth="sm">
          <LoginPaper elevation={3} variant="outlined">

            <Grid container spacing={3} alignItems="center" justify="center" alignContent="center">
              <Grid item xs={12}>
                <h1 className="text-center">Sign Up</h1>
                <p className="text-center">
                  <CoolLink to="/login">
                    Have an account?
              </CoolLink>
                </p>
              </Grid>
            </Grid>

            <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm(firstName, lastName, email, username, password)}>
              <Grid container spacing={3} alignItems="center" justify="center">
                <p className="text-center text-muted">
                  One account for everything finance
                </p>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="First name"
                    variant="outlined"
                    value={firstName}
                    onChange={this.changeFirstName}
                    helperText={isFirstNameValid && !focused ? null : "First name is required and must be between 1 and 200 characters"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Last name"
                    variant="outlined"
                    value={lastName}
                    onChange={this.changeLastName}
                    helperText={isLastNameValid ? null : "Last name is required and must be between 1 and 200 characters"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={this.changeEmail}
                    helperText={isEmailValid ? null : "Email is required and must be between 1 and 200 characters"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={this.changeUsername}
                    helperText={isUsernameValid ? null : "Username is required and must be unique and between 1 and 200 characters"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={this.changePassword}
                    helperText={isPasswordValid ? null : "Password is required and must be between 8 to 50 characters, have a number and at least 1 uppercase character"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth
                    disabled={!isEnabled}>
                    <LockOpenIcon />&nbsp;&nbsp;Sign up
                  </Button>
                </Grid>

              </Grid>
            </form>

          </LoginPaper>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
