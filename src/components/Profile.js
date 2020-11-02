import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../agent';
import { PROFILE_GET_USER_PROFILE, PROFILE_UPSERT_USER_PROFILE } from '../constants/actionTypes';

import { AiofPaper, AiofLinearProgress } from '../style/mui';
import { formatDate } from './Finance/Common';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const mapStateToProps = state => ({
    ...state.profile,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.profile.inProgress,
    profile: state.profile.profile,
});

const mapDispatchToProps = dispatch => ({
    onProfile: () =>
        dispatch({ type: PROFILE_GET_USER_PROFILE, payload: agent.User.profile() }),
    onProfileUpsert: (payload) =>
        dispatch({ type: PROFILE_UPSERT_USER_PROFILE, payload: agent.User.profileUpsert(payload) }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
    hr: {
        borderTop: '1px solid',
        marginTop: '0.25rem',
        color: '#ebebeb',
        opacity: '90%'
    },
    textField: {
        marginTop: '-6px'
    },
    resize: {
        fontSize: '.8125rem'
    },
    green: {
        color: 'green',
        margin: '0rem',
        padding: '0rem'
    },
    tinyMutedText: {
        color: '#999',
        margin: '0 0 8px',
        fontSize: '12px'
    },
    mutedText: {
        color: '#999',
        margin: '0 0 8px',
        fontSize: '14px'
    }
}));

const Profile = props => {
    const classes = useStyles();
    const empty = "Unspecified";
    const zero = "0";
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [age, setAge] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [occupation, setOccupation] = useState('');
    const [occupationIndustry, setOccupationIndustry] = useState('');
    const [grossSalary, setGrossSalary] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [residentialStatus, setResidentialStatus] = useState('');
    const [householdIncome, setHouseholdIncome] = useState('');
    const [householdAdults, setHouseholdAdults] = useState('');
    const [householdChildren, setHouseholdChildren] = useState('');
    const [retirementContributionsPreTax, setRetirementContributionsPreTax] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    const handleUpdate = () => {
        if (props.currentUser) {
            var payload = {
                gender,
                dateOfBirth,
                age: Number(age),
                maritalStatus,
                occupation,
                occupationIndustry,
                grossSalary: Number(grossSalary),
                educationLevel,
                residentialStatus,
                householdIncome: Number(householdIncome),
                householdAdults: Number(householdAdults),
                householdChildren: Number(householdChildren),
                retirementContributionsPreTax: Number(retirementContributionsPreTax)
            };

            props.onProfileUpsert(payload);
        }
    }

    useEffect(() => {
        if (props.currentUser) {
            props.onProfile();      
        }
    }, []);
    useEffect(() => {
        if (props.profile) {
            setGender(props.profile.gender);
            setDateOfBirth(props.profile.dateOfBirth);
            setAge(props.profile.age);
            setMaritalStatus(props.profile.maritalStatus);
            setOccupation(props.profile.occupation);
            setOccupationIndustry(props.profile.occupationIndustry);
            setGrossSalary(props.profile.grossSalary);
            setEducationLevel(props.profile.educationLevel);
            setResidentialStatus(props.profile.residentialStatus);
            setHouseholdIncome(props.profile.householdIncome);
            setHouseholdAdults(props.profile.householdAdults);
            setHouseholdChildren(props.profile.householdChildren);
            setRetirementContributionsPreTax(props.profile.retirementContributionsPreTax);
        }
    }, [props.profile]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Profile</title>
            </Helmet>

            <Container maxWidth="xl">
                <Grid container spacing={3} className={classes.root}>

                    <Grid item xs={12}>
                        {props.inProgress ? <AiofLinearProgress /> : (
                            <React.Fragment>
                                <Grid container spacing={1} className={classes.root}>

                                    <Grid item xs={12}>
                                        <AiofPaper elevation={3}>
                                            <h3>{props.currentUser.lastName + ", " + props.currentUser.firstName}</h3>
                                            <p className={classes.tinyMutedText}>{formatDate(props.currentUser.created)}</p>
                                            <p className={classes.tinyMutedText}>{props.currentUser.email}</p>
                                            <br />
                                            <p className={classes.mutedText}>
                                                Tell us about yourself so we can improve the financial advice we provide
                                            </p>
                                        </AiofPaper>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AiofPaper elevation={3}>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Gender</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={gender}
                                                        onChange={e => setGender(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Date of birth</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={dateOfBirth ? formatDate(dateOfBirth) : empty}
                                                        onChange={e => setDateOfBirth(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Age</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={age ? Number(age) : zero}
                                                        onChange={e => setAge(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Marital status</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={maritalStatus || empty}
                                                        onChange={e => setMaritalStatus(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Education level</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={educationLevel || empty}
                                                        onChange={e => setEducationLevel(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Residential status</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={residentialStatus || empty}
                                                        onChange={e => setResidentialStatus(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                        </AiofPaper>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AiofPaper elevation={3}>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Occupation</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={occupation || empty}
                                                        onChange={e => setOccupation(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Occupation industry</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={occupationIndustry || empty}
                                                        onChange={e => setOccupationIndustry(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Gross salary</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={grossSalary ? Number(grossSalary) : zero}
                                                        onChange={e => setGrossSalary(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household income</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={householdIncome ? Number(householdIncome) : zero}
                                                        onChange={e => setHouseholdIncome(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household adults</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={householdAdults ? Number(householdAdults) : zero}
                                                        onChange={e => setHouseholdAdults(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household children</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={householdChildren ? Number(householdChildren) : zero}
                                                        onChange={e => setHouseholdChildren(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Retirement contributions pre tax</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField className={classes.textField}
                                                        fullWidth
                                                        value={retirementContributionsPreTax ? Number(retirementContributionsPreTax) : zero}
                                                        onChange={e => setRetirementContributionsPreTax(e.target.value)}
                                                        onFocus={() => setIsUpdated(true)}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.resize,
                                                            },
                                                        }}
                                                     />
                                                </Grid>
                                            </Grid>

                                        </AiofPaper>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AiofPaper elevation={3}>
                                            <Grid container spacing={2} className={classes.root}>

                                                <Grid item xs={6}>
                                                    <Button variant="outlined" color="primary" disabled={!isUpdated} onClick={handleUpdate}>
                                                        Update
                                                    </Button>
                                                </Grid>

                                                <Grid item xs={6}>
                                                </Grid>

                                            </Grid>
                                        </AiofPaper>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )}

                    </Grid>

                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);