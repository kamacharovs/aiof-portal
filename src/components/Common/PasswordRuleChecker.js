import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


const timeout = 750;
const useStyles = makeStyles((theme) => ({
    green: {
        color: theme.palette.success.main,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: theme.palette.error.main,
        margin: '0rem',
        padding: '0rem'
    },
}));

export const PasswordRuleChecker = props => {
    const classes = useStyles();
    const hasNumber = props.passwordHasNumber;
    const hasUpperChar = props.passwordHasUpperChar;
    const hasLength = props.passwordHasLength;

    return (
        <React.Fragment>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={1}>
                    {hasNumber ?
                        <React.Fragment>
                            <Zoom in={hasNumber} timeout={timeout}>
                                <CheckIcon className={classes.green} />
                            </Zoom>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Zoom in={!hasNumber} timeout={timeout}>
                                <CloseIcon className={classes.red} />
                            </Zoom>
                        </React.Fragment>
                    }
                </Grid>
                <Grid item xs>
                    Password must contain a number
          </Grid>
            </Grid>

            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={1}>
                    {hasUpperChar ?
                        <React.Fragment>
                            <Zoom in={hasUpperChar} timeout={timeout}>
                                <CheckIcon className={classes.green} />
                            </Zoom>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Zoom in={!hasUpperChar} timeout={timeout}>
                                <CloseIcon className={classes.red} />
                            </Zoom>
                        </React.Fragment>
                    }
                </Grid>
                <Grid item xs>
                    Password must have at least 1 upper case character
          </Grid>
            </Grid>

            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={1}>
                    {hasLength ?
                        <React.Fragment>
                            <Zoom in={hasLength} timeout={timeout}>
                                <CheckIcon className={classes.green} />
                            </Zoom>
                        </React.Fragment>
                        : <React.Fragment>
                            <Zoom in={!hasLength} timeout={timeout}>
                                <CloseIcon className={classes.red} />
                            </Zoom>
                        </React.Fragment>
                    }
                </Grid>
                <Grid item xs>
                    Password must be between 8 and 50 characters long
          </Grid>
            </Grid>
        </React.Fragment>
    );
}

export const ConfirmationPasswordRuleChecker = props => {
    const classes = useStyles();
    const password = props.password;
    const confirmationPassword = props.confirmationPassword;
    
    const match = password
        && confirmationPassword
        && password === confirmationPassword;

    return (
        <React.Fragment>
            <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={1}>
                    {match ?
                        <React.Fragment>
                            <Zoom in={match} timeout={timeout}>
                                <CheckIcon className={classes.green} />
                            </Zoom>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Zoom in={!match} timeout={timeout}>
                                <CloseIcon className={classes.red} />
                            </Zoom>
                        </React.Fragment>
                    }
                </Grid>
                <Grid item xs>
                    Passwords need to match
                </Grid>
            </Grid>
        </React.Fragment>
    );
}