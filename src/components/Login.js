import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../agent';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { LoginPaper, CoolLink } from '../style/mui';
import { AiofLoader, } from '../components/Common/Loader';
import { LOGIN, LOGIN_GET_USER, REFRESH, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';


const mapStateToProps = state => ({
  appName: state.common.appName,
  appShortAccountDescription: state.common.appShortAccountDescription,
  currentUser: state.common.currentUser,
  token: state.common.token,
  refreshToken: state.common.refreshToken,
  inProgressLogin: state.auth.inProgressLogin,
  loginError: state.auth.loginError,
  inProgressRefresh: state.auth.inProgressRefresh,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
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
  },
  red: {
    color: theme.palette.error.main,
    margin: '0rem',
    padding: '0rem'
  },
}));

const Login = props => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const isEnabled = email && password ? email.length > 0 && password.length >= 8 : false;

  const onSubmitForm = (email, password) => ev => {
    ev.preventDefault();
    props.onSubmit(email, password);
  };

  useEffect(() => {
    if (email && password
      && props.inProgressLogin === false
      && !props.loginError) {
      props.onRefresh();
    }
  }, [props.inProgressLogin]);

  useEffect(() => {
    if (email && password
      && props.inProgressLogin === false
      && props.inProgressRefresh === false
      && !props.loginError) {
      props.onGetUser();
    }
  }, [props.inProgressLogin, props.inProgressRefresh]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.appName} | Login</title>
      </Helmet>

      <Container maxWidth="sm">
        <LoginPaper elevation={3} variant="outlined">
          <Grid container spacing={3} alignItems="center" justifyContent="center" alignContent="center">
            <Grid item xs={12}>
              <h1 className="text-center">Sign In</h1>
              <p className="text-center">
                <CoolLink id="login-link-register" to="/register">
                  Need an account?
                  </CoolLink>
              </p>
            </Grid>
          </Grid>

          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm(email, password)}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center">
              <Grid item xs={12}>
                <div className="text-center text-muted">
                  {props.appShortAccountDescription}
                </div>

                <div id="login-error-message" className={`text-center ${classes.red}`}>
                  {props.loginError ? "Invalid email or password. Please try again" : null}
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="login-email"
                  required
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="login-password"
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
                      onChange={e => setRememberMe(!rememberMe)}
                      name="rememberMe"
                      color="primary"
                    />
                  }
                  label="Remember me?"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  id="login-button" 
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!isEnabled || props.inProgressLogin}>
                  <LoadingClip inProgress={props.inProgressLogin} />&nbsp;&nbsp;Sign in
                  </Button>
              </Grid>

              <Grid item xs={12}>
                <p className="text-center text-muted">
                  <i>By clicking Sign In, you agree to our <a id="login-link-terms-and-conditions" href="/terms-and-conditions">Terms</a> and have read and acknowledge our <a id="login-link-privacy-policy" href="/privacy-policy">US Privacy Statement</a>.</i>
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
