import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { AiofPaper } from '../style/mui';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const mapStateToProps = state => ({
    ...state.auth,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class RegisterStepper extends React.Component {
    constructor() {
        super();

        this.state = {
            activeStep: 0,
            prevActiveStep: 0,
            gender: '',
            dateOfBirth: '01/01/1999',
            age: '',
            grossSalary: '',
        }

        this.classes = makeStyles((theme) => ({
            root: {
                width: '100%',
            },
            halfWidth: {
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

        this.getSteps = () => {
            return ['Profile', 'Assets', 'Liabilities'];
        }

        this.steps = this.getSteps();

        this.handleNext = () => {
            this.setState({ activeStep: this.state.activeStep + 1 });
            this.setState({ prevActiveStep: this.state.activeStep - 1 });
        };

        this.handleBack = () => {
            this.setState({ activeStep: this.state.activeStep - 1 });
            this.setState({ prevActiveStep: this.state.prevActiveStep - 1 });
        };

        this.handleReset = () => {
            this.setState({ activeStep: 0 });
            this.setState({ prevActiveStep: 0 });
        };

        this.handleSave = () => {
            //TODO: Call API to save
        }

        this.updateState = field => ev => {
            const state = this.state;
            const newState = Object.assign({}, state, { [field]: ev.target.value });
            this.setState(newState);
        };

        this.getStepContent = () => {
            switch (this.state.activeStep) {
                case 0:         //Profile
                    return (
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="gender-label"
                                        id="gender-select"
                                        value={this.state.gender}
                                        onChange={this.updateState('gender')}
                                    >
                                        <MenuItem value={"male"}>Male</MenuItem>
                                        <MenuItem value={"female"}>Female</MenuItem>
                                        <MenuItem value={"other"}>Other</MenuItem>
                                    </Select>
                                </Grid>

                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            margin="normal"
                                            id="dob-date-picker"
                                            label="Date of birth"
                                            format="MM/dd/yyyy"
                                            value={this.state.dateOfBirth}
                                            onChange={this.updateState('dateOfBirth')}
                                            KeyboardButtonProps={{
                                                'date of birth': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        value={this.state.age}
                                        onChange={this.updateState('age')} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <div className={this.classes.margin}>
                                        <TextField
                                            fullWidth
                                            label="Gross salary"
                                            value={this.state.grossSalary}
                                            onChange={this.updateState('grossSalary')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }} />
                                    </div>
                                </Grid>



                            </Grid>
                        </React.Fragment>
                    );
                case 1:
                    return (
                        <Grid container spacing={3}>

                            <Grid item md={12} style={{ textAlign: "center" }}>
                                <h3>Assets</h3>
                                <hr />
                            </Grid>

                        </Grid>
                    );
                case 2:
                    return (
                        <Grid container spacing={3}>

                            <Grid item md={12} style={{ textAlign: "center" }}>
                                <h3>Liabilities</h3>
                                <hr />
                            </Grid>

                        </Grid>
                    );
                default:
                    return 'Unknown stepIndex';
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.props.appName} | Update</title>
                </Helmet>
                <div className={this.classes.root}>
                    <Stepper activeStep={this.state.activeStep} alternativeLabel>
                        {this.steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Container maxWidth="md">
                        <AiofPaper elevation={3}>
                            {this.state.activeStep === this.steps.length ? (
                                <div>
                                    <p>All steps completed</p>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                    <Button onClick={this.handleSave}>Save</Button>
                                </div>
                            ) : (
                                    <div>
                                        <AiofPaper elevation={3}>
                                            {this.getStepContent}
                                        </AiofPaper>
                                        <hr />
                                        <div>
                                            <Button
                                                disabled={this.state.activeStep === 0}
                                                onClick={this.handleBack}
                                                className={this.classes.backButton} >
                                                Back
                                        </Button>
                                            <Button
                                                onClick={this.handleNext}
                                                className={this.classes.backButton} >
                                                {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                        </AiofPaper>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepper);