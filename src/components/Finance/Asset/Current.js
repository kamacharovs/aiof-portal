import React from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import { makeStyles } from '@material-ui/core/styles';
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
import { FullPaper, AlternateCircularProgress, DefaultGreenColor, DefaultAlternateColor, DefaultPaperMargin } from '../../../style/mui';
import { ASSET_DELETE } from '../../../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.finance,
    inProgressAssets: state.finance.inProgressAssets,
    inProgressDeleteAsset: state.finance.inProgressDeleteAsset,
});

const mapDispatchToProps = dispatch => ({
    onDelete: (id) =>
        dispatch({ type: ASSET_DELETE, payload: agent.Asset.delete(id) }),
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
        color: DefaultAlternateColor,
        fontSize: '0.9rem',
        margin: '0rem',
        padding: '0rem',
        paddingBottom: '0.25rem',
    },
    accordionRoot: {
        width: '100%',
    },
    accordionHeading: {
        color: DefaultAlternateColor,
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

const CurrentAssets = props => {
    const assets = props.assets || [];
    const classes = useStyles();

    if (assets) {
        const totalAssets = assets.length || 0;

        return (
            <React.Fragment>
                <FullPaper variant="outlined" square>
                    <CurrentAssetsOverview
                        totalAssets={totalAssets}
                        inProgressAssets={props.inProgressAssets} />

                    <InProgressBar
                        inProgressAssets={props.inProgressAssets}
                        inProgressDeleteAsset={props.inProgressDeleteAsset} />
                </FullPaper>
            </React.Fragment>
        );
    }
}

const CurrentAssetsOverview = props => {
    const classes = useStyles();
    const totalAssets = props.totalAssets || 0;

    return (
        <Grid
            container
            spacing={0}
            justify="center"
            alignItems="center"
            className={classes.overview}>
            <Grid item xs align="center">
                <strong>{totalAssets} total {totalAssets === 1 ? "asset" : "assets"}</strong>
            </Grid>
        </Grid>
    );
}

const InProgressBar = props => {
    if (props.inProgressAssets || props.inProgressDeleteAsset) {
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentAssets);