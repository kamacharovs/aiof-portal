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
import { AiofLinearProgress, InPaper, SquarePaper, DefaultRedColor, DefaultGreenColor, ThinText } from '../../style/mui';
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
        width: '100%',
    },
    margin: {
        margin: theme.spacing(1),
        maxWidth: '100%',
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
    },
    strong: {
        fontSize: '0.85rem',
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

    const [errorInterestText, setErrorInterestText] = useState("");
    const [errorStartYearText, setErrorStartYearText] = useState("");
    const [errorEndYearText, setErrorEndYearText] = useState("");
    const [errorCompoundingPeriodsText, setErrorCompoundingPeriodsText] = useState("");
    const [errorFourOhOneKStartingAmountText, setErrorFourOhOneKStartingAmountText] = useState("");
    const [errorFourOhOneKMonthlyContributionsText, setErrorFourOhOneKMonthlyContributionsText] = useState("");
    const [errorRothIraStartingAmountText, setErrorRothIraStartingAmountText] = useState("");
    const [errorRothIraMonthlyContributionsText, setErrorRothIraMonthlyContributionsText] = useState("");
    const [errorBrokerageStartingAmountText, setErrorBrokerageStartingAmountText] = useState("");
    const [errorBrokerageMonthlyContributionsText, setErrorBrokerageMonthlyContributionsText] = useState("");
    const negativeText = "Value cannot be negative";
    const biggerThanPerc = "Value cannot be bigger than 100";

    const isCalculateEnabled = errorInterestText === ""
        && errorStartYearText === ""
        && errorEndYearText === ""
        && errorCompoundingPeriodsText === ""
        && errorFourOhOneKStartingAmountText === ""
        && errorFourOhOneKMonthlyContributionsText === ""
        && errorRothIraStartingAmountText === ""
        && errorRothIraMonthlyContributionsText === ""
        && errorBrokerageStartingAmountText === ""
        && errorBrokerageMonthlyContributionsText === "";

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
                    <h5><strong>Common investments calculator</strong></h5>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={onCalculate}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Interest"
                                        error={errorInterestText === "" ? false : true}
                                        value={interest}
                                        onChange={e => onPercentageChange(e, errorInterestText, setErrorInterestText, setInterest)}
                                        helperText={errorInterestText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">%</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Start year"
                                        error={errorStartYearText === "" ? false : true}
                                        value={startYear}
                                        onChange={e => onNegativeChange(e, errorStartYearText, setErrorStartYearText, setStartYear)}
                                        helperText={errorStartYearText} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="End year"
                                        error={errorEndYearText === "" ? false : true}
                                        value={endYear}
                                        onChange={e => onNegativeChange(e, errorEndYearText, setErrorEndYearText, setEndYear)}
                                        helperText={errorEndYearText} />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Compounding periods"
                                        error={errorCompoundingPeriodsText === "" ? false : true}
                                        value={compoundingPeriods}
                                        onChange={e => onNegativeChange(e, errorCompoundingPeriodsText, setErrorCompoundingPeriodsText, setCompoundingPeriods)}
                                        helperText={errorCompoundingPeriodsText} />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs>
                                <br />
                                <strong className={classes.strong}>401(k)</strong>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Starting amount"
                                        error={errorFourOhOneKStartingAmountText === "" ? false : true}
                                        value={fourOhOneKStartingAmount}
                                        onChange={e => onNegativeChange(e, errorFourOhOneKStartingAmountText, setErrorFourOhOneKStartingAmountText, setFourOhOneKStartingAmount)}
                                        helperText={errorFourOhOneKStartingAmountText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Monthly contribution"
                                        error={errorFourOhOneKMonthlyContributionsText === "" ? false : true}
                                        value={fourOhOneKMonthlyContributions}
                                        onChange={e => onNegativeChange(e, errorFourOhOneKMonthlyContributionsText, setErrorFourOhOneKMonthlyContributionsText, setFourOhOneKMonthlyContributions)}
                                        helperText={errorFourOhOneKMonthlyContributionsText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs>
                                <br />
                                <strong className={classes.strong}>Roth IRA</strong>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Starting amount"
                                        error={errorRothIraStartingAmountText === "" ? false : true}
                                        value={rothIraStartingAmount}
                                        onChange={e => onNegativeChange(e, errorRothIraStartingAmountText, setErrorRothIraStartingAmountText, setRothIraStartingAmount)}
                                        helperText={errorRothIraStartingAmountText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Monthly contribution"
                                        error={errorRothIraMonthlyContributionsText === "" ? false : true}
                                        value={rothIraMonthlyContributions}
                                        onChange={e => onNegativeChange(e, errorRothIraMonthlyContributionsText, setErrorRothIraMonthlyContributionsText, setRothIraMonthlyContributions)}
                                        helperText={errorRothIraMonthlyContributionsText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs>
                                <br />
                                <strong className={classes.strong}>Brokerage account</strong>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Starting amount"
                                        error={errorBrokerageStartingAmountText === "" ? false : true}
                                        value={brokerageStartingAmount}
                                        onChange={e => onNegativeChange(e, errorBrokerageStartingAmountText, setErrorBrokerageStartingAmountText, setBrokerageStartingAmount)}
                                        helperText={errorBrokerageStartingAmountText}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Monthly contribution"
                                        error={errorBrokerageMonthlyContributionsText === "" ? false : true}
                                        value={brokerageMonthlyContributions}
                                        onChange={e => onNegativeChange(e, errorBrokerageMonthlyContributionsText, setErrorBrokerageMonthlyContributionsText, setBrokerageMonthlyContributions)}
                                        helperText={errorBrokerageMonthlyContributionsText}
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
                </SquarePaper>

                <CommonInvestmentsResult commonInvestments={props.commonInvestments} />

                <InProgressBar inProgress={props.inProgress} />

            </Container>
        </React.Fragment>
    );
}

const CommonInvestmentsResult = props => {
    if (props.commonInvestments) {
        const classes = useStyles();

        const commonInvestments = props.commonInvestments;
        const lastYearResults = commonInvestments[commonInvestments.length - 1];

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <h4>
                            <strong>Your results</strong>
                        </h4>
                    </Grid>
                    <Grid container spacing={1}>
                        <ThinText>Based on what you have entered into the form, we have calculated the following results</ThinText>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"Year"}
                                body={lastYearResults.year} />
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"Compounding periods"}
                                body={lastYearResults.compoundingPeriods} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"Total"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.total)}</div>} />
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"Total monthly contributions"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.totalMonthlyContributions)}</div>} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"401(k)"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.fourohoneK)}</div>} />
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"401(k) monthly contributions"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.fourohoneKMonthlyContributions)}</div>} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"Roth IRA"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.rothIra)}</div>} />
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"Roth IRA monthly contributions"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.rothIraMonthlyContributions)}</div>} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <InPaper title={"Brokerage"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.brokerage)}</div>} />
                        </Grid>

                        <Grid item xs={4}>
                            <InPaper title={"Brokerage monthly contributions"}
                                body={<div className={classes.green}>${numberWithCommas(lastYearResults.brokerageMonthlyContributions)}</div>} />
                        </Grid>
                    </Grid>
                </SquarePaper>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommonInvestments);