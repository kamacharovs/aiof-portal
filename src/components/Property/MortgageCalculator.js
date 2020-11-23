import React, { useState } from 'react';
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

import { AiofPaper, AiofLinearProgress } from '../../style/mui';
import { HOUSE_MORTGAGE_CALCULATOR } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.property,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.property.inProgress,
    data: state.property.mortgageCalculatorData,
    breakdown: state.property.mortgageCalculatorBreakdown,
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

    const [propertyValue, setPropertyValue] = useState(300000);
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
            propertyValue,
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
                                    <TextField label="Property value"
                                        value={propertyValue}
                                        onChange={e => setPropertyValue(e.target.value)}
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

                <MortgageCalculatorResult data={props.data} breakdown={props.breakdown} />

                <InProgressBar inProgress={props.inProgress} />

            </Container>
        </React.Fragment>
    )
}

const MortgageCalculatorResult = props => {
    if (props.data && props.breakdown) {
        const classes = useStyles();
        const [showCompleteBreakdown, setShowCompleteBreakdown] = useState(false);
        const [showYearlyCompleteBreakdown, setShowYearlyCompleteBreakdown] = useState(false);
        const first = props.data[0];
        const last = props.data[props.data.length - 1];
        const payment = first.payment;

        const loanAmount = first.startingBalance;
        let totalPrincipalPaid = first.principalPaid;
        let totalInterestPaid = first.interestPaid;

        let breakdown = [first];
        for (var i = 1; i < props.data.length - 1; i++) {
            let value = props.data[i];
            if (new Date(value.paymentDate).getMonth() === 11) {
                breakdown.push({
                    paymentDate: value.paymentDate,
                    endingBalance: value.endingBalance,
                })
            }

            totalPrincipalPaid += value.principalPaid;
            totalInterestPaid += value.interestPaid;
        }
        breakdown.push(last);

        const paymentDate = breakdown.map(x => new Date(x.paymentDate).toLocaleDateString());
        const endingBalance = breakdown.map(x => x.endingBalance);

        const lineData = {
            labels: paymentDate,
            datasets: [
                {
                    label: "Balance",
                    data: endingBalance,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                }
            ],
        }
        const lineOptions = {
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

        const stackedData = {
            labels: props.breakdown.map(x => x.year),
            datasets: [
                {
                    label: "Principal paid",
                    data: props.breakdown.map(x => x.totalPrincipalPaid),
                    backgroundColor: "rgb(54, 162, 235)",
                },
                {
                    label: "Interest paid",
                    data: props.breakdown.map(x => x.totalInterestPaid),
                    backgroundColor: "rgb(255, 99, 132)",
                }
            ],
        }
        const stackedOptions = {
            scales: {
                yAxes: [
                    {
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
                xAxes: [
                    {
                        stacked: true,
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
                        <Grid>
                            <br />
                        </Grid>

                        <Grid>
                            <strong>Loan amount</strong>
                        </Grid>
                        <Grid>
                            ${numberWithCommas(loanAmount)}
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>

                        <Grid item xs>
                            <strong>Total principal paid</strong>
                        </Grid>
                        <Grid item xs>
                            ${numberWithCommas(Math.round(totalPrincipalPaid))}
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>

                        <Grid item xs>
                            <strong>Total interest paid</strong>
                        </Grid>
                        <Grid item xs>
                            ${numberWithCommas(Math.round(totalInterestPaid))}
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>

                        <Grid item xs>
                            <strong>Total paid</strong>
                        </Grid>
                        <Grid item xs>
                            ${numberWithCommas(Math.round(totalPrincipalPaid + totalInterestPaid))}
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>

                        <Grid item xs>
                            <strong>Start date - end date</strong>
                        </Grid>
                        <Grid item xs>
                            {new Date(first.paymentDate).toLocaleDateString()} - {new Date(last.paymentDate).toLocaleDateString()}
                        </Grid>
                    </Grid>
                </AiofPaper>

                <AiofPaper elevation={3}>
                    <Line data={lineData} options={lineOptions} />
                </AiofPaper>

                <AiofPaper>
                    <Bar data={stackedData} options={stackedOptions} />
                </AiofPaper>

                <AiofPaper>
                    <Button color="primary" onClick={() => setShowCompleteBreakdown(!showCompleteBreakdown)}>
                        {showCompleteBreakdown === false ? "View complete breakdown" : "Hide complete breakdown"}
                    </Button>

                    <br/>
                    The complete breakdown will show you exactly what is in each month from the start date. This can be helpful in order to further see into the numbers
                    
                    <CompleteBreakdown data={props.data} show={showCompleteBreakdown} />
                </AiofPaper>

                <AiofPaper>
                    <Button color="primary" onClick={() => setShowYearlyCompleteBreakdown(!showYearlyCompleteBreakdown)}>
                        {showYearlyCompleteBreakdown === false ? "View yearly complete breakdown" : "Hide yearly complete breakdown"}
                    </Button>

                    <br/>
                    The yearly complete breakdown will show you exactly what is in each year from the start date. This is very similar to the complete breakdown but it's a higher level overview
                    
                    <YearlyCompleteBreakdown data={props.breakdown} show={showYearlyCompleteBreakdown} />
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

const CompleteBreakdown = props => {
    if (props.data && props.show === true) {
        return (
            <React.Fragment>
                <hr/>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <strong>Date</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Starting balance</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Ending balance</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Principal paid</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Interest paid</strong>
                    </Grid>
                </Grid>
                {props.data.map(d => {
                    return (
                        <Grid container spacing={0} key={d.paymentDate}>
                            <Grid item xs>
                                {new Date(d.paymentDate).toLocaleDateString()}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.startingBalance)}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.endingBalance)}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.principalPaid)}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.interestPaid)}
                            </Grid>
                        </Grid>
                    );
                })}
            </React.Fragment>
        );
    }
    else {
        return null;
    }
}

const YearlyCompleteBreakdown = props => {
    if (props.data && props.show === true) {
        return (
            <React.Fragment>
                <hr/>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <strong>Year</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Starting balance</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Ending balance</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Principal paid</strong>
                    </Grid>
                    <Grid item xs>
                        <strong>Interest paid</strong>
                    </Grid>
                </Grid>
                {props.data.map(d => {
                    return (
                        <Grid container spacing={0} key={d.year}>
                            <Grid item xs>
                                {d.year}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.startingBalance)}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.endingBalance)}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.totalPrincipalPaid)}
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(d.totalInterestPaid)}
                            </Grid>
                        </Grid>
                    );
                })}
            </React.Fragment>
        );
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MortgageCalculator);