import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import { TextFieldInputAdornment, TextFieldMoneyInputAdornment, TextFieldPercInputAdornment } from '../Common/Inputs';
import { numberWithCommas } from '../Finance/Common';
import { SquarePaper, AiofLinearProgress, } from '../../style/mui';
import { FI_COAST_FIRE, FI_COAST_FIRE_RESET } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.fi,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.fi.inProgress,
    savings: state.fi.savings,
});

const mapDispatchToProps = dispatch => ({
    onPostSavings: (payload) =>
        dispatch({ type: FI_COAST_FIRE, payload: agent.Fi.coastSavings(payload) }),
    onResetSavings: () =>
        dispatch({ type: FI_COAST_FIRE_RESET })
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        display: 'flex',
    },
    textField: {
        marginTop: '-6px',
        paddingBottom: '3px',
        width: '50%',
    },
    resize: {
        fontSize: '.8125rem'
    },
    hr: {
        borderTop: '1px solid',
        marginTop: '0.25rem',
        color: theme.palette.grey.hr,
        opacity: '90%'
    },
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
    backButton: {
        marginRight: theme.spacing(1),
    },
}));

const CoastFireDescription = () => {
    return (
        <React.Fragment>
            <h5>What is Coast FIRE?</h5>
            <i>Financial Independence / Retire Early</i><br /><br />
            <p>
                Contrary to popular belief, the term <strong>Coast FIRE</strong> does not refer to achieving financial independence or early retirement while living on the coast.
                <br /><br />
                Rather, <strong>Coast FIRE</strong> is defined as having enough money invested at an early enough age that you no longer need to invest any more to achieve financial independence by age 65 (or whatever age you define as a retirement age).
                <br /><br />
                For example, suppose we define financial independence as having 25 times your annual expenses saved up. So, if you spend $40,000 per year then you need $1 million to be financially independent.
                <br /><br />
                Following a <strong>Coast FIRE</strong> approach, if you could save $182,000 by age 30 and simply not touch that money for 35 years, then it would eventually grow to $1 million by age 65 assuming a 5% annual rate of return after inflation.
                <br /><br />
                This is a simple example of <strong>Coast FIRE</strong>. Once you hit $182k in investments by age 30, you can simply “coast” to financial independence over the next 35 years without contributing any more of your savings to investments
                because you already have enough money invested and enough time on your side to let your investments grow to $1 million by age 65.
                <br />
            </p>
        </React.Fragment>
    );
}

