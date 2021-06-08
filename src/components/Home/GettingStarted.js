import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { SquarePaper, ColorAlt5 } from '../../style/mui';
import { H1Alt6, AltLink } from '../../style/common';


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
    },
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
                            <RetirementCalculators />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
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

const FinancialIndependenceCalculators = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

const RetirementCalculators = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

const PropertyCalculators = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

export default connect(null, null)(GettingStartedView);