import 'date-fns';
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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { numberWithCommas } from '../Finance/Common';
import { Line } from 'react-chartjs-2';

import { AiofPaper, AiofLinearProgress } from '../../style/mui';
import { HOUSE_MORTGAGE_CALCULATOR } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.property,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.property.inProgress,
    mortgageCalculator: state.property.mortgageCalculator,
});

const mapDispatchToProps = dispatch => ({
    onCalculate: (payload) =>
        dispatch({ type: HOUSE_MORTGAGE_CALCULATOR, payload: agent.Property.mortgage(payload) }),
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
    const [startDate, setStartDate] = useState(new Date());
    const [pmi, setPmi] = useState(0.5);
    const [propertyInsurance, setPropertyInsurance] = useState(1000);
    const [monthlyHoa, setMonthlyHoa] = useState(0);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const onCalculate = (ev) => {
        ev.preventDefault();

        let mortgageCalculatorPayload = {
            loanAmount,
            downPayment,
            interestRate,
            loanTermYears,
            startDate,
            pmi,
            propertyInsurance,
            monthlyHoa
        }

        props.onCalculate(mortgageCalculatorPayload);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Mortgage calculator</title>
            </Helmet>

            <Container maxWidth="md">
                <AiofPaper>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={onCalculate}>
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
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        label="Start date"
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'start date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
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

                        <Grid container spacing={3}>
                            <Grid item xs>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                    Calculate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </AiofPaper>

                <MortgageCalculatorResult mortgageCalculator={props.mortgageCalculator} />

                <InProgressBar inProgress={props.inProgress} />

            </Container>
        </React.Fragment>
    )
}

const MortgageCalculatorResult = props => {
    if (props.mortgageCalculator) {
        const classes = useStyles();
        const first = props.mortgageCalculator[0];
        const last = props.mortgageCalculator[props.mortgageCalculator.length - 1];
        const payment = first.payment;

        let breakdown = [first];
        for (var i = 1; i < props.mortgageCalculator.length - 1; i++) {
            let value = props.mortgageCalculator[i];
            if (new Date(value.paymentDate).getMonth() === 11) {
                breakdown.push({
                    paymentDate: value.paymentDate,
                    principalPaid: value.principalPaid,
                    interestPaid: value.interestPaid,
                    startingBalance: value.startingBalance,
                    endingBalance: value.endingBalance,
                })
            }
        }
        breakdown.push(last);
        console.log(breakdown);
        const paymentDate = breakdown.map(x => new Date(x.paymentDate).toLocaleDateString());
        const startingBalance = breakdown.map(x => x.startingBalance);
        const endingBalance = breakdown.map(x => x.endingBalance);

        console.log(paymentDate);

        const data = {
            labels: paymentDate,
            datasets: [
                {
                    label: "Balance",
                    data: endingBalance,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        }

        const options = {
            scales: {
                xAxes: [
                    {
                        display: true,
                        type: "time",
                        time: {
                            parser: "MM/DD/YYYY",
                            unit: "year",
                            unitStepSize: 1,
                            displayFormats: {
                                "year": "YYYY"
                            }
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        }

        return (
            <React.Fragment>
                <AiofPaper elevation={3}>
                    <Grid container direction="column" spacing={0} className={classes.container}>
                        <Grid item xs>
                            <strong>Monthly payment</strong>
                        </Grid>
                        <Grid item xs>
                            ${numberWithCommas(payment)}
                        </Grid>
                    </Grid>
                </AiofPaper>

                <AiofPaper elevation={3}>
                    <Line data={data} options={options} />
                </AiofPaper>
            </React.Fragment>
        );
    }
    else {
        return null;
    }
}

const InProgressBar = props => {
    if (props.inProgress) {
        return (
            <AiofLinearProgress />
        );
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MortgageCalculator);