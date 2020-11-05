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

const savingsRateGenerator = props => {
    const classes = useStyles();

    const startAge = props.startAge ? Number(props.startAge) : 33
    const endAge = props.endAge ? Number(props.endAge) : 36
    const currentBalance = props.currentBalance ? Number(props.currentBalance) : 100000

    let years = endAge - startAge
    let year = new Date().getFullYear()
    let [savingsRateList, setSavingsRateList] = useState([]);

    const handleYearlyReturnChange = (i, yearlyReturn) => {
        savingsRateList[i].yearlyReturn = yearlyReturn
        setSavingsRateList(savingsRateList)
    }

    for (var i = 0; i < years + 1; i++) {
        let sr = {}
        sr.age = startAge + i
        sr.year = year
        sr.yearlyReturn = 0.08
        year += 1
        savingsRateList.push(sr)
    }

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
                        <strong>Yearly return</strong>
                    </Grid>
                </Grid>
                {
                    savingsRateList.map(sr => {
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
                                        fullWidth
                                        value={sr.yearlyReturn}
                                        onChange={e => handleYearlyReturnChange(sr.age - startAge, e.target.value)}
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

export default savingsRateGenerator;