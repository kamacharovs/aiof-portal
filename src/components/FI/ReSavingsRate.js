import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


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
    margin: {
        margin: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const savingsRate = {
    age: null || '',
    year: null || '',
    contribution: null || '',
    yearlyReturn: null || '',
    total: null || '',
    initialEarning: null || '',
    withdrawFour: null || '',
    withdrawThree: null || '',
    withdrawTwo: null || '',
    presentValueFour: null || '',
    presentValueThree: null || '',
    presentValueTwo: null || ''
}

const savingsRateInputs = props => {
    const classes = useStyles();

    const [initialInterestRate, setInitialInterestRate] = useState(2);
    const [startAge, setStartAge] = useState(33);
    const [endAge, setEndAge] = useState(72);
    const [currentBalance, setCurrentBalance] = useState(100000);

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ArrowUpwardIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="Initial interest rate"
                                    value={initialInterestRate}
                                    onChange={e => setInitialInterestRate(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ArrowUpwardIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="Start age"
                                    value={startAge}
                                    onChange={e => setStartAge(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <ArrowUpwardIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="End age"
                                    value={endAge}
                                    onChange={e => setEndAge(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AttachMoneyIcon />
                            </Grid>
                            <Grid item>
                                <TextField label="Current balance"
                                    value={currentBalance}
                                    onChange={e => setCurrentBalance(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const savingsRateGenerator = props => {
    const classes = useStyles();

    const startAge = props.startAge ? Number(props.startAge) : 33
    const endAge = props.endAge ? Number(props.endAge) : 72
    const currentBalance = props.currentBalance ? Number(props.currentBalance) : 100000

    let years = endAge - startAge
    let year = new Date().getFullYear()
    let [savingsRateList, setSavingsRateList] = useState([]);

    const onUpdateYearlyReturn = (index, yearlyReturn) => {
        const savingsRateListCopy = [...savingsRateList];
        savingsRateListCopy[index].yearlyReturn = yearlyReturn
        setSavingsRateList(savingsRateListCopy)
    }
    const onUpdateContribution = (index, contribution) => {
        const savingsRateListCopy = [...savingsRateList];
        savingsRateListCopy[index].contribution = contribution
        setSavingsRateList(savingsRateListCopy)
    }

    if (savingsRateList.length === 0) {
        for (var i = 0; i < years + 1; i++) {
            let sr = {}
            sr.age = startAge + i
            sr.year = year
            sr.contribution = 15000
            sr.yearlyReturn = 8
            year += 1
            savingsRateList.push(sr)
        }
    }

    useEffect(() => {
    }, []);

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Grid container spacing={1} className={classes.container}>
                    <Grid item xs={3}>
                        <strong>Age</strong>
                    </Grid>

                    <Grid item xs={3}>
                        <strong>Year</strong>
                    </Grid>

                    <Grid item xs={3}>
                        <strong>Contribution</strong>
                    </Grid>

                    <Grid item xs={3}>
                        <strong>Yearly return</strong>
                    </Grid>
                </Grid>
                {
                    savingsRateList.map((sr, index) => {
                        return (
                            <Grid key={sr.age} container spacing={1} className={classes.container}>
                                <Grid item xs={3}>
                                    {sr.age}
                                </Grid>

                                <Grid item xs={3}>
                                    {sr.year}
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField className={classes.textField}
                                        value={sr.contribution}
                                        onChange={e => onUpdateContribution(index, e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextField className={classes.textField}
                                        value={sr.yearlyReturn}
                                        onChange={e => onUpdateYearlyReturn(index, e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </Container>
        </React.Fragment>
    );
}

export default savingsRateInputs;