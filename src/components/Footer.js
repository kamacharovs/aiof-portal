import React from 'react';

import { CoolLink } from '../style/mui';

import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        background: theme.palette.text.default,
        fontSize: '12px',
        color: 'black'
    }
}));

const HomeView = props => {
    const classes = useStyles();

    return (
        <p className={classes.text}>© {new Date().getFullYear()} {props.appName} All rights reserved</p>
    );
}

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <div className="text-right">
                <CoolLink to="/terms-and-conditions" className="nav-link">Terms & Conditions</CoolLink>
                <CoolLink to="/privacy-policy" className="nav-link">Privacy Policy</CoolLink>
            </div>
        );
    } else {
        return null;
    }
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <div className="text-right">
                <CoolLink to="/terms-and-conditions" className="nav-link">Terms & Conditions</CoolLink>
                <CoolLink to="/privacy-policy" className="nav-link">Privacy Policy</CoolLink>
            </div>
        );
    } else {
        return null;
    }
};

const Footer = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar variant="dense">
                        <div className={classes.root}>
                            <HomeView appName={props.appName} />
                        </div>

                        <LoggedOutView currentUser={props.currentUser} />
                        <LoggedInView currentUser={props.currentUser} />
                    </Toolbar>
                </AppBar>
        </React.Fragment>
    );
}

export default Footer