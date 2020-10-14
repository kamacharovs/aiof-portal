import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { FI_BMI_IMPERIAL, FI_BMI_METRIC } from '../../constants/actionTypes';

import { AiofPaper } from '../../style/mui';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
    ...state.fi,
    appName: state.common.appName,
    bmiImperial: state.fi.bmiImperial,
    bmiMetric: state.fi.bmiMetric,
});

const mapDispatchToProps = dispatch => ({
    onImperialSubmit: bmi =>
        dispatch({ type: FI_BMI_IMPERIAL, payload: agent.Fi.bmiImperial(bmi), bmiPayload: bmi }),
    onMetricSubmit: bmi =>
        dispatch({ type: FI_BMI_METRIC, payload: agent.Fi.bmiMetric(bmi), bmiPayload: bmi })
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


const Bmi = (props) => {
    const classes = useStyles();
    const [imperialWeight, setImperialWeight] = useState(165);
    const [imperialFeet, setImperialFeet] = useState(6);
    const [imperialInches, setImperialInches] = useState(0);
    const [metricWeight, setMetricWeight] = useState(75);
    const [metricHeight, setMetricHeight] = useState(183);

    const submitImperial = ev => {
        ev.preventDefault();

        let imperialPayload = {
            weight: imperialWeight,
            feet: imperialFeet,
            inches: imperialInches
        };

        props.onImperialSubmit(imperialPayload);
    }

    const submitMetric = ev => {
        ev.preventDefault();

        let metricPayload = {
            weight: metricWeight,
            height: metricHeight
        }

        props.onMetricSubmit(metricPayload);
    }

    useEffect(() => {
        if (props.bmiImperial) {
            setImperialWeight(props.bmiImperial.weight);
            setImperialFeet(props.bmiImperial.feet);
            setImperialInches(props.bmiImperial.inches);
        }
        if (props.bmiMetric) {
            setMetricWeight(props.bmiMetric.weight);
            setMetricHeight(props.bmiMetric.height);
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | BMI</title>
            </Helmet>

            <Container maxWidth="sm">
                <AiofPaper elevation={3}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitImperial}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Weight"
                                        value={imperialWeight}
                                        onChange={e => setImperialWeight(e.target.value)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">lbs</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Feet"
                                        value={imperialFeet}
                                        onChange={e => setImperialFeet(e.target.value)} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextField label="Inches"
                                        value={imperialInches}
                                        onChange={e => setImperialInches(e.target.value)} />
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                    Calculate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </AiofPaper>

                <BmiResult bmiImperial={props.bmiImperial} />

                <AiofPaper elevation={3}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitMetric}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <div className={classes.margin}>
                                    <TextField label="Weight"
                                        value={metricWeight}
                                        onChange={e => setMetricWeight(e.target.value)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">kgs</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <div className={classes.margin}>
                                    <TextField label="Height"
                                        value={metricHeight}
                                        onChange={e => setMetricHeight(e.target.value)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">cms</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                    Calculate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </AiofPaper>

                <BmiMetricResult bmiMetric={props.bmiMetric} />

            </Container>
        </React.Fragment>
    );
}

const BmiResult = (props) => {
    if (props.bmiImperial) {
        return (
            <AiofPaper elevation={3}>
                <Grid container spacing={1}>
                    <Grid item xs={6} align="left">
                        BMI:
                    </Grid>
                    <Grid item xs={6} align="right">
                        {props.bmiImperial.bmi}
                    </Grid>

                    <Grid item md={12}>
                        <Guidelines />
                    </Grid>
                </Grid>
            </AiofPaper>
        );
    }

    return null;
}

const BmiMetricResult = (props) => {
    if (props.bmiMetric) {
        return (
            <AiofPaper elevation={3}>
                <Grid container spacing={1}>
                    <Grid item xs={6} align="left">
                        BMI:
                    </Grid>
                    <Grid item xs={6} align="right">
                        {props.bmiMetric.bmi}
                    </Grid>

                    <Grid item md={12}>
                        <Guidelines />
                    </Grid>
                </Grid>
            </AiofPaper>
        );
    }

    return null;
}

const Guidelines = () => {
    return (
        <React.Fragment>
            <hr />
            <Grid container spacing={1}>
                <Grid item xs={6} align="left">
                    Underweight is less than
             </Grid>
                <Grid item xs={6} align="right">
                    <b>18.5</b>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={6} align="left">
                    Normal weight is between
                </Grid>
                <Grid item xs={6} align="right">
                    <b>18.5</b> and <b>24.9</b>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={6} align="left">
                    Overweight is between
                </Grid>
                <Grid item xs={6} align="right">
                    <b>25</b> and <b>29.9</b>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={6} align="left">
                    Obesity greater than
                </Grid>
                <Grid item xs={6} align="right">
                    <b>30</b>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Bmi);