import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { TextFieldInputAdornment } from '../Common/Inputs';
import { SquarePaper, InPaper, AiofLinearProgress, TextMain } from '../../style/mui';
import { FI_PAGE_LOADED, FI_BMI_IMPERIAL, FI_BMI_METRIC } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.fi,
    appName: state.common.appName,
    inProgress: state.fi.inProgress,
    bmiImperial: state.fi.bmiImperial,
    bmiMetric: state.fi.bmiMetric,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: FI_PAGE_LOADED }),
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
        props.onLoad();

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
                <SquarePaper variant="outlined" square>
                    <Grid container>
                        <Grid item xs>
                            <Typography variant="h1">
                                BMI calculator
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs>
                            <TextMain>
                                Your BMI information
                            </TextMain>
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitImperial}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextFieldInputAdornment
                                        label="Weight"
                                        value={imperialWeight}
                                        onChange={e => setImperialWeight(e.target.value)}
                                        adornmentValue={"lbs"} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextFieldInputAdornment
                                        label="Feet"
                                        value={imperialFeet}
                                        onChange={e => setImperialFeet(e.target.value)} />
                                </div>
                            </Grid>

                            <Grid item xs={4}>
                                <div className={classes.margin}>
                                    <TextFieldInputAdornment
                                        label="Inches"
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
                </SquarePaper>

                <BmiResult bmiImperial={props.bmiImperial} />

                <SquarePaper variant="outlined" square>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitMetric}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <div className={classes.margin}>
                                    <TextFieldInputAdornment
                                        label="Weight"
                                        value={metricWeight}
                                        onChange={e => setMetricWeight(e.target.value)}
                                        adornmentValue={"kgs"} />
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <div className={classes.margin}>
                                    <TextFieldInputAdornment
                                        label="Height"
                                        value={metricHeight}
                                        onChange={e => setMetricHeight(e.target.value)}
                                        adornmentValue={"cms"} />
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                    Calculate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </SquarePaper>

                <BmiMetricResult bmiMetric={props.bmiMetric} />

                <InProgressBar inProgress={props.inProgress} />

            </Container>
        </React.Fragment>
    );
}

const BmiResult = props => {
    if (props.bmiImperial) {
        return (
            <SquarePaper variant="outlined" square>
                <Grid container spacing={1} alignItems="center" justify="center">
                    <Grid item xs={4}>
                        <InPaper title={"BMI"}
                            body={props.bmiImperial.bmi} />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item sm>
                        <br />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item md>
                        <Guidelines />
                    </Grid>
                </Grid>
            </SquarePaper>
        );
    }
    else {
        return null;
    }
}

const BmiMetricResult = props => {
    if (props.bmiMetric) {
        return (
            <SquarePaper variant="outlined" square>
                <Grid container spacing={1} alignItems="center" justify="center">
                    <Grid item xs={4}>
                        <InPaper title={"BMI"}
                            body={props.bmiMetric.bmi} />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item sm>
                        <br />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item md>
                        <Guidelines />
                    </Grid>
                </Grid>
            </SquarePaper>
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

const Guidelines = () => {
    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs>
                    <InPaper title={"Underweight is less than"}
                        body={"18.5"} />
                </Grid>

                <Grid item xs>
                    <InPaper title={"Normal weight is between"}
                        body={"18.5 - 24.9"} />
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs>
                    <InPaper title={"Overweight is between"}
                        body={"25 - 29.9"} />
                </Grid>

                <Grid item xs>
                    <InPaper title={"Obesity greater than"}
                        body={"30"} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Bmi);