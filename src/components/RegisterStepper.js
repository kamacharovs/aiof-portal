import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AiofPaper } from '../style/mui';

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
            grossSalary: null,
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
            return ['Update income', 'Update assets', 'Update liabilities'];
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
                case 0:         //Update income
                    return (
                        <Grid container spacing={3}>

                            <Grid item md={12} style={{textAlign: "center"}}>
                                <h3>Income</h3>
                                <hr/>
                            </Grid>

                            <Grid item xs={6}>
                                <div className={this.classes.margin}>
                                    <TextField label="Gross salary"
                                        value={this.state.grossSalary}
                                        onChange={this.updateState('grossSalary')}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }} />
                                </div>
                            </Grid>

                        </Grid>
                    );
                case 1:
                    return (
                        <Grid container spacing={3}>

                            <Grid item md={12} style={{textAlign: "center"}}>
                                <h3>Assets</h3>
                                <hr/>
                            </Grid>

                        </Grid>
                    );
                case 2:
                    return (
                        <Grid container spacing={3}>

                            <Grid item md={12} style={{textAlign: "center"}}>
                                <h3>Liabilities</h3>
                                <hr/>
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