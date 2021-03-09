import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { numberWithCommas } from '../Common';
import { SquarePaper, AiofCircularProgress, DefaultDarkTeal, DefaultGreenColor } from '../../../style/mui';
import { TRIP, BUYAHOME } from '../../../constants/goals';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    green: {
        color: DefaultGreenColor,
        fontSize: '1rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
    teal: {
        color: DefaultDarkTeal,
        fontSize: '0.9rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    }
}));

const CurrentGoals = props => {
    const goals = props.goals;

    if (goals && goals.length > 0) {
        const goalsTrip = goals.filter(function (x) { return x.type.toUpperCase() === TRIP; })
        //const goalsHome = goals.filter(function (x) { return x.type.toUpperCase() === BUYAHOME; })

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <div style={{ color: DefaultDarkTeal }}>
                        <h3><strong>Current</strong></h3>
                    </div>

                    <CurrentGoalsTrip goalsTrip={goalsTrip} />

                    <InProgressBar inProgressGoals={props.inProgressGoals} />
                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <div style={{ color: DefaultDarkTeal }}>
                        <h3><strong>Current</strong></h3>
                    </div>
                    You don't have any current goals. Try setting new ones below
                </SquarePaper>
            </React.Fragment>
        );
    }
}

const CurrentGoalsTrip = props => {
    const goals = props.goalsTrip;

    if (goals && goals.length > 0) {
        const classes = useStyles();

        return (
            <Grid container spacing={1}>
                {goals.map(g => {
                    return (
                        <Grid key={g.publicKey} item xs>
                            <SquarePaper variant="outlined" square>
                                <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                                    <Grid item xs>
                                        <h6><strong>{g.name}</strong></h6>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.teal}>
                                            ${numberWithCommas(Math.round(g.currentAmount || 0))}/{numberWithCommas(Math.round(g.amount || 0))} | ${numberWithCommas(Math.round(g.monthlyContribution || 0))}/month
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.teal}>
                                            {g.destination} | {g.tripType}
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.teal}>
                                            {new Date(g.plannedDate).toLocaleDateString()} | {g.projectedDate ? new Date(g.projectedDate).toLocaleDateString() : "No projected date"}
                                        </div>
                                    </Grid>

                                    <Grid item xs>
                                        {g.duration || 0} days
                                    </Grid>
                                    <Grid item xs>
                                        {g.travelers || 0} travelers
                                    </Grid>

                                    <Grid item xs>
                                        <br/>
                                    </Grid>
                                    
                                    <Grid item xs>
                                        Flight: ${numberWithCommas(Math.round(g.flight || 0))}
                                    </Grid>
                                    <Grid item xs>
                                        Hotel: ${numberWithCommas(Math.round(g.hotel || 0))}
                                    </Grid>
                                    <Grid item xs>
                                        Car: ${numberWithCommas(Math.round(g.car || 0))}
                                    </Grid>
                                    <Grid item xs>
                                        Food: ${numberWithCommas(Math.round(g.food || 0))}
                                    </Grid>
                                    <Grid item xs>
                                        Activities: ${numberWithCommas(Math.round(g.activities || 0))}
                                    </Grid>
                                    <Grid item xs>
                                        Other: ${numberWithCommas(Math.round(g.other || 0))}
                                    </Grid>
                                </Grid>
                            </SquarePaper>
                        </Grid>
                    );
                })};
            </Grid>
        );
    } else {
        return null;
    }
}

const InProgressBar = props => {
    if (props.inProgressGoals) {
        return (
            <AiofCircularProgress />
        );
    }
    else {
        return null;
    }
}

export default CurrentGoals;