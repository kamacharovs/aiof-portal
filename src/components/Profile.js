import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../agent';
import { PROFILE_GET_USER_PROFILE, PROFILE_UPSERT_USER_PROFILE } from '../constants/actionTypes';

import { AiofPaper, AiofLinearProgress } from '../style/mui';
import { numberWithCommas, formatDate } from './Finance/Common';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => ({
    ...state.profile,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.profile.inProgress,
    profile: state.profile.profile,
});

const mapDispatchToProps = dispatch => ({
    onProfile: id =>
        dispatch({ type: PROFILE_GET_USER_PROFILE, payload: agent.User.profile(id) }),
    onProfileUpsert: (id, payload) =>
        dispatch({ type: PROFILE_UPSERT_USER_PROFILE, payload: agent.User.profileUpsert(id, payload) }),
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
    const gender = props.profile ? props.profile.gender : null;
    const dateOfBirth = props.profile ? props.profile.dateOfBirth : null;
    const age = props.profile ? props.profile.age : null;
    const maritalStatus = props.profile ? props.profile.maritalStatus : null;
    const occupation = props.profile ? props.profile.occupation : null;
    const occupationIndustry = props.profile ? props.profile.occupationIndustry : null;
    const grossSalary = props.profile ? props.profile.grossSalary : null;
    const educationLevel = props.profile ? props.profile.educationLevel : null;
    const residentialStatus = props.profile ? props.profile.residentialStatus : null;
    const householdIncome = props.profile ? props.profile.householdIncome : null;
    const householdAdults = props.profile ? props.profile.householdAdults : null;
    const householdChildren = props.profile ? props.profile.householdChildren : null;
    const retirementContributionsPreTax = props.profile ? props.profile.retirementContributionsPreTax : null;
    const isUpdated = false;

    const handleUpdate = () => {
        if (props.currentUser) {
            var payload = {
                gender,
                dateOfBirth,
                age,
                maritalStatus,
                occupation,
                occupationIndustry,
                householdAdults
            };

            props.onProfileUpsert(props.currentUser.id, payload);
        }
    }

    useEffect(() => {
        if (props.currentUser) {
            props.onProfile(props.currentUser.id);
        }
    }, []);

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
                                                    {gender || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Date of birth</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {dateOfBirth ? formatDate(dateOfBirth) : empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Age</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {age || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Marital status</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {maritalStatus || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Education level</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {educationLevel || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Residential status</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {residentialStatus || empty}
                                                    <hr className={classes.hr} />
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
                                                    {occupation || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Occupation industry</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {occupationIndustry || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Gross salary</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p className={classes.green}>${grossSalary ? numberWithCommas(grossSalary) : zero}</p>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household income</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p className={classes.green}>${householdIncome ? numberWithCommas(householdIncome) : zero}</p>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household adults</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {householdAdults || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Household children</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {householdChildren || empty}
                                                    <hr className={classes.hr} />
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2} className={classes.root}>
                                                <Grid item xs={6}>
                                                    <b>Retirement contributions pre tax</b>
                                                    <hr className={classes.hr} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <p className={classes.green}>${retirementContributionsPreTax ? numberWithCommas(retirementContributionsPreTax) : zero}</p>
                                                    <hr className={classes.hr} />
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