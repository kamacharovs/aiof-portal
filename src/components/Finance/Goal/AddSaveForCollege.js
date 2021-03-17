import React, { useState } from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';
import 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
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
    DefaultDarkTeal
} from '../../../style/mui';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    select: {
        minWidth: 'flex',
    },
}));

function getSteps() {
    return [
        'Generic details',
        'Cost, age and years',
        'College name, tuition increase and beginning age'
    ];
}

function getStepContent(props, stepIndex) {
    const classes = useStyles();
    const date = new Date();
    const types = props.goalCollegeTypes || [];
    const defaultPlannedDate = new Date(date.setMonth(date.getMonth() + 3));

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(1000);
    const [currentAmount, setCurrentAmount] = useState(100);
    const [monthlyContribution, setMonthlyContribution] = useState(150);
    const [plannedDate, setPlannedDate] = useState(defaultPlannedDate);
    const [type, setType] = useState("");
    const [costPerYear, setCostPerYear] = useState(15000);
    const [studentAge, setStudentAge] = useState(10);
    const [years, setYears] = useState(4);
    const [collegeName, setCollegeName] = useState("");
    const [annualCostIncrease, setAnnualCostIncrease] = useState(0.04);
    const [beginningCollegeAge, setBeginningCollegeAge] = useState(18);

    const handleSetValue = (e, setValue) => {
        setValue(e.target.value);
    }
    const handlePlannedDate = (date) => {
        setPlannedDate(date);
    }

    switch (stepIndex) {
        case 0:
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
            return (
                <React.Fragment>
                    <Grid container spacing={3}>
                        <FormControl className={classes.select}>
                            <VerticalSelect
                                header={"What is the type of the college?"}
                                required
                                select={
                                    <Select
                                        required
                                        value={type}
                                        onChange={e => setType(e.target.value)}
                                    >
                                        {
                                            types.map(t => {
                                                return (
                                                    <MenuItem key={t} value={t}>{t}</MenuItem>
                                                );
                                            })
                                        }
                                    </Select>}
                            />
                        </FormControl>

                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the cost per year?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        value={costPerYear}
                                        onChange={e => handleSetValue(e, setCostPerYear)}
                                    />
                                } />
                        </Grid>

                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the student's age?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        value={studentAge}
                                        onChange={e => handleSetValue(e, setStudentAge)}
                                    />
                                } />
                        </Grid>

                        <Grid item sm>
                            <VerticalTextField
                                header={"How many years is the student attending college for?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        value={years}
                                        onChange={e => handleSetValue(e, setYears)}
                                    />
                                } />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
        case 2:
            return (
                <React.Fragment>
                    <Grid container spacing={3}>
                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the name of this college?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        value={collegeName}
                                        onChange={e => handleSetValue(e, setCollegeName)}
                                    />
                                } />
                        </Grid>

                        <Grid item sm>
                            <VerticalTextField
                                header={"What is the annual cost of tuition increase?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        value={annualCostIncrease}
                                        onChange={e => handleSetValue(e, setAnnualCostIncrease)}
                                    />
                                } />
                        </Grid>

                        <Grid item sm>
                            <VerticalTextField
                                header={"At what age is the student starting college?"}
                                required
                                textField={
                                    <TextField
                                        required
                                        value={beginningCollegeAge}
                                        onChange={e => handleSetValue(e, setBeginningCollegeAge)}
                                    />
                                } />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
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
                                    {getStepContent(props, activeStep)}
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            onClick={handleNext}
                                            className={classes.button}>
                                            {activeStep === steps.length - 1 ? 'Add' : 'Next'}
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