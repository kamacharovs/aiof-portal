import React, { useState } from 'react';

import { connect } from 'react-redux';
import agent from '../../../agent';
import 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
    SquarePaper, AlternateButton, VerticalTextField, VerticalSelect,
    DefaultDarkTeal, DefaultRedColor, DefaultGreenColor
} from '../../../style/mui';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return [
        'Generic details',
        'Create an ad group',
        'Create an ad'
    ];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            const date = new Date();
            const defaultPlannedDate = new Date(date.setMonth(date.getMonth() + 3));

            const [name, setName] = useState("");
            const [amount, setAmount] = useState(1000);
            const [currentAmount, setCurrentAmount] = useState(100);
            const [monthlyContribution, setMonthlyContribution] = useState(150);
            const [plannedDate, setPlannedDate] = useState(defaultPlannedDate);

            const handleSetValue = (e, setValue) => {
                setValue(e.target.value);
            }
            const handlePlannedDate = (date) => {
                setPlannedDate(date);
            }

            return (
                <React.Fragment>
                    <Grid container spacing={3}>
                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the name of this goal?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        placeholder="Save money"
                                        value={name}
                                        onChange={e => handleSetValue(e, setName)}
                                    />
                                } />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the planned date for this goal?"}
                                required
                                textField={
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            required
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            value={plannedDate}
                                            onChange={handlePlannedDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'planned date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                } />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item sm>
                            <VerticalTextField
                                header={"What will be the final amount towards this goal?"}
                                textField={
                                    <TextField
                                        value={amount}
                                        onChange={e => handleSetValue(e, setAmount)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                    />
                                } />
                        </Grid>

                        <Grid item sm>
                            <VerticalTextField
                                header={"What is your current amount towards this goal?"}
                                textField={
                                    <TextField
                                        value={currentAmount}
                                        onChange={e => handleSetValue(e, setCurrentAmount)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                    />
                                } />
                        </Grid>

                        <Grid item sm>
                            <VerticalTextField
                                header={"What will your monthly contribution be towards this goal?"}
                                textField={
                                    <TextField
                                        value={monthlyContribution}
                                        onChange={e => handleSetValue(e, setMonthlyContribution)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }}
                                    />
                                } />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown stepIndex';
    }
}

export const AddSaveForCollege = props => {
    if (props.showSaveForCollege) {
        const classes = useStyles();
        const [activeStep, setActiveStep] = useState(0);
        const steps = getSteps();

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleReset = () => {
            setActiveStep(0);
        };

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <div className={classes.root}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item sm>
                                    <div style={{ color: DefaultDarkTeal }}>
                                        <h4><strong>Save for college</strong></h4>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>All steps completed</Typography>
                                    <Button onClick={handleReset}>Reset</Button>
                                </div>
                            ) : (
                                <div>
                                    {getStepContent(activeStep)}
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            onClick={handleNext}
                                            className={classes.backButton}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}