const SavingsRateInputs = props => {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs>
                    <TextFieldPercInputAdornment
                        label="Initial interest rate"
                        value={props.initialInterestRate}
                        onChange={e => props.setInitialInterestRate(e.target.value)} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextFieldInputAdornment label="Start age"
                        value={props.startAge}
                        onChange={e => props.setStartAge(e.target.value)} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextFieldInputAdornment label="End age"
                        value={props.endAge}
                        onChange={e => props.setEndAge(e.target.value)} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <TextFieldMoneyInputAdornment label="Current balance"
                        value={props.currentBalance}
                        onChange={e => props.setCurrentBalance(e.target.value)} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const SavingsRateGenerator = props => {
    const classes = useStyles();

    const startAge = props.startAge ? Number(props.startAge) : 33
    const endAge = props.endAge ? Number(props.endAge) : 72

    let years = endAge - startAge
    let year = new Date().getFullYear()
    let savingsRateList = props.savingsRateList;
    let setSavingsRateList = props.setSavingsRateList;

    const onUpdateYearlyReturn = (index, yearlyReturn) => {
        let validYearlyReturn = 0;

        if (yearlyReturn < 0) {
            validYearlyReturn = 0;
        } else if (yearlyReturn > 100) {
            validYearlyReturn = 100;
        } else {
            validYearlyReturn = yearlyReturn;
        }

        const savingsRateListCopy = [...savingsRateList];
        savingsRateListCopy[index].yearlyReturn = validYearlyReturn
        setSavingsRateList(savingsRateListCopy)
    }
    const onUpdateContribution = (index, contribution) => {
        let validContribution = 0;
        let maxContribution = 10000000;

        if (contribution < -maxContribution) {
            validContribution = -maxContribution;
        } else if (contribution > maxContribution) {
            validContribution = maxContribution;
        } else {
            validContribution = contribution;
        }

        const savingsRateListCopy = [...savingsRateList];
        savingsRateListCopy[index].contribution = validContribution
        setSavingsRateList(savingsRateListCopy)
    }

    if (savingsRateList.length === 0) {
        const firstTenPercAge = startAge + Math.ceil(years * 0.1);
        const secondTenPercAge = firstTenPercAge + Math.ceil(years * 0.1);
        const thirdTenPercAge = secondTenPercAge + Math.ceil(years * 0.1);
        const nextFortyPercAge = thirdTenPercAge + Math.ceil(years * 0.4);
        const lastThirtyPercAge = nextFortyPercAge + Math.ceil(years * 0.3);

        for (var i = 0; i < years + 1; i++) {
            let sr = {}
            sr.age = startAge + i
            sr.year = year
            sr.yearlyReturn = 8

            if (startAge + i <= firstTenPercAge) {
                sr.contribution = 15000
            } else if (startAge + i <= secondTenPercAge) {
                sr.contribution = 30000
            } else if (startAge + i <= thirdTenPercAge) {
                sr.contribution = 70000
            } else if (startAge + i <= nextFortyPercAge) {
                sr.contribution = 0
            } else if (startAge + i <= lastThirtyPercAge) {
                sr.contribution = -100000
                sr.yearlyReturn = 6
            } else {
                sr.contribution = 0
            }
            year += 1
            savingsRateList.push(sr)
        }
    }

    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={1} className={classes.container}>
                <Grid item xs>
                    <strong>Age</strong>
                </Grid>

                <Grid item xs>
                    <strong>Year</strong>
                </Grid>

                <Grid item xs>
                    <strong>Contribution</strong>
                </Grid>

                <Grid item xs>
                    <strong>Yearly return</strong>
                </Grid>
            </Grid>
            {
                savingsRateList.map((sr, index) => {
                    return (
                        <Grid key={sr.age} container spacing={1} className={classes.container}>
                            <Grid item xs>
                                {sr.age}
                            </Grid>

                            <Grid item xs>
                                {sr.year}
                            </Grid>

                            <Grid item xs>
                                <TextField className={classes.textField}
                                    value={sr.contribution}
                                    onChange={e => onUpdateContribution(index, e.target.value)}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }} />
                            </Grid>

                            <Grid item xs>
                                <TextField className={classes.textField}
                                    value={sr.yearlyReturn}
                                    onChange={e => onUpdateYearlyReturn(index, e.target.value)}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }} />
                            </Grid>
                        </Grid>
                    );
                })
            }
        </React.Fragment>
    );
}

const getSteps = () => {
    return ["Basic information", "Customize each year"];
}
const StepContent = props => {
    const classes = useStyles();

    switch (props.stepIndex) {
        case 0:
            return (
                <React.Fragment>
                    <CoastFireDescription />
                    <hr className={classes.hr} />
                    <SavingsRateInputs
                        startAge={props.startAge} setStartAge={props.setStartAge}
                        endAge={props.endAge} setEndAge={props.setEndAge}
                        initialInterestRate={props.initialInterestRate} setInitialInterestRate={props.setInitialInterestRate}
                        currentBalance={props.currentBalance} setCurrentBalance={props.setCurrentBalance} />
                </React.Fragment>
            );
        case 1:
            return <SavingsRateGenerator
                startAge={props.startAge}
                endAge={props.endAge}
                savingsRateList={props.savingsRateList} setSavingsRateList={props.setSavingsRateList} />;
        default:
            return 'Unknown stepIndex';
    }
}

const FinalStepContent = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container direction="column" spacing={0} className={classes.container}>
                <Grid item xs>
                    All steps completed. You can now submit your request to calculate your Coast FIRE savings
                </Grid>

                <Grid item xs>
                    <br />
                </Grid>

                <Grid item xs>
                    <strong>Current balance</strong>
                </Grid>
                <Grid item xs>
                    ${numberWithCommas(props.currentBalance)}
                </Grid>

                <Grid item xs>
                    <br />
                </Grid>

                <Grid item xs>
                    <strong>Initial interest rate</strong>
                </Grid>
                <Grid item xs>
                    {props.initialInterestRate}%
                </Grid>

                <Grid item xs>
                    <br />
                </Grid>

                <Grid item xs>
                    <strong>Start age</strong>
                </Grid>
                <Grid item xs>
                    {props.startAge}
                </Grid>

                <Grid item xs>
                    <br />
                </Grid>

                <Grid item xs>
                    <strong>End age</strong>
                </Grid>
                <Grid item xs>
                    {props.endAge}
                </Grid>

                <Grid item xs>
                    <br />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const SavingsResults = props => {
    const classes = useStyles();

    if (props.savings) {
        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1} className={classes.container}>
                        <Grid item xs>
                            <strong>Age</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>Year</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>Contribution</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>Yearly return</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>Total</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>Initial earning</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>4% withdraw</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>3% withdraw</strong>
                        </Grid>

                        <Grid item xs>
                            <strong>2% withdraw</strong>
                        </Grid>
                    </Grid>
                    {
                        props.savings.map(sr => {
                            return (
                                <Grid key={sr.age} container spacing={1} className={classes.container}>
                                    <Grid item xs>
                                        {sr.age}
                                    </Grid>

                                    <Grid item xs>
                                        {sr.year}
                                    </Grid>

                                    <Grid item xs>
                                        ${numberWithCommas(sr.contribution)}
                                    </Grid>

                                    <Grid item xs>
                                        {sr.yearlyReturn}%
                                    </Grid>

                                    <Grid item xs>
                                        ${numberWithCommas(sr.total)}
                                    </Grid>

                                    <Grid item xs>
                                        ${numberWithCommas(sr.initialEarning)}
                                    </Grid>

                                    <Grid item xs>
                                        ${numberWithCommas(sr.withdrawFour)}
                                    </Grid>

                                    <Grid item xs>
                                        ${numberWithCommas(sr.withdrawThree)}
                                    </Grid>

                                    <Grid item xs>
                                        ${numberWithCommas(sr.withdrawTwo)}
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </SquarePaper>
            </React.Fragment>
        );
    }
    else if (props.inProgress) {
        return (
            <AiofLinearProgress />
        );
    }
    else {
        return null;
    }
}

const SavingsRateStepper = props => {
    const classes = useStyles();

    const [startAge, setStartAge] = useState(33);
    const [endAge, setEndAge] = useState(72);
    const [initialInterestRate, setInitialInterestRate] = useState(2);
    const [currentBalance, setCurrentBalance] = useState(100000);
    const [savingsRateList, setSavingsRateList] = useState([]);

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setSavingsRateList([]);
        setActiveStep(0);

        props.onResetSavings();
    };

    const handleCalculate = () => {
        const savingsRateListCopy = savingsRateList;

        for (var i = 0; i < savingsRateListCopy.length; i++) {
            savingsRateListCopy[i].yearlyReturn = savingsRateListCopy[i].yearlyReturn > 1 ? savingsRateListCopy[i].yearlyReturn / 100 : savingsRateListCopy[i].yearlyReturn;
        }

        const savings = {
            initialInterestRate: initialInterestRate > 1 ? initialInterestRate / 100 : initialInterestRate,
            currentBalance: currentBalance,
            savings: savingsRateListCopy
        };

        props.onPostSavings(savings);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Coast FIRE savings</title>
            </Helmet>

            <Container maxWidth="xl">
                <SquarePaper variant="outlined" square>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <hr className={classes.hr} />
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <FinalStepContent currentBalance={currentBalance}
                                        initialInterestRate={initialInterestRate}
                                        startAge={startAge}
                                        endAge={endAge} />

                                    <hr className={classes.hr} />
                                    <Button
                                        variant="outlined"
                                        onClick={handleReset}
                                        className={classes.backButton}>
                                        Reset
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleCalculate}>
                                        Calculate
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <StepContent
                                        stepIndex={activeStep}
                                        startAge={startAge} setStartAge={setStartAge}
                                        endAge={endAge} setEndAge={setEndAge}
                                        initialInterestRate={initialInterestRate} setInitialInterestRate={setInitialInterestRate}
                                        currentBalance={currentBalance} setCurrentBalance={setCurrentBalance}
                                        savingsRateList={savingsRateList} setSavingsRateList={setSavingsRateList} />
                                    <div>
                                        <hr className={classes.hr} />
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}>
                                            Back
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </SquarePaper>

                <SavingsResults inProgress={props.inProgress} savings={props.savings} />

            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SavingsRateStepper);