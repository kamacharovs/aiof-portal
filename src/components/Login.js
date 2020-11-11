import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { LoginPaper } from '../style/mui';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { CoolLink, RedP } from '../style/common';
import { AiofLoader } from '../components/Common/Loader';
import { LOGIN, REFRESH, UPDATE_FIELD_AUTH, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.auth,
  appName: state.common.appName,
  inProgress: state.auth.inProgress,
});

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeRememberMe: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'rememberMe', value }),
  onSubmit: (username, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(username, password) }),
  onRefresh: () =>
    dispatch({ type: REFRESH, payload: agent.Auth.refresh() }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      rememberMe: false,
    }

    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeRememberMe = ev => {
      this.props.onChangeRememberMe([ev.target.name], ev.target.checked);
    };
    this.submitForm = (username, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, password);
    };

    this.classes = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      p: {
        padding: '0rem',
        margin: '0rem',
      },
      textField: {
        width: '25ch',
      }
    }));
  }

  componentWillUnmount() {
    if (this.props.username && this.props.password) {
      this.props.onRefresh();
    }

    this.props.onUnload();
  }

  render() {
    const username = this.props.username || "";
    const password = this.props.password || "";
    const rememberMe = this.props.rememberMe || false;
    const isEnabled = username && password ? username.length > 0 && password.length >= 8 : false;

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Login</title>
        </Helmet>
        <Container maxWidth="sm">
          <LoginPaper elevation={3} variant="outlined">

            <Grid container spacing={3} alignItems="center" justify="center" alignContent="center">
              <Grid item xs={12}>
                <h1 className="text-center">Sign In</h1>
                <p className="text-center">
                  <CoolLink to="/register">
                    Need an account?
                  </CoolLink>
                </p>
              </Grid>
            </Grid>

            <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm(username, password)}>
              <Grid container spacing={3} alignItems="center" justify="center">
                <p className="text-center text-muted">
                  One account for everything finance
                </p>
                <RedP>
                  {this.props.error ? "Invalid username or password. Please try again" : null}
                </RedP>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={this.changeUsername}
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
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={this.changeRememberMe}
                        name="rememberMe"
                        color="primary"
                      />
                    }
                    label="Remember me?"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth
                    disabled={!isEnabled || this.props.inProgress}>
                    <LoadingClip inProgress={this.props.inProgress} />&nbsp;&nbsp;Sign in
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <p className="text-center text-muted">
                    <i>By clicking Sign In, you agree to our <a href="/terms-and-conditions">Terms</a> and have read and acknowledge our <a href="/privacy-policy">US Privacy Statement</a>.</i>
                  </p>
                </Grid>
              </Grid>
            </form>
          </LoginPaper>
        </Container>
      </React.Fragment>
    );
  }
}

const LoadingClip = props => {
  const inProgress = props.inProgress;

  if (inProgress) {
    return (
      <AiofLoader inProgress={inProgress} size={15} br={false} color={"#ffffff"} />
    );
  }
  else {
    return (
      <LockOpenIcon />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
