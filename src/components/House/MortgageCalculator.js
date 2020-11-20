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

import { AiofPaper, AiofLinearProgress } from '../../style/mui';
import { HOUSE_MORTGAGE_CALCULATOR } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.house,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.house.inProgress,
});

const mapDispatchToProps = dispatch => ({
    onMortgageCalculator: (payload) =>
        dispatch({ type: HOUSE_MORTGAGE_CALCULATOR, payload: agent.House.mortgage(payload) }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const MortgageCalculator = props => {
    const classes = useStyles();

    const [loanAmount, setLoanAmount] = useState(300000);
    const [downPayment, setDownPayment] = useState(60000);
    const [interestRate, setInterestRate] = useState(3.8);
    const [loanTermYears, setLoanTermYears] = useState(30);
    const [startDate, setStartDate] = useState('');
    const [pmi, setPmi] = useState(0.5);
    const [propertyInsurance, setPropertyInsurance] = useState(1000);
    const [monthlyHoa, setMonthlyHoa] = useState(0);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Mortgage calculator</title>
            </Helmet>

            <Container maxWidth="md">
                <AiofPaper>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            General details
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="Loan amount"
                                    value={loanAmount}
                                    onChange={e => setLoanAmount(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }} />
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="Down payment"
                                    value={downPayment}
                                    onChange={e => setDownPayment(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }} />
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="Interest rate"
                                    value={interestRate}
                                    onChange={e => setInterestRate(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                                    }} />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="Loan term years"
                                    value={loanTermYears}
                                    onChange={e => setLoanTermYears(e.target.value)} />
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="Start date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)} />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <br />
                            Additional details
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="PMI"
                                    value={pmi}
                                    onChange={e => setPmi(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                                    }} />
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="Property insurance"
                                    value={propertyInsurance}
                                    onChange={e => setPropertyInsurance(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }} />
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className={classes.margin}>
                                <TextField label="Monthly HOA"
                                    value={monthlyHoa}
                                    onChange={e => setMonthlyHoa(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }} />
                            </div>
                        </Grid>
                    </Grid>
                </AiofPaper>
            </Container>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MortgageCalculator);