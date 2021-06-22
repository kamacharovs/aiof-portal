import React from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';

import { numberWithCommas } from '../Common';
import { FullPaper, AlternateCircularProgress, DefaultPaperMargin } from '../../../style/mui';
import { GOAL_DELETE } from '../../../constants/actionTypes';
import {
    GENERIC, TRIP, BUYAHOME, SAVEFORCOLLEGE,
    GOAL_TYPE_MAPPING, GOAL_TRIP_TYPES_MAPPING, GOAL_COLLEGE_TYPE_MAPPING
} from '../../../constants/goals';


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
        color: theme.palette.success.main,
        fontSize: '1rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
    teal: {
        color: theme.palette.secondary.dark,
        fontSize: '0.9rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
    accordionRoot: {
        width: '100%',
    },
    accordionHeading: {
        color: theme.palette.secondary.dark,
        font: 'inherit',
        fontWeight: 900,
        flexBasis: '95%',
        flexShrink: 0,
    },
    accordionHeadingSecondaryHeading: {
        color: theme.palette.text.secondary,
        font: 'inherit',
        fontWeight: 900,
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
        paddingBottom: '0 !important',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        paddingTop: '0.5rem !important'
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
    const theme = useTheme();
    const goals = props.goals || [];

    if (goals) {
        const goalsGeneric = goals.filter(function (x) { return x.type.toUpperCase() === GENERIC; });
        const goalsTrip = goals.filter(function (x) { return x.type.toUpperCase() === TRIP; });
        const goalsHome = goals.filter(function (x) { return x.type.toUpperCase() === BUYAHOME; });
        const goalsSaveForCollege = goals.filter(function (x) { return x.type.toUpperCase() === SAVEFORCOLLEGE; });

        const totalGoals = goalsGeneric.length
            + goalsTrip.length
            + goalsHome.length
            + goalsSaveForCollege.length;

        const handleOnDelete = (id) => {
            props.onDelete(id);
        }

        return (
            <React.Fragment>
                <FullPaper variant="outlined" square>
                    <CurrentGoalsOverview
                        totalGoals={totalGoals}
                        inProgressGoals={props.inProgressGoals} />

                    <CurrentGoalsDynamic
                        theme={theme}
                        goals={goalsGeneric}
                        inProgressGoals={props.inProgressGoals}
                        goalsType={GENERIC}
                        onDelete={handleOnDelete} />

                    <CurrentGoalsDynamic
                        theme={theme}
                        goals={goalsTrip}
                        inProgressGoals={props.inProgressGoals}
                        goalsType={TRIP}
                        onDelete={handleOnDelete} />

                    <CurrentGoalsDynamic
                        theme={theme}
                        goals={goalsHome}
                        inProgressGoals={props.inProgressGoals}
                        goalsType={BUYAHOME}
                        onDelete={handleOnDelete} />

                    <CurrentGoalsDynamic
                        theme={theme}
                        goals={goalsSaveForCollege}
                        inProgressGoals={props.inProgressGoals}
                        goalsType={SAVEFORCOLLEGE}
                        onDelete={handleOnDelete} />

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
    const totalGoals = props.totalGoals || 0;

    return (
        <Grid
            container
            spacing={0}
            justify="center"
            alignItems="center"
            className={classes.overview}>
            <Grid item xs align="center">
                <strong>{totalGoals} total {totalGoals === 1 ? "goal" : "goals"}</strong>
            </Grid>
        </Grid>
    );
}

const CurrentGoalsDynamic = props => {
    const goals = props.goals;
    const goalsType = props.goalsType;
    const goalsTypeMapped = GOAL_TYPE_MAPPING[goalsType];
    const goalsSize = props.goals.length;
    const inProgressGoals = props.inProgressGoals;

    if (goals && goalsSize > 0 && inProgressGoals === false) {
        const classes = useStyles();

        return (
            <Accordion square>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.accordionHeading}>{goalsTypeMapped}</Typography>
                    <Typography className={classes.accordionHeadingSecondaryHeading}>{goalsSize}</Typography>
                </AccordionSummary>
                <AccordionDetails>
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

                                            {goalsType === TRIP &&
                                                <Grid item xs>
                                                    <div className={classes.teal}>
                                                        {g.destination} | {GOAL_TRIP_TYPES_MAPPING[g.tripType.toUpperCase()]}
                                                    </div>
                                                </Grid>
                                            }

                                            {goalsType === BUYAHOME &&
                                                <Grid item xs>
                                                    <div className={classes.teal}>
                                                        ${numberWithCommas((g.homeValue || 0).toFixed(2))}
                                                    </div>
                                                </Grid>
                                            }

                                            <Grid item xs>
                                                <div className={classes.teal}>
                                                    {new Date(g.plannedDate).toLocaleDateString()} | {g.projectedDate ? new Date(g.projectedDate).toLocaleDateString() : "No projected date"}
                                                </div>
                                            </Grid>

                                            {goalsType === TRIP &&
                                                <React.Fragment>
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
                                                </React.Fragment>
                                            }

                                            {goalsType === BUYAHOME &&
                                                <React.Fragment>
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
                                                </React.Fragment>
                                            }

                                            {goalsType === SAVEFORCOLLEGE &&
                                                <React.Fragment>
                                                    <Grid item xs>
                                                        <br />
                                                    </Grid>
                                                    <Grid item xs>
                                                        {g.collegeName}
                                                    </Grid>
                                                    <Grid item xs>
                                                        {GOAL_COLLEGE_TYPE_MAPPING[g.collegeType.toUpperCase()]}
                                                    </Grid>
                                                    <Grid item xs>
                                                        ${numberWithCommas(Math.round(g.costPerYear || 0))}/year
                                                    </Grid>
                                                    <Grid item xs>
                                                        <br />
                                                    </Grid>
                                                    <Grid item xs>
                                                        The student is currently <strong>{g.studentAge}</strong> years old
                                                    </Grid>
                                                    <Grid item xs>
                                                        and will be attending this college for <strong>{g.years}</strong> years
                                                    </Grid>
                                                    <Grid item xs>
                                                        once they reach the age of <strong>{g.beginningCollegeAge}</strong>
                                                    </Grid>
                                                </React.Fragment>
                                            }
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="flex-end"
                                            alignItems="flex-end"
                                            className={classes.currentGoalfooter}>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    aria-label="delete"
                                                    className={classes.deleteIconButton}
                                                    onClick={e => props.onDelete(g.id)}>
                                                    <DeleteIcon style={{ fontSize: '20', color: props.theme.palette.secondary.dark }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </FullPaper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </AccordionDetails>
            </Accordion>
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