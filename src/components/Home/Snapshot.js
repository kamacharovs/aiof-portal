import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { AssetPaper, LiabilityPaper, GoalPaper, DependentPaper } from '../Common/Papers';
import { SquarePaper, AltButton, ColorAlt2, ColorAlt6 } from '../../style/mui';
import { H1Alt6, PAlt7, AltLink } from '../../style/common';
import { FINANCE, ASSETS } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.inProgress,
    inProgressAssets: state.inProgressAssets,
});

const mapDispatchToProps = dispatch => ({
    onFinance: () =>
        dispatch({ type: FINANCE, payload: agent.User.get() }),
    onAssets: () =>
        dispatch({ type: ASSETS, payload: agent.Asset.all() }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

const SnapshotView = props => {
    const classes = useStyles();

    const [showAssets, setShowAssets] = useState(true);
    const [showLiabilities, setShowLiabilities] = useState(true);
    const [showGoals, setShowGoals] = useState(true);
    const [showDependentss, setShowDependentss] = useState(true);

    let listOfSettings = [
        {
            value: showAssets,
            setValue: setShowAssets,
            label: "Show Assets"
        },
        {
            value: showLiabilities,
            setValue: setShowLiabilities,
            label: "Show Liabilities"
        },
        {
            value: showGoals,
            setValue: setShowGoals,
            label: "Show Goals"
        },
        {
            value: showDependentss,
            setValue: setShowDependentss,
            label: "Show Dependents"
        },
    ]

    const currentUser = props.currentUser;
    const inProgress = props.inProgress;
    const inProgressAssets = props.inProgressAssets;

    const assets = props.assets ? props.assets : [];
    const assetsTotal = assets.length;
    const assetsSum = assets.map(a => a.value)
        .reduce((sum, current) => sum + current, 0);

    const liabilities = props.liabilities ? props.liabilities : [];
    const liabilitiesSum = liabilities.map(a => a.value)
        .reduce((sum, current) => sum + current, 0);
    const liabilitiesMonthlyPaymentSum = liabilities.map(l => l.monthlyPayment)
        .reduce((sum, current) => sum + current, 0);

    const goals = props.goalsBase ? props.goalsBase : [];
    const goalsTotal = goals.length;
    const goalsMothlyContributionSum = goals.map(g => g.monthlyContribution)
        .reduce((sum, current) => sum + current, 0);

    const dependents = props.dependents ? props.dependents : [];
    const dependentsTotal = dependents.length;

    useEffect(() => {
        if (props.currentUser
            && !props.finance) {
            props.onFinance();
            props.onAssets();
        }
    }, []);

    return (
        <SquarePaper variant="outlined" square>
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs>
                    <Grid item xs>
                        <Grid container>
                            <Grid item xs={10}>
                                <H1Alt6>Overview</H1Alt6>
                            </Grid>
                            <Grid item xs={2}>
                                {
                                    props.currentUser
                                        ? <SettingsButton
                                            listOfSettings={listOfSettings} />
                                        : null
                                }
                            </Grid>
                        </Grid>
                        <Grid container>
                            <PAlt7>
                                Below is a snapshot of  your current assets and liabilities.
                                {props.currentUser
                                    ? null
                                    : <React.Fragment>
                                        <br /><br />
                                        There is a limited number of functionality you can take advantage of when not logged in. This included.
                                        You need to <AltLink to="/login">login</AltLink> in order to update your assets, liabilities.
                                    </React.Fragment>
                                }
                            </PAlt7>
                        </Grid>
                    </Grid>

                    <Grid item xs>
                        {showAssets
                            ? <AssetPaper
                                currentUser={currentUser}
                                inProgress={inProgress && inProgressAssets}
                                title={"Assets"}
                                totalAssets={assetsTotal}
                                totalAssetValue={assetsSum} />
                            : null}

                        <AssetsChart
                            assets={assets} />
                    </Grid>
                    <Grid item xs>
                        {showLiabilities
                            ? <LiabilityPaper
                                currentUser={currentUser}
                                inProgress={inProgress}
                                title={"Liabilities"}
                                totalValue={liabilitiesSum}
                                totalMonthlyPayment={liabilitiesMonthlyPaymentSum} />
                            : null}
                    </Grid>
                    <Grid item xs>
                        {showGoals
                            ? <GoalPaper
                                currentUser={currentUser}
                                inProgress={inProgress}
                                title={"Goals"}
                                total={goalsTotal}
                                totalmonthlyContribution={goalsMothlyContributionSum} />
                            : null}
                    </Grid>
                    <Grid item xs>
                        {showDependentss
                            ? <DependentPaper
                                currentUser={currentUser}
                                inProgress={inProgress}
                                title={"Dependents"}
                                total={dependentsTotal} />
                            : null}
                    </Grid>
                </Grid>
            </Grid>
        </SquarePaper>
    );
};

const AssetsChart = props => {
    if (props.assets) {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    } else {
        return null;
    }
}

const assetSnapshotsAverage = (assets) => {
    let totalSnapshot = 0;
    for (var i = 0; i < assets.length; i++) {
        let asset = assets[i];

        if (asset.snapshots) {
            let averageNegative = asset.snapshots
                .filter(s => s.valueChange < 0)
                .map(s => s.valueChange)
                .reduce((sum, current) => sum + Number(current), 0) /
                asset.snapshots.length;

            let averagePositive = asset.snapshots
                .filter(s => s.valueChange > 0)
                .map(s => s.valueChange)
                .reduce((sum, current) => sum + current, 0) /
                asset.snapshots.length;
            totalSnapshot += averagePositive + averageNegative
        }
    }
    return totalSnapshot;
}

export const SettingsButton = props => {
    const [open, setOpen] = useState(false);

    const listOfSettings = props.listOfSettings;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton
                style={{ color: ColorAlt6 }}
                onClick={handleClickOpen}>
                <SettingsIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                </DialogTitle>
                <DialogContent>
                        <FormGroup>
                            {listOfSettings.map(s => {
                                return (
                                    <FormControlLabel
                                        key={s.label}
                                        control={
                                            <Checkbox
                                                checked={s.value}
                                                onChange={() => s.setValue(!s.value)}
                                                name={s.label}
                                                style={{ color: ColorAlt2 }} />
                                            }
                                        label={s.label}
                                    />
                                );
                            })}
                        </FormGroup>
                </DialogContent>
                <DialogActions>
                    <AltButton onClick={handleClose} autoFocus>
                        Close
                    </AltButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotView);