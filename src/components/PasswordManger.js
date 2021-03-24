import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { PasswordRuleChecker, ConfirmationPasswordRuleChecker } from './Common/PasswordRuleChecker';
import { SquarePaper, DefaultRedColor } from '../style/mui';
import { CoolLink } from '../style/common';
import { AiofLoader } from './Common/Loader';
import { PASSWORD_RESET } from '../constants/actionTypes';


const mapStateToProps = state => ({
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  inProgressPasswordReset: state.auth.inProgressPasswordReset,
  passwordResetError: state.auth.passwordResetError,
});

const mapDispatchToProps = dispatch => ({
  onPasswordReset: (oldPassword, newPassword) =>
    dispatch({ type: PASSWORD_RESET, payload: agent.Auth.resetPassword(oldPassword, newPassword) }),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  red: {
    color: DefaultRedColor,
    margin: '0rem',
    padding: '0rem'
  },
}));

const PasswordMangement = props => {
  const classes = useStyles();

  const regexHasNumber = new RegExp("[0-9]+");
  const regexUpperChar = new RegExp("[A-Z]+");
  const regexLength = new RegExp(".{8,50}");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [newPasswordHasNumber, setNewPasswordHasNumber] = useState(false);
  const [newPasswordHasUpperChar, setNewPasswordHasUpperChar] = useState(false);
  const [newPasswordHasMinimum8Maximum50, setNewPasswordHasMinimum8Maximum50] = useState(false);

  const isEnabled = currentPassword
    && newPassword
    && newPassword === newPasswordConfirmation;

  const updateNewPassword = (newPassword) => {
    setNewPassword(newPassword);
    setNewPasswordHasNumber(regexHasNumber.test(newPassword));
    setNewPasswordHasUpperChar(regexUpperChar.test(newPassword));
    setNewPasswordHasMinimum8Maximum50(regexLength.test(newPassword));
  }

  const onPasswordReset = (ev) => {
    ev.preventDefault();

    props.onPasswordReset(currentPassword, newPassword);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.appName} | Password management</title>
      </Helmet>

      <Container maxWidth="sm">
        <SquarePaper elevation={3} variant="outlined">
          <Grid
            container
            spacing={3}
            alignItems="center"
            justify="center"
            alignContent="center">
            <Grid item xs>
              <h1 className="text-center">Reset password</h1>
              <p className="text-center">
                <CoolLink to="/">
                  Got here by mistake?
                  </CoolLink>
              </p>
            </Grid>
          </Grid>

          <form className={classes.root} noValidate autoComplete="off" onSubmit={onPasswordReset}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justify="center">
              <p className="text-center text-muted">
                One account for everything finance
              </p>

              <div className={classes.red}>
                {props.error ? "Invalid email or password. Please try again" : null}
              </div>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Current password"
                  type="password"
                  variant="outlined"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="New password"
                  type="password"
                  variant="outlined"
                  value={newPassword}
                  onChange={e => updateNewPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <PasswordRuleChecker
                  passwordHasNumber={newPasswordHasNumber}
                  passwordHasUpperChar={newPasswordHasUpperChar}
                  passwordHasLength={newPasswordHasMinimum8Maximum50} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="New password confirmation"
                  type="password"
                  variant="outlined"
                  value={newPasswordConfirmation}
                  onChange={e => setNewPasswordConfirmation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <ConfirmationPasswordRuleChecker
                  password={newPassword}
                  confirmationPassword={newPasswordConfirmation} />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth
                  disabled={!isEnabled || props.inProgress}>
                  <LoadingClip inProgress={props.inProgress} />&nbsp;&nbsp;Reset
                  </Button>
              </Grid>
            </Grid>
          </form>
        </SquarePaper>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordMangement);
