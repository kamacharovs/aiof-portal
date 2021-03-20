import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { numberWithCommas } from '../Finance/Common';
import {
    SquarePaper, FullPaper, AlternateCircularProgress,
    DefaultDarkTeal, DefaultPaperPadding
} from '../../style/mui';


const useStyles = makeStyles((theme) => ({
    overview: {
        backgroundColor: 'rgb(245, 247, 249)',
        color: 'rgb(90, 100, 116)',
        fontSize: '1rem',
        minHeight: '4rem',
        transitionProperty: 'background-color',
        transitionDuration: '250ms',
        width: '100%',
    },
    avatar: {
        color: 'white',
        backgroundColor: DefaultDarkTeal,
    },
    view: {
        padding: DefaultPaperPadding,
    },
    deleteIconButton: {
        padding: 0
    }
}));

const Dependents = props => {
    const dependents = props.dependents;

    if (props.dependents) {
        const classes = useStyles();
        const totalDependents = dependents.length || 0;

        return (
            <React.Fragment>
                <FullPaper variant="outlined" square>
                    <CurrentDependentsOverview
                        totalDependents={totalDependents} />

                    <div className={classes.view}>
                        {
                            dependents.map(d => {
                                return (
                                    <DependentView
                                        key={d.publicKey}
                                        dependent={d}
                                        onDelete={props.handleOnDelete}
                                        inProgressDependentDelete={props.inProgressDependentDelete} />
                                );
                            })
                        }
                    </div>

                    <InProgressBar
                        inProgressDependents={props.inProgressDependents}
                        inProgressDependentDelete={props.inProgressDependentDelete} />
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

const DependentView = props => {
    const dependent = props.dependent;
    const inProgressDependentDelete = props.inProgressDependentDelete;

    if (dependent && !inProgressDependentDelete) {
        const classes = useStyles();

        return (
            <SquarePaper variant="outlined" square>
                <Grid container>
                    <Grid item sm={1}>
                        <Avatar className={classes.avatar}>
                            {dependent.firstName[0]}{dependent.lastName[0]}
                        </Avatar>
                    </Grid>
                    <Grid item sm={10}>
                        <Grid container
                            spacing={0}
                            direction="column">
                            <Grid item sm>
                                <strong>{dependent.firstName} {dependent.lastName}</strong>
                            </Grid>
                            <Grid item sm>
                                <i>{dependent.userRelationship} ({dependent.age})</i>
                            </Grid>
                            <Grid item sm>
                                <i>${numberWithCommas(dependent.amountOfSupportProvided)} / year</i>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={1}>
                        <IconButton
                            aria-label="delete"
                            className={classes.deleteIconButton}
                            onClick={e => props.onDelete(dependent.id)}>
                            <DeleteIcon style={{ fontSize: '20', color: DefaultDarkTeal }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </SquarePaper>
        );
    } else {
        return null;
    }
}

const InProgressBar = props => {
    if (props.inProgressDependents || props.inProgressDependentDelete) {
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