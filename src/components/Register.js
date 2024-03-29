import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import agent from '../agent';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { PasswordRuleChecker } from './Common/PasswordRuleChecker';
import { LoginPaper, CoolLink } from '../style/mui';
import { AiofLoader } from '../components/Common/Loader';
import { REGISTER, REGISTER_PAGE_UNLOADED } from '../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.auth,
  appName: state.common.appName,
  appShortAccountDescription: state.common.appShortAccountDescription,
  inProgress: state.auth.inProgress,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (firstName, lastName, email, password) => {
    const payload = agent.Auth.register(firstName, lastName, email, password);
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

const Register = props => {
  const classes = useStyles();

  const regexHasNumber = new RegExp("[0-9]+");
  const regexUpperChar = new RegExp("[A-Z]+");
  const regexLength = new RegExp(".{8,50}");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasUpperChar, setPasswordHasUpperChar] = useState(false);
  const [passwordHasMinimum8Maximum50, setPasswordHasMinimum8Maximum50] = useState(false);

  const isFirstNameValid = firstName ? firstName.length > 0 && firstName.length < 200 : false;
  const isLastNameValid = lastName ? lastName.length > 0 && lastName.length < 200 : false;
  const isEmailValid = email ? email.length > 0 && email.length < 200 : false;
  const isPasswordValid = password ? regexHasNumber.test(password) && regexUpperChar.test(password) && regexLength.test(password) : false;
  const isEnabled = isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

  const updatePassword = (newPassword) => {
    setPassword(newPassword);
    setPasswordHasNumber(regexHasNumber.test(newPassword));
    setPasswordHasUpperChar(regexUpperChar.test(newPassword));
    setPasswordHasMinimum8Maximum50(regexLength.test(newPassword));
  }

  const onSubmitForm = () => ev => {
    ev.preventDefault();

    props.onSubmit(firstName, lastName, email, password);
  }

  useEffect(() => {
    if (firstName && lastName && email && password) {
      props.onUnload();
    }
  }, [firstName, lastName, email, password]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.appName} | Register</title>
      </Helmet>
      <Container maxWidth="sm">
        <LoginPaper variant="outlined">

          <Grid container spacing={3} alignItems="center" justifyContent="center" alignContent="center">
            <Grid item xs={12}>
              <h1 className="text-center">Sign Up</h1>
              <p className="text-center">
                <CoolLink to="/login">
                  Have an account?
                </CoolLink>
              </p>
            </Grid>
          </Grid>

          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm()}>
            <Grid 
              container 
              spacing={3} 
              alignItems="center" 
              justifyContent="center">
              <Grid item xs={12}>
                <div className="text-center text-muted">
                  {props.appShortAccountDescription}
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="First name"
                  variant="outlined"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  helperText={isFirstNameValid ? null : "First name is required and must be between 1 and 200 characters"}
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
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={e => updatePassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordRuleChecker
                  passwordHasNumber={passwordHasNumber}
                  passwordHasUpperChar={passwordHasUpperChar}
                  passwordHasLength={passwordHasMinimum8Maximum50} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
