import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {
    BorderlessSquarePaper, SquarePaper, ColorAlt4, ColorAlt5, ColorAlt8,
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
                <SquarePaper variant="outlined" square>
                    <Grid container spacing={0}>
                        <Grid item xs>
                            <H1Alt6>Get started with {props.appName}</H1Alt6>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs>
                            <ProfileCheckmark
                                profile={props.profile} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs>
                            <RetirementCalculators />
                        </Grid>
                        <Grid item xs>
                            <FinancialIndependenceCalculators />
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs>
                            <PropertyCalculators />
                        </Grid>
                    </Grid>
                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const ProfileCheckmark = props => {
    const classes = useStyles();
    const profile = props.profile;

    if (profile) {
        const profileComplete = profile.gender !== null
                                && profile.grossSalary !== null
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
                        <br/>
                        <PAlt7>
                            Filling out your finanial profile will help us get a better understanding of your financial state and 
                            will enhance the accuracy of your results and recommendations. You can find your profile under your name
                            on the top right corner or by clicking on the header above
                        </PAlt7>
                    </Grid>
                </Grid>

                <ProfileCheckmarkDynamic fieldValue={profile.gender} fieldName={"Gender"} />
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

const FinancialIndependenceCalculators = props => {
    const classes = useStyles();

    return (
        <BorderlessSquarePaper variant="outlined" square>
            <Grid container spacing={0}>
                <Grid item xs>
                    <div className={classes.heading}>
                        Financial independence (FI) calculators
                    </div>
                    <ul>
                        <li><AltLink to={"/fi/added/time"}>How much time will be added to your FI?</AltLink></li>
                        <li><AltLink to={"/fi/time"}>Time it takes to reach FI</AltLink></li>
                        <li><AltLink to={"/fi/compound/interest"}>Calculate compound interest</AltLink></li>
                        <li><AltLink to={"/fi/coast/savings"}>Coast FI(RE) savings</AltLink></li>
                    </ul>
                </Grid>
            </Grid>
        </BorderlessSquarePaper>
    );
}

const RetirementCalculators = props => {
    const classes = useStyles();

    return (
        <BorderlessSquarePaper variant="outlined" square>
            <Grid container spacing={0}>
                <Grid item xs>
                    <div className={classes.heading}>
                        Retirement calculators
                    </div>
                    <ul>
                        <li><AltLink to={"/retirement/common/investments"}>Take a look at some of the most common retirement investments and where they can be in the future</AltLink></li>
                    </ul>
                </Grid>
            </Grid>
        </BorderlessSquarePaper>
    );
}

const PropertyCalculators = props => {
    const classes = useStyles();

    return (
        <BorderlessSquarePaper variant="outlined" square>
            <Grid container spacing={0}>
                <Grid item xs>
                    <div className={classes.heading}>
                        Property calculators
                    </div>
                    <ul>
                        <li><AltLink to={"/property/mortgage"}>Calculate your monthly mortgage</AltLink></li>
                    </ul>
                </Grid>
            </Grid>
        </BorderlessSquarePaper>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GettingStartedView);