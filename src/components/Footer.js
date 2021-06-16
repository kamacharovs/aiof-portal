import React from 'react';

import { DefaultWhiteColor, CoolLink } from '../style/mui';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        background: DefaultWhiteColor,
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
                            <HomeView appName={props.appName.toLowerCase()} />
                        </div>

                        <LoggedOutView currentUser={props.currentUser} />
                        <LoggedInView currentUser={props.currentUser} />
                    </Toolbar>
                </AppBar>
        </React.Fragment>
    );
}

export default Footer