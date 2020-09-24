import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../agent';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { AiofPaper } from '../style/mui';
import { PROFILE_STEPPER_PAGE_LOADED } from '../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.auth,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload => 
        dispatch({ type: PROFILE_STEPPER_PAGE_LOADED, payload }),
});

class ProfileStepper extends React.Component {
    constructor() {
        super();

        this.state = {
            activeStep: 0,
            prevActiveStep: 0,
            gender: '',
            maritalStatus: '',
            occupation: '',
            occupationIndustry: '',
            age: '',
            grossSalary: '',
            householdIncome: '',
            householdAdults: 1,
            householdChildren: 0,
            retirementContributionsPreTax: '',
        }

        this.classes = makeStyles((theme) => ({
            root: {
                width: '100%',
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
            const currentState = Object.assign({}, this.state);
            const profile = {}

            profile.gender = currentState.gender ? currentState.gender : null;
            profile.age = currentState.age ? parseInt(currentState.age, 10) : null;
            profile.occupation = currentState.occupation ? currentState.occupation : null;
            profile.occupationIndustry = currentState.occupationIndustry ? currentState.occupationIndustry : null;
            profile.grossSalary = currentState.grossSalary ? Number(currentState.grossSalary) : null;
            profile.maritalStatus = currentState.maritalStatus ? currentState.maritalStatus.value : null;
            profile.householdIncome = currentState.householdIncome ? Number(currentState.householdIncome) : null;
            profile.householdAdults = currentState.householdAdults ? parseInt(currentState.householdAdults.value, 10) : null;
            profile.householdChildren = currentState.householdChildren ? parseInt(currentState.householdChildren.value, 10) : null;
            profile.retirementContributionsPreTax = currentState.retirementContributionsPreTax ? Number(currentState.retirementContributionsPreTax) : null;

            agent.UserProfile.upsert("gkama", profile)
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
                            <p>
                                Please update your profile. These fields are all <i>optional</i>. However, they will help <b>{this.props.appName}</b> generate better financial results for you
                            </p>
                            <hr/>

                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <div>
                                        <FormControl style={{ minWidth: "100%" }}>
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
                                        </FormControl>
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        value={this.state.age}
                                        onChange={this.updateState('age')} />
                                </Grid>

                                <Grid item xs={4}>
                                    <div>
                                        <FormControl style={{ minWidth: "100%" }}>
                                            <InputLabel id="marital-status-label">Marital status</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="marital-status-label"
                                                id="marital-status-select"
                                                value={this.state.maritalStatus}
                                                onChange={this.updateState('maritalStatus')}
                                            >
                                                <MenuItem value={"single"}>Single</MenuItem>
                                                <MenuItem value={"married"}>Married</MenuItem>
                                                <MenuItem value={"other"}>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                            <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Occupation"
                                        value={this.state.occupation}
                                        onChange={this.updateState('occupation')} />
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Occupation industry"
                                        value={this.state.occupationIndustry}
                                        onChange={this.updateState('occupationIndustry')} />
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
                                        <FormHelperText>Post-tax</FormHelperText>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <div className={this.classes.margin}>
                                        <TextField
                                            fullWidth
                                            label="Household income"
                                            value={this.state.householdIncome}
                                            onChange={this.updateState('householdIncome')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }} />
                                        <FormHelperText>Pre-tax</FormHelperText>
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <div>
                                        <FormControl style={{ minWidth: "100%" }}>
                                            <InputLabel id="household-adults-label">Household adults</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="household-adults-label"
                                                id="household-adults-select"
                                                value={this.state.householdAdults}
                                                onChange={this.updateState('householdAdults')}
                                            >
                                                <MenuItem value={0}>0 Adults</MenuItem>
                                                <MenuItem value={1}>1 Adult</MenuItem>
                                                <MenuItem value={2}>2 Adults</MenuItem>
                                                <MenuItem value={3}>3 Adults</MenuItem>
                                                <MenuItem value={4}>4 Adults</MenuItem>
                                                <MenuItem value={5}>5 Adults</MenuItem>
                                                <MenuItem value={6}>6+ Adults</MenuItem>
                                            </Select>
                                            <FormHelperText>Number of adults in household</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <div>
                                        <FormControl style={{ minWidth: "100%" }}>
                                            <InputLabel id="household-children-label">Household children</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="household-children-label"
                                                id="household-children-select"
                                                value={this.state.householdChildren}
                                                onChange={this.updateState('householdChildren')}
                                            >
                                                <MenuItem value={0}>0 Children</MenuItem>
                                                <MenuItem value={1}>1 Child</MenuItem>
                                                <MenuItem value={2}>2 Children</MenuItem>
                                                <MenuItem value={3}>3 Children</MenuItem>
                                                <MenuItem value={4}>4 Children</MenuItem>
                                                <MenuItem value={5}>5 Children</MenuItem>
                                                <MenuItem value={6}>6+ Children</MenuItem>
                                            </Select>
                                            <FormHelperText>Number of children in household</FormHelperText>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <div className={this.classes.margin}>
                                        <TextField
                                            fullWidth
                                            label="Retirement contributions"
                                            value={this.state.retirementContributionsPreTax}
                                            onChange={this.updateState('retirementContributionsPreTax')}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }} />
                                        <FormHelperText>Pre-tax</FormHelperText>
                                    </div>
                                </Grid>
                            </Grid>

                        </React.Fragment>
                    );
                case 1:
                    return (
                        <React.Fragment>
                            <p>
                                Please update your assets. This is <i>optional</i>. However, it will help <b>{this.props.appName}</b> generate better financial results for you
                            </p>
                            <hr/>

                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <div>
                                        <FormControl style={{ minWidth: "100%" }}>
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
                                        </FormControl>
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        value={this.state.age}
                                        onChange={this.updateState('age')} />
                                </Grid>

                            </Grid>
                        </React.Fragment>
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

    componentWillMount() {
        this.props.onLoad(Promise.all([
          agent.Asset.types(),
        ]));
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStepper);