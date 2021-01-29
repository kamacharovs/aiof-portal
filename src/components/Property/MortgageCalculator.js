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

import { AiofPaper, AiofLinearProgress, InPaper } from '../../style/mui';
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

    const [errorPropertyText, setErrorPropertyText] = useState("");
    const [errorDownPaymentText, setErrorDownPaymentText] = useState("");
    const [errorInterestRateText, setErrorInterestRateText] = useState("");
    const [errorLoanTermYearsText, setErrorLoanTermYearsText] = useState("");
    const [errorPmiText, setErrorPmiText] = useState("");
    const [errorPropertyInsuranceText, setErrorPropertyInsuranceText] = useState("");
    const [errorMonthlyHoaText, setErrorMonthlyHoaText] = useState("");
    const negativeText = "Value cannot be negative";
    const biggerThanPerc = "Value cannot be bigger than 100";

    const isCalculateEnabled = errorPropertyText === ""
        && errorDownPaymentText === ""
        && errorInterestRateText === ""
        && errorLoanTermYearsText === ""
        && errorPmiText === ""
        && errorPropertyInsuranceText === ""
        && errorMonthlyHoaText === "";

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const onNegativeChange = (e, errorText, setErrorText, setValue) => {
        const value = e.target.value;
        if (value < 0)
            setErrorText(negativeText);
        else {
            if (errorText !== "")
                setErrorText("");
            setValue(value);
        }
    }

    const onPercentageChange = (e, errorText, setErrorText, setValue) => {
        const value = e.target.value;
        if (value < 0)
            setErrorText(negativeText);
        else if (value > 100)
            setErrorText(biggerThanPerc);
        else {
            if (errorText !== "")
                setErrorText("");
            setValue(value);
        }
    }

    const onLoanTermYearsChange = e => {
        if (e.target.value < 0)
            setErrorLoanTermYearsText(negativeText);
        else if (e.target.value > 30)
            setErrorLoanTermYearsText("Cannot be bigger than 30");
        else {
            if (errorLoanTermYearsText !== "")
                setErrorLoanTermYearsText("");
            setLoanTermYears(e.target.value);
        }
    }

    const onCalculate = (ev) => {
        ev.preventDefault();

        let mortgageCalculatorPayload = {
            propertyValue: Number(propertyValue) || null,
            downPayment: Number(downPayment) || null,
            interestRate: Number(interestRate) || null,
            loanTermYears: Number(loanTermYears) || null,
            startDate: startDate || null,
            pmi: Number(pmi) || null,
            propertyInsurance: Number(propertyInsurance) || null,
            monthlyHoa: Number(monthlyHoa) || null
        }

        props.onCalculate(mortgageCalculatorPayload);
    }

    useEffect(() => {
        if (props.data && props.breakdown) {
            setPropertyValue(propertyValue);
        }
    }, []);

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
                                        error={errorPropertyText === "" ? false : true}
                                        value={propertyValue}
                                        onChange={e => onNegativeChange(e, errorPropertyText, setErrorPropertyText, setPropertyValue)}
                                        helperText={errorPropertyText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Down payment"
                                        error={errorDownPaymentText === "" ? false : true}
                                        value={downPayment}
                                        onChange={e => onNegativeChange(e, errorDownPaymentText, setErrorDownPaymentText, setDownPayment)}
                                        helperText={errorDownPaymentText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Interest rate"
                                        error={errorInterestRateText === "" ? false : true}
                                        value={interestRate}
                                        onChange={e => onPercentageChange(e, errorInterestRateText, setErrorInterestRateText, setInterestRate)}
                                        helperText={errorInterestRateText}
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
                                        error={errorLoanTermYearsText === "" ? false : true}
                                        value={loanTermYears}
                                        helperText={errorLoanTermYearsText}
                                        onChange={onLoanTermYearsChange} />
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
                                        error={errorPmiText === "" ? false : true}
                                        value={pmi}
                                        onChange={e => onPercentageChange(e, errorPmiText, setErrorPmiText, setPmi)}
                                        helperText={errorPmiText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">%</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Property insurance"
                                        error={errorPropertyInsuranceText === "" ? false : true}
                                        value={propertyInsurance}
                                        onChange={e => onNegativeChange(e, errorPropertyInsuranceText, setErrorPropertyInsuranceText, setPropertyInsurance)}
                                        helperText={errorPropertyInsuranceText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Monthly HOA"
                                        error={errorMonthlyHoaText === "" ? false : true}
                                        value={monthlyHoa}
                                        onChange={e => onNegativeChange(e, errorMonthlyHoaText, setErrorMonthlyHoaText, setMonthlyHoa)}
                                        helperText={errorMonthlyHoaText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!isCalculateEnabled} >
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
                    <Grid container spacing={1}>
                        <h4>
                            <strong>Your results</strong>
                        </h4>
                    </Grid>
                    <Grid container spacing={1}>
                        <p>
                        Based on what you have entered into the form, we have calculated the following results:
                        </p>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"Monthly payment"} 
                            body={numberWithCommas(payment)} 
                            prefix={"$"}/>
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"Loan amount"} 
                            body={numberWithCommas(loanAmount)} 
                            prefix={"$"}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs>
                            <InPaper title={"Total principal paid"} 
                                body={numberWithCommas(Math.round(totalPrincipalPaid))} 
                                prefix={"$"} />
                        </Grid>

                        <Grid item xs>
                        <InPaper title={"Total interest paid"} 
                        body={numberWithCommas(Math.round(totalInterestPaid))} 
                        prefix={"$"}/>
                        </Grid>

                        <Grid item xs>
                            <InPaper title={"Total paid"} 
                            body={numberWithCommas(Math.round(totalPrincipalPaid + totalInterestPaid))} 
                            prefix={"$"}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"Start date"} 
                                body={new Date(first.paymentDate).toLocaleDateString()} />
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"End date"} 
                                body={new Date(last.paymentDate).toLocaleDateString()} />
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

                    <br />
                    The complete breakdown will show you exactly what is in each month from the start date. This can be helpful in order to further see into the numbers

                    <CompleteBreakdown data={props.data} show={showCompleteBreakdown} />
                </AiofPaper>

                <AiofPaper>
                    <Button color="primary" onClick={() => setShowYearlyCompleteBreakdown(!showYearlyCompleteBreakdown)}>
                        {showYearlyCompleteBreakdown === false ? "View yearly complete breakdown" : "Hide yearly complete breakdown"}
                    </Button>

                    <br />
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
                <hr />
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
                <hr />
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