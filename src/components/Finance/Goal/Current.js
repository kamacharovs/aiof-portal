import React from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { numberWithCommas } from '../Common';
import {
    SquarePaper, FullPaper, AlternateCircularProgress,
    DefaultDarkTeal, DefaultGreenColor, DefaultPaperMargin
} from '../../../style/mui';
import { GOAL_DELETE } from '../../../constants/actionTypes';
import { TRIP, BUYAHOME } from '../../../constants/goals';


const mapStateToProps = state => ({
    ...state.finance,
    inProgressGoals: state.finance.inProgressGoals,
    inProgressDeleteGoal: state.finance.inProgressDeleteGoal,
});

const mapDispatchToProps = dispatch => ({
    onDelete: (id) =>
        dispatch({ type: GOAL_DELETE, payload: agent.Goal.delete(id) }),
});

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
    },
    overview: {
        backgroundColor: 'rgb(245, 247, 249)',
        color: 'rgb(90, 100, 116)',
        fontSize: '1rem',
        minHeight: '4rem',
        transitionProperty: 'background-color',
        transitionDuration: '250ms',
        width: '100%',
    },
    currentGoalFullPaper: {
        margin: DefaultPaperMargin,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: '0.5rem'
    },
    currentGoalfooter: {
        backgroundColor: 'rgb(245, 247, 249)',
        color: 'rgb(90, 100, 116)',
        minHeight: '2rem',
        padding: '0.5rem',
        marginTop: '0.25rem',
        width: '100%',
    },
    deleteIconButton: {
        padding: 0
    }
}));

const CurrentGoals = props => {
    const goals = props.goals || [];

    if (goals) {
        const goalsTrip = goals.filter(function (x) { return x.type.toUpperCase() === TRIP; })
        const goalsHome = goals.filter(function (x) { return x.type.toUpperCase() === BUYAHOME; })

        const handleOnDelete = (id) => {
            props.onDelete(id);
        }

        return (
            <React.Fragment>
                <FullPaper variant="outlined" square>
                    <CurrentGoalsOverview goals={goals} inProgressGoals={props.inProgressGoals} />

                    <CurrentGoalsTrip 
                        goalsTrip={goalsTrip} 
                        inProgressGoals={props.inProgressGoals} 
                        onDelete={handleOnDelete} />

                    <CurrentGoalsHome goalsHome={goalsHome} inProgressGoals={props.inProgressGoals} />

                    <InProgressBar 
                        inProgressGoals={props.inProgressGoals} 
                        inProgressDeleteGoal={props.inProgressDeleteGoal} />
                </FullPaper>
            </React.Fragment>
        );
    }
}

const CurrentGoalsOverview = props => {
    const classes = useStyles();
    const totalGoals = props.goals.length || 0;

    return (
        <Grid
            container
            spacing={0}
            justify="center"
            alignItems="center"
            className={classes.overview}>
            <Grid item xs align="center">
                <strong>{totalGoals} total goals</strong>
            </Grid>
        </Grid>
    );
}

const CurrentGoalsTrip = props => {
    const goals = props.goalsTrip;
    const inProgressGoals = props.inProgressGoals;

    if (goals && goals.length > 0 && inProgressGoals === false) {
        const classes = useStyles();

        return (
            <Grid container spacing={0}>
                {goals.map(g => {
                    return (
                        <Grid key={g.publicKey} item xs={4}>
                            <FullPaper
                                variant="outlined"
                                square
                                className={classes.currentGoalFullPaper}>
                                <Grid container 
                                    key={g.id}
                                    spacing={0} 
                                    direction="column" 
                                    justify="center" 
                                    alignItems="center">
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
                                        <br />
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
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="flex-end"
                                    className={classes.currentGoalfooter}>
                                    <IconButton 
                                        aria-label="delete" 
                                        className={classes.deleteIconButton}
                                        onClick={e => props.onDelete(g.id)}>
                                        <DeleteIcon  style={{ fontSize: '20', color: DefaultDarkTeal }} />
                                    </IconButton>
                                </Grid>
                            </FullPaper>
                        </Grid>
                    );
                })}
            </Grid>
        );
    } else {
        return null;
    }
}

const CurrentGoalsHome = props => {
    const goals = props.goalsHome;
    const inProgressGoals = props.inProgressGoals;

    if (goals && goals.length > 0 && inProgressGoals === false) {
        const classes = useStyles();

        return (
            <Grid container spacing={0}>
                {goals.map(g => {
                    return (
                        <Grid key={g.publicKey} item xs={4}>
                            <SquarePaper variant="outlined" square style={{ margin: DefaultPaperMargin }}>
                                <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                                    <Grid item xs>
                                        <h6><strong>{g.name}</strong></h6>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.teal}>
                                            ${numberWithCommas((g.currentAmount || 0).toFixed(2))}/{numberWithCommas((g.amount || 0).toFixed(2))} | ${numberWithCommas((g.monthlyContribution || 0).toFixed(2))}/month
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.teal}>
                                            ${numberWithCommas((g.homeValue || 0).toFixed(2))}
                                        </div>
                                    </Grid>
                                    <Grid item xs>
                                        <div className={classes.teal}>
                                            {new Date(g.plannedDate).toLocaleDateString()} | {g.projectedDate ? new Date(g.projectedDate).toLocaleDateString() : "No projected date"}
                                        </div>
                                    </Grid>

                                    <Grid item xs>
                                        {((g.mortgageRate || 0) * 100).toFixed(3)}% mortgage rate
                                    </Grid>
                                    <Grid item xs>
                                        {((g.percentDownPayment || 0) * 100).toFixed(3)}% down payment
                                    </Grid>
                                    <Grid item xs>
                                        ${(g.annualInsurance || 0).toFixed(2)} annual insurance
                                    </Grid>
                                    <Grid item xs>
                                        {((g.annualPropertyTax || 0) * 100).toFixed(3)}% annual property tax
                                    </Grid>
                                </Grid>
                            </SquarePaper>
                        </Grid>
                    );
                })}
            </Grid>
        );
    } else {
        return null;
    }
}

const InProgressBar = props => {
    if (props.inProgressGoals || props.inProgressDeleteGoal) {
        return (
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                <Grid item xs align="center">
                    <br />
                    <AlternateCircularProgress />
                </Grid>
            </Grid>
        );
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentGoals);