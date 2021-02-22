import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { numberWithCommas } from '../Finance/Common';
import { Line, Bar } from 'react-chartjs-2';

import { AiofLinearProgress, InPaper, SquarePaper, DefaultRedColor, DefaultGreenColor } from '../../style/mui';
import { ThinText } from '../../style/common';
import { HOUSE_MORTGAGE_CALCULATOR } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.property,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.property.inProgress,
});

const mapDispatchToProps = dispatch => ({
    onCalculate: (payload) =>
        dispatch({ type: HOUSE_MORTGAGE_CALCULATOR, payload: agent.Property.mortgage(payload) }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
    green: {
        color: DefaultGreenColor,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: DefaultRedColor,
        margin: '0rem',
        padding: '0rem'
    }
}));

const CommonInvestments = props => {
    const classes = makeStyles();

    return (
        <React.Fragment>

        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonInvestments);