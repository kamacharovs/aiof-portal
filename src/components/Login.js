import React, { useState, useEffect } from 'react';
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
import { LOGIN, LOGIN_GET_USER, REFRESH, UPDATE_FIELD_AUTH, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.auth,
  appName: state.common.appName,
  token: state.common.token,
  refreshToken: state.common.refreshToken,
  inProgress: state.auth.inProgress,
});

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeRememberMe: (name, value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'rememberMe', value }),
  onSubmit: (username, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(username, password) }),
  onRefresh: () =>
    dispatch({ type: REFRESH, payload: agent.Auth.refresh() }),
  onGetUser: () =>
    dispatch({ type: LOGIN_GET_USER, payload: agent.Auth.getUser() }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

const useStyles = makeStyles((theme) => ({
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

const Login = props => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const isEnabled = username && password ? username.length > 0 && password.length >= 8 : false;

  const onSubmitForm = (username, password) => ev => {
    ev.preventDefault();
    props.onSubmit(username, password);
  };

  useEffect(() => {
    if (username && password) {
      props.onRefresh();
    }
  }, [props.token]);

  useEffect(() => {
    if (username && password) {
      props.onGetUser();
    }
  }, [props.token, props.refreshToken]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.appName} | Login</title>
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

          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm(username, password)}>
            <Grid container spacing={3} alignItems="center" justify="center">
              <p className="text-center text-muted">
                One account for everything finance
                </p>
              <RedP>
                {props.error ? "Invalid username or password. Please try again" : null}
              </RedP>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
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
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.value)}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember me?"
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth
                  disabled={!isEnabled || props.inProgress}>
                  <LoadingClip inProgress={props.inProgress} />&nbsp;&nbsp;Sign in
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
