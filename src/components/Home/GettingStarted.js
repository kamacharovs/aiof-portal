import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import House from '../../style/icons/House_4.svg';
import Calculator from '../../style/icons/Calculator.svg';

import {
    BorderlessSquarePaper, SquarePaper, InBodyPaper, ColorAlt4, ColorAlt5, ColorAlt8,
    AltCheckCircle, AltClearIcon, AltChip
} from '../../style/mui';
import { H1Alt6, PAlt7, AltLink } from '../../style/common';


const mapStateToProps = state => ({
    ...state.finance,
    profile: state.finance.profile,
});

const mapDispatchToProps = dispatch => ({
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    heading: {
        fontSize: '14px',
        color: ColorAlt5,
        font: 'inherit',
        fontWeight: 900,
        flexBasis: '95%',
        flexShrink: 0,
    }
}));

const GettingStartedView = props => {
    if (props.currentUser) {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <SquarePaper variant="outlined" square>
                            <Grid container spacing={0}>
                                <Grid item xs>
                                    <H1Alt6>Getting started</H1Alt6>
                                </Grid>
                            </Grid>

                            <Grid container spacing={0}>
                                <Grid item xs>
                                    <ProfileCheckmark
                                        profile={props.profile} />
                                </Grid>
                            </Grid>
                        </SquarePaper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <Housing />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs>
                        <FinancialIndependence />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

const ProfileCheckmark = props => {
    const classes = useStyles();
    const profile = props.profile;

    if (profile) {
        const profileComplete = profile.gender !== null
            && profile.occupation !== null
            && (profile.grossSalary !== null && profile.grossSalary !== 0)
            && profile.educationLevel !== null
            && profile.residentialStatus !== null;

        return (
            <BorderlessSquarePaper variant="outlined" square>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <div className={classes.heading}>
                            <AltLink to={"/profile"}>Update your profile {profileComplete === false
                                ? <AltChip label={"Incomplete"} color={ColorAlt8} />
                                : <AltChip label={"Completed"} color={ColorAlt4} />
                            }</AltLink>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <br />
                        <PAlt7>
                            Filling out your finanial profile will help us get a better understanding of your financial state and
                            will enhance the accuracy of your results and recommendations. You can find your profile under your name
                            on the top right corner or by clicking on the header above
                        </PAlt7>
                    </Grid>
                </Grid>

                <ProfileCheckmarkDynamic fieldValue={profile.gender} fieldName={"Gender"} />
                <ProfileCheckmarkDynamic fieldValue={profile.occupation} fieldName={"Occupation"} />
                <ProfileCheckmarkDynamic fieldValue={profile.grossSalary} fieldName={"Gross salary"} />
                <ProfileCheckmarkDynamic fieldValue={profile.educationLevel} fieldName={"Education level"} />
                <ProfileCheckmarkDynamic fieldValue={profile.residentialStatus} fieldName={"Residential status"} />
            </BorderlessSquarePaper>
        );
    } else {
        return null;
    }
}
const ProfileCheckmarkDynamic = props => {
    return (
        <Grid container spacing={0}>
            <Grid item xs>
                {props.fieldValue ? <AltCheckCircle /> : <AltClearIcon />} {props.fieldName}
            </Grid>
        </Grid>
    );
}

const FinancialIndependence = props => {
    return (
        <InBodyPaper
            title={"Financial independence"}
            subTitle={"United States"}
            body={
                <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <img src={Calculator} alt="Calculator" style={{ maxWidth: "10rem", maxHeight: "10rem" }} />
                        </Grid>
                        <Grid item xs>
                            <strong>Benefits of financial independence</strong>
                            <ul>
                                <li>You will be much less stressed out</li>
                                <li>You will have more energy for self-improvement</li>
                                <li>You will have more opportunities to think long term</li>
                                <li>Thinking long term can be beneficial for your investments as well</li>
                            </ul>

                            <strong>We can help with these calculators</strong>
                            <ul>
                                <li><AltLink to="/fi/time" className="nav-link">Time to Financial Independence (FI)</AltLink></li>
                                <li><AltLink to="/fi/added/time" className="nav-link">Added time to Financial Independence (FI)</AltLink></li>
                                <li><AltLink to="/fi/compound/interest" className="nav-link">Compound interest</AltLink></li>
                                <li><AltLink to="/fi/bmi" className="nav-link">BMI</AltLink></li>
                                <li><AltLink to="/fi/coast/savings" className="nav-link">Coast Financial Independence/Retire Early (FIRE)</AltLink></li>
                            </ul>
                        </Grid>
                    </Grid>
                </React.Fragment>
            }>
        </InBodyPaper>
    );
}

const Housing = props => {
    return (
        <InBodyPaper
            title={"Housing"}
            subTitle={"United States"}
            body={
                <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <img src={House} alt="House" style={{ maxWidth: "8rem", maxHeight: "8rem" }} />
                        </Grid>
                        <Grid item xs>
                            <strong>3 surprising facts about mortgages</strong>
                            <ul>
                                <li>Underwriters don't care about your assets</li>
                                <li>Having no credit score can hurt you</li>
                                <li>Your debt ratio isn't based on how much money you bring home</li>
                            </ul>

                            <strong>We can help</strong>
                            <ul>
                                <li><AltLink to="/property/mortgage" className="nav-link">Mortgage calculator</AltLink></li>
                            </ul>
                        </Grid>
                    </Grid>
                </React.Fragment>
            }>
        </InBodyPaper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GettingStartedView);