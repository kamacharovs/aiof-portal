import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { FullPaper, AlternateCircularProgress } from '../../style/mui';


const useStyles = makeStyles((theme) => ({
    overview: {
        backgroundColor: 'rgb(245, 247, 249)',
        color: 'rgb(90, 100, 116)',
        fontSize: '1rem',
        minHeight: '4rem',
        transitionProperty: 'background-color',
        transitionDuration: '250ms',
        width: '100%',
    }
}));

const Dependents = props => {
    const dependents = props.dependents;

    if (props.dependents) {
        const totalDependents = dependents.length || 0;

        return (
            <React.Fragment>
                <FullPaper variant="outlined" square>
                    <CurrentDependentsOverview
                        totalDependents={totalDependents} />

                    <InProgressBar
                        inProgressDependents={props.inProgressDependents} />
                </FullPaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const CurrentDependentsOverview = props => {
    const classes = useStyles();
    const totalDependents = props.totalDependents || 0;

    return (
        <Grid
            container
            spacing={0}
            justify="center"
            alignItems="center"
            className={classes.overview}>
            <Grid item xs align="center">
                <strong>{totalDependents} {totalDependents === 1 ? "dependent" : "dependents"}</strong>
            </Grid>
        </Grid>
    );
}

const InProgressBar = props => {
    if (props.inProgressDependents) {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                justify="center"
                alignItems="center">
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

export default Dependents;