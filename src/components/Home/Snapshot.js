import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { AssetPaper, LiabilityPaper, GoalPaper } from '../Common/Papers';
import { SquarePaper } from '../../style/mui';
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
    useEffect(() => {
        if (props.currentUser
            && !props.finance) {
            props.onFinance();
            props.onAssets();
        }
    }, []);

    const classes = useStyles();

    const assets = props.assets ? props.assets : [];
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

    return (
        <SquarePaper variant="outlined" square>
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs>
                    <Grid item xs>
                        <H1Alt6>Overview</H1Alt6>
                        <PAlt7>
                            Below is a snapshot of  your current assets and liabilities.
                            {
                                props.currentUser
                                    ? null
                                    : <React.Fragment>
                                        <br /><br />
                                There is a limited number of functionality you can take advantage of when not logged in. This included.
                                You need to <AltLink to="/login">login</AltLink> in order to update your assets, liabilities.
                            </React.Fragment>
                            }
                        </PAlt7>
                    </Grid>

                    <Grid item xs>
                        <AssetPaper
                            currentUser={props.currentUser}
                            inProgress={props.inProgress && props.inProgressAssets}
                            title={"Assets"}
                            totalAssetValue={assetsSum} />

                        <AssetsChart
                            assets={assets} />
                    </Grid>
                    <Grid item xs>
                        <LiabilityPaper
                            currentUser={props.currentUser}
                            inProgress={props.inProgress}
                            title={"Liabilities"}
                            totalValue={liabilitiesSum}
                            totalMonthlyPayment={liabilitiesMonthlyPaymentSum} />
                    </Grid>
                    <Grid item xs>
                        <GoalPaper
                            currentUser={props.currentUser}
                            inProgress={props.inProgress}
                            title={"Goals"}
                            total={goalsTotal}
                            totalmonthlyContribution={goalsMothlyContributionSum} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotView);