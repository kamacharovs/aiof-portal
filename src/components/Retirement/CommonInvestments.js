import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { numberWithCommas } from '../Finance/Common';
import { Line, Bar } from 'react-chartjs-2';

import { AiofLinearProgress, InPaper, SquarePaper, DefaultRedColor, DefaultGreenColor } from '../../style/mui';
import { ThinText } from '../../style/common';
import { RETIREMENT_PAGE_LOADED, RETIREMENT_COMMON_INVESTMENTS } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.retirement,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.retirement.inProgress,
    commonInvestments: state.retirement.commonInvestments
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: RETIREMENT_PAGE_LOADED }),
    onCalculate: (payload) =>
        dispatch({ type: RETIREMENT_COMMON_INVESTMENTS, payload: agent.Retirement.commonInvestments(payload) }),
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
    const classes = useStyles();
    const currentYear = new Date().getFullYear();

    const [interest, setInterest] = useState(7);
    const [startYear, setStartYear] = useState(currentYear);
    const [endYear, setEndYear] = useState(currentYear + 10);
    const [compoundingPeriods, setCompoundingPeriods] = useState(12);
    const [fourOhOneKStartingAmount, setFourOhOneKStartingAmount] = useState(0);
    const [fourOhOneKMonthlyContributions, setFourOhOneKMonthlyContributions] = useState(1625);
    const [rothIraStartingAmount, setRothIraStartingAmount] = useState(0);
    const [rothIraMonthlyContributions, setRothIraMonthlyContributions] = useState(500);
    const [brokerageStartingAmount, setBrokerageStartingAmount] = useState(0);
    const [brokerageMonthlyContributions, setBrokerageMonthlyContributions] = useState(500);

    const onCalculate = (ev) => {
        ev.preventDefault();

        let commonInvestmentsPayload = {
            interest: Number(interest) || null,
            startYear: Number(startYear) || null,
            endYear: Number(endYear) || null,
            compoundingPeriods: Number(compoundingPeriods) || null,
            fourOhOneKStartingAmount: Number(fourOhOneKStartingAmount) || null,
            fourOhOneKMonthlyContributions: Number(fourOhOneKMonthlyContributions) || null,
            rothIraStartingAmount: Number(rothIraStartingAmount) || null,
            rothIraMonthlyContributions: Number(rothIraMonthlyContributions) || null,
            brokerageStartingAmount: Number(brokerageStartingAmount) || null,
            brokerageMonthlyContributions: Number(brokerageMonthlyContributions) || null,
        }

        props.onCalculate(commonInvestmentsPayload);
    }

    useEffect(() => {
        props.onLoad();
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Retirement | Common investments</title>
            </Helmet>

            <Container maxWidth="md">
                <SquarePaper variant="outlined" square>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={onCalculate}>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                General details
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>

                        </Grid>
                    </form>
                </SquarePaper>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonInvestments);