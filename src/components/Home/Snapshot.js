import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import UsefulDocumentationView from './UsefulDocumentation';

import { AssetPaper, LiabilityPaper, GoalPaper, DependentPaper, AssetsAndLiabilitiesTotalChartPaper } from '../Common/Papers';
import { SquarePaper, AltCancelButton, H5Alt6, PAlt7, AltLink } from '../../style/mui';
import { FINANCE, ASSETS, LIABILITIES, HOME_SNAPSHOT_SETTING_UPDATE } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.finance,
    ...state.home,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    settings: state.home.settings,
    inProgress: state.finance.inProgress,
    inProgressAssets: state.finance.inProgressAssets,
    inProgressLiabilities: state.finance.inProgressLiabilities,
});

const mapDispatchToProps = dispatch => ({
    onFinance: () =>
        dispatch({ type: FINANCE, payload: agent.User.get() }),
    onAssets: () =>
        dispatch({ type: ASSETS, payload: agent.Asset.all() }),
    onLiabilities: () =>
        dispatch({ type: LIABILITIES, payload: agent.Liability.all() }),
    onSettingsUpdate: (field, value) =>
        dispatch({ type: HOME_SNAPSHOT_SETTING_UPDATE, field, value }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

const SnapshotView = props => {
    const classes = useStyles();

    const [showAssets, setShowAssets] = useState();
    const [showLiabilities, setShowLiabilities] = useState();
    const [showGoals, setShowGoals] = useState();
    const [showDependentss, setShowDependentss] = useState();

    const defaultShow = true;
    useEffect(() => {
        const stateShowAssets = props.settings ? (props.settings.showAssets === false ? props.settings.showAssets : defaultShow) : defaultShow;
        const stateShowLiabilities = props.settings ? (props.settings.showLiabilities === false ? props.settings.showLiabilities : defaultShow) : defaultShow;
        const stateShowGoals = props.settings ? (props.settings.showGoals === false ? props.settings.showGoals : defaultShow) : defaultShow;
        const stateShowDependents = props.settings ? (props.settings.showDependents === false ? props.settings.showDependents : defaultShow) : defaultShow;

        setShowAssets(stateShowAssets);
        setShowLiabilities(stateShowLiabilities);
        setShowGoals(stateShowGoals);
        setShowDependentss(stateShowDependents);
    }, []);

    const handleSetShow = (showName, showValue, setShow) => {
        setShow(showValue);
        props.onSettingsUpdate(showName, showValue);
    }

    let listOfSettings = [
        {
            show: showAssets,
            showName: "showAssets",
            setShow: setShowAssets,
            handleSetShow: handleSetShow,
            label: "Show Assets"
        },
        {
            show: showLiabilities,
            showName: "showLiabilities",
            setShow: setShowLiabilities,
            handleSetShow: handleSetShow,
            label: "Show Liabilities"
        },
        {
            show: showGoals,
            showName: "showGoals",
            setShow: setShowGoals,
            handleSetShow: handleSetShow,
            label: "Show Goals"
        },
        {
            show: showDependentss,
            showName: "showDependents",
            setShow: setShowDependentss,
            handleSetShow: handleSetShow,
            label: "Show Dependents"
        },
    ]

    const currentUser = props.currentUser;
    const inProgress = props.inProgress;
    const inProgressAssets = props.inProgressAssets;
    const inProgressLiabilities = props.inProgressLiabilities;

    const assets = props.assets ? props.assets : [];
    const assetsTotal = assets.length;
    const assetsSum = assets.map(a => a.value)
        .reduce((sum, current) => sum + current, 0);

    const liabilities = props.liabilities ? props.liabilities : [];
    const liabilitiesTotal = liabilities.length;
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
            props.onLiabilities();
        }
    }, []);

    return (
        <React.Fragment>
            <SquarePaper variant="outlined" square>
                <Grid container spacing={1} className={classes.root}>
                    <Grid item xs>
                        <Grid item xs>
                            <Grid container>
                                <Grid item xs>
                                    <Typography variant="h1">Overview</Typography>
                                </Grid>

                                <Grid item xs>
                                    <Grid container justifyContent="flex-end">
                                        {
                                            props.currentUser
                                                ? <SettingsButton
                                                    listOfSettings={listOfSettings}
                                                    onSettingsUpdate={props.onSettingsUpdate} />
                                                : null
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <PAlt7>
                                    Below is a snapshot of  your current financial well being
                                    {props.currentUser
                                        ? null
                                        : <React.Fragment>
                                            <br /><br />
                                            There is a limited number of functionality you can take advantage of when not logged in. This included.
                                            You need to <AltLink to="/login">login</AltLink> in order to update your assets, liabilities
                                        </React.Fragment>
                                    }
                                </PAlt7>
                            </Grid>
                        </Grid>

                        <Grid item xs>
                            {showAssets
                                ? <AssetPaper
                                    currentUser={currentUser}
                                    inProgress={inProgressAssets}
                                    title={"Assets"}
                                    total={assetsTotal}
                                    totalValue={assetsSum} />
                                : null}
                        </Grid>
                        <Grid item xs>
                            {showLiabilities
                                ? <LiabilityPaper
                                    currentUser={currentUser}
                                    inProgress={inProgressLiabilities}
                                    title={"Liabilities"}
                                    total={liabilitiesTotal}
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

            <AssetsAndLiabilitiesChart
                currentUser={currentUser}
                assets={assets}
                liabilities={liabilities} />

            <UsefulDocumentationView
                currentUser={currentUser} />
        </React.Fragment>
    );
};

const SettingsButton = props => {
    const theme = useTheme();
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
            <Tooltip title="Settings">
                <IconButton
                    style={{ color: theme.palette.text.header }}
                    onClick={handleClickOpen}
                    size="large">
                    <SettingsIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose} >
                <DialogTitle>
                </DialogTitle>
                <DialogContent>
                    <FormGroup>
                        {listOfSettings.map(s => {
                            return (
                                <FormControlLabel
                                    key={s.showName}
                                    control={
                                        <Checkbox
                                            checked={s.show}
                                            onChange={() => s.handleSetShow(s.showName, !s.show, s.setShow)}
                                            name={s.label}
                                            style={{ color: theme.palette.primary.main }} />
                                    }
                                    label={s.label}
                                />
                            );
                        })}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <AltCancelButton onClick={handleClose} autoFocus />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const AssetsAndLiabilitiesChart = props => {
    if (props.currentUser
        && props.assets
        && props.liabilities) {
        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <Grid container>
                        <Grid item xs>
                            <H5Alt6>Your assets vs. liabilities</H5Alt6>
                            <PAlt7>
                                This chart shows your total assets' value versus your total liabilities' value. This can be
                                helpful in order to grasp at your financial well being from a high level overview
                                <br /><br />

                            </PAlt7>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs>
                            <AssetsAndLiabilitiesTotalChartPaper
                                assets={props.assets}
                                liabilities={props.liabilities} />
                        </Grid>
                    </Grid>
                </SquarePaper>
            </React.Fragment>
        );
    } else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotView);