import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import agent from '../agent';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { LoginPaper } from '../style/mui';
import { CoolLink } from '../style/common';
import { AiofLoader } from '../components/Common/Loader';
import { UPDATE_FIELD_AUTH, REGISTER, REGISTER_PAGE_UNLOADED } from '../constants/actionTypes';


const mapStateToProps = state => ({ 
  ...state.auth,
  appName: state.common.appName,
  inProgress: state.auth.inProgress,
});

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

const Register2 = props => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFirstNameValid = firstName ? firstName.length > 0 && firstName.length < 200 : false;
  const isLastNameValid = lastName ? lastName.length > 0 && lastName.length < 200 : false;
  const isEmailValid = email ? email.length > 0 && email.length < 200 : false;
  const isUsernameValid = username ? username.length > 0 && username.length < 200 : false;
  const isPasswordValid = password ? IsPasswordValid(password) : false;
  const isEnabled = isFirstNameValid && isLastNameValid && isEmailValid && isUsernameValid && isPasswordValid;

  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasUpperChar, setPasswordHasUpperChar] = useState(false);
  const [passwordHasMinimum8Maximum50, setPasswordHasMinimum8Maximum50] = useState(false);

  const onSubmitForm = (firstName, lastName, email, username, password) => ev => {
    ev.preventDefault();

    props.onSubmit(firstName, lastName, email, username, password);
  }

  useEffect(() => {
    if (firstName && lastName && email && username && password) {
      props.onUnload();
    }
  }, [firstName, lastName, email, username, password]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.appName} | Register</title>
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

          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm(firstName, lastName, email, username, password)}>
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
                  onChange={e => setFirstName(e.target.value)}
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
                  onChange={e => setLastName(e.target.value)}
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
                  onChange={e => setEmail(e.target.value)}
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
                  onChange={e => setUsername(e.target.value)}
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
                  onChange={e => setPassword(e.target.value)}
                  helperText={isPasswordValid ? null : "Password is required and must be between 8 to 50 characters, have a number and at least 1 uppercase character"}
                />
              </Grid>
              <Grid item xs={12}>
                <p>
                  Password checker
                </p>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth
                  disabled={!isEnabled || props.inProgress}>
                  <LoadingClip inProgress={props.inProgress} />&nbsp;&nbsp;Sign up
                </Button>
              </Grid>

            </Grid>
          </form>

        </LoginPaper>
      </Container>
    </React.Fragment>
  );
}

const IsPasswordValid = (password) => {
  var regexHasNumber = new RegExp("[0-9]+");
  var regexUpperChar = new RegExp("[A-Z]+");
  var regexLength = new RegExp(".{8,50}");

  return password && regexHasNumber.test(password) && regexUpperChar.test(password) && regexLength.test(password);
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

export default connect(mapStateToProps, mapDispatchToProps)(Register2);
