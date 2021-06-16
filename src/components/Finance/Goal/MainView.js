import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../../agent';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { SquarePaper } from '../../../style/mui';
import { REDIRECT_LOGIN, GOALS } from '../../../constants/actionTypes';

import CurrentGoals from './Current';
import AddGoals from './Add';
import { success, error } from '../../Common/AiofToast';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    goals: state.finance.goals,
    goalAdded: state.finance.goalAdded,
    goalAddedCode: state.finance.goalAddedCode,
    goalDeleted: state.finance.goalDeleted,
});

const mapDispatchToProps = dispatch => ({
    onAll: () =>
        dispatch({ type: GOALS, payload: agent.Goal.all() }),
    onRedirectLogin: () =>
        dispatch({ type: REDIRECT_LOGIN }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

const GoalOverview = props => {
    const theme = useTheme();
    
    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <div style={{ color: theme.palette.secondary.dark }}>
                    <h2><strong>Goals</strong></h2>
                </div>
                <p>
                    Setting short-term, mid-term, and long-term financial goals is an important step toward becoming financially secure.
                    If you aren’t working toward anything specific, you’re likely to spend more than you should.
                    You’ll then come up short when you need money for unexpected bills, not to mention when you want to retire.
                    You might get stuck in a vicious cycle of credit card debt and feel like you never have enough cash to get
                    properly insured, leaving you more vulnerable than you need to be to handle some of life’s major risks
                </p>
            </SquarePaper>
        </React.Fragment>
    );
}

const GoalMainView = props => {
    if (props.currentUser) {
        const classes = useStyles();
        const currentGoalsRef = useRef();

        const scrollToCurrentGoals = () => {
            currentGoalsRef.current.scrollIntoView({ block: "end", behavior: "smooth" })
        }

        useEffect(() => {
            if (!props.goals) {
                props.onAll();
            }
        }, []);

        useEffect(() => {
            if (props.goals) {
                props.onAll();

                const goalAdded = props.goalAdded;
                const code = props.goalAddedCode;
                if (goalAdded && code === 200) {
                    success(`Successfully added ${goalAdded.type} goal '${goalAdded.name}'`);
                } else if (goalAdded === null && code === 400) {
                    error(`Something went wrong when trying to add goal. Please try again or contact site administrator`);
                }
            }
        }, [props.goalAdded]);

        useEffect(() => {
            if (props.goals && props.goalDeleted === true) {
                props.onAll();
            }
        }, [props.goalDeleted]);

        return (
            <React.Fragment>
                <Helmet>
                    <title>{props.appName} | Finance | Goals</title>
                </Helmet>

                <Container maxWidth="md">
                    <Grid container spacing={1} className={classes.root}>
                        <Grid item xs>
                            <GoalOverview />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={classes.root}>
                        <Grid item xs>
                            <div ref={currentGoalsRef}>
                                <CurrentGoals goals={props.goals} />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={classes.root}>
                        <Grid item xs>
                            <AddGoals scrollToCurrentGoals={scrollToCurrentGoals} />
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    } else {
        props.onRedirectLogin();
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalMainView);