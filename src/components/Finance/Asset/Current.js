import React from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';

import { Line } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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
    alternate: {
        color: DefaultAlternateColor,
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
    currentAssetFullPaper: {
        margin: DefaultPaperMargin,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: '0.5rem'
    },
    currentAssetfooter: {
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

    if (assets) {
        const totalAssets = assets.length || 0;

        const handleOnDelete = (id) => {
            props.onDelete(id);
        }

        return (
            <React.Fragment>
                <FullPaper variant="outlined" square>
                    <CurrentAssetsOverview
                        totalAssets={totalAssets}
                        inProgressAssets={props.inProgressAssets}
                        inProgressDeleteAsset={props.inProgressDeleteAsset} />

                    <CurrentAssetsDynamic
                        assets={assets}
                        inProgressAssets={props.inProgressAssets}
                        inProgressDeleteAsset={props.inProgressDeleteAsset}
                        onDelete={handleOnDelete} />

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

const CurrentAssetsDynamic = props => {
    const assets = props.assets;
    const assetsSize = assets.length;
    const inProgressAssets = props.inProgressAssets;
    const inProgressDeleteAsset = props.inProgressDeleteAsset;

    if (assets && assetsSize > 0 
        && inProgressAssets === false
        && inProgressDeleteAsset === false) {
        const classes = useStyles();

        return (
            <React.Fragment>
                {assets.map(a => {
                    return (
                        <FullPaper
                            key={a.publicKey}
                            variant="outlined"
                            square
                            className={classes.currentAssetFullPaper}>
                            <Grid container
                                spacing={0}
                                direction="column"
                                justify="center"
                                alignItems="center">
                                <Grid item xs>
                                    <h6><strong>{a.name}</strong></h6>
                                </Grid>

                                <Grid item xs>
                                    <div className={classes.green}>
                                        ${numberWithCommas((a.value || 0).toFixed(2))}
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <div className={classes.alternate}>{a.type.name} {new Date(a.created).toLocaleDateString()}</div>
                                </Grid>

                                <Grid item xs>
                                    <div className={classes.alternate}>Changes in the past 6 months ({a.snapshots.length})</div>
                                </Grid>

                                <Grid container spacing={0}>
                                    <Grid item xs>
                                        <CurrentAssetSnapshotsChart
                                            snapshots={a.snapshots} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-end"
                                className={classes.currentAssetfooter}>
                                <Tooltip title="Delete">
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.deleteIconButton}
                                        onClick={e => props.onDelete(a.id)}>
                                        <DeleteIcon style={{ fontSize: '20', color: DefaultAlternateColor }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </FullPaper>
                    );
                })}
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const CurrentAssetSnapshotsChart = props => {
    const snapshots = props.snapshots || [];
    const totalSnapshots = snapshots.length;

    if (snapshots && totalSnapshots > 3) {
        const filteredSnapshots = snapshots.reverse().filter(function (s) { return s.Value !== null ;});
        const snapshotsDates = filteredSnapshots.map(s => new Date(s.created).toLocaleDateString());
        const snapshotsValues = filteredSnapshots.map(s => s.value);

        const data = {
            labels: snapshotsDates,
            datasets: [
                {
                    label: 'Value',
                    data: snapshotsValues,
                    fill: false,
                    backgroundColor: DefaultAlternateColor,
                    borderColor: DefaultAlternateColor,
                },
            ],
        }

        const options = {
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        }

        return (
            <Line 
                data={data} 
                height={200} 
                options={options} />
        );
    } else {
        return null;
    }
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