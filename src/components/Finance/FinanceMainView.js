import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { Overview } from './Overview';
import { Bar } from 'react-chartjs-2';
import { SquarePaper, InPaper, DefaultRedColor, DefaultGreenColor, DefaultHrColor } from '../../style/mui';
import { CoolExternalLink, CoolLink } from '../../style/common';
import { RectSkeleton } from '../Common/Sekeleton';
import House from '../../style/icons/House_4.svg';
import { numberWithCommas, formatDate } from './Common';
import { FINANCE_PAGE_LOADED, ANALYTICS_ANALYZE, UTILITY_USEFUL_DOCUMENTATION_BY_PAGE } from '../../constants/actionTypes';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import AddAsset from './AssetEditor';
import AddLiability from './LiabilityEditor';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.finance.inProgress,
    finance: state.finance,
    usefulDocumentationsInProgress: state.utility.inProgress,
    usefulDocumentations: state.utility.usefulDocumentations,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: FINANCE_PAGE_LOADED, payload: agent.User.get() }),
    onAnalyze: (assets, liabilities) =>
        dispatch({ type: ANALYTICS_ANALYZE, payload: agent.Analytics.analyze({ assets, liabilities }) }),
    onUsefulDocumentations: () =>
        dispatch({ type: UTILITY_USEFUL_DOCUMENTATION_BY_PAGE, payload: agent.Utility.usefulDocumentationByPage("finance") }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    dialogPaper: {
        minHeight: '40vh',
        maxHeight: '80vh',
        minWidth: '40vh',
        maxWidth: '90vh',
    },
    margin: {
        margin: theme.spacing(1),
    },
    hr: {
        borderTop: '1px solid',
        marginTop: '0.25rem',
        color: DefaultHrColor,
        opacity: '90%'
    },
    green: {
        color: DefaultGreenColor,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: DefaultRedColor,
        margin: '0rem',
        padding: '0rem'
    }
}));

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`assets-liabilities-goals-tabpanel-${index}`}
            aria-labelledby={`assets-liabilities-goals-simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <React.Fragment>
                    <Box p={3}>
                        {children}
                    </Box>
                </React.Fragment>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = index => {
    return {
        id: `assets-liabilities-goals-simple-tab-${index}`,
        'aria-controls': `assets-liabilities-goals-tabpanel-${index}`,
    };
}

const AssetsPreview = props => {
    const classes = useStyles();
    const assets = props.assets ? props.assets : [];

    const [openAdd, setOpenAdd] = React.useState(false);

    const handleClickAddOpen = () => {
        setOpenAdd(true);
    };
    const handleAddClose = (added) => {
        setOpenAdd(false);

        if (props.currentUser && added === true) {
            props.onLoad();
        }
    };

    if (assets && assets.length > 0) {
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={4}>
                        <b>Name</b>
                    </Grid>
                    <Grid item xs={4}>
                        <b>Type</b>
                    </Grid>
                    <Grid item xs={4}>
                        <b>Value</b>
                    </Grid>
                </Grid>
                {
                    assets.map(asset => {
                        return (
                            <Grid key={asset.publicKey} container spacing={3} className={classes.root}>
                                <Grid item xs={4}>
                                    {asset.name}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={4}>
                                    {asset.typeName}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={4}>
                                    <p className={classes.green}>${numberWithCommas(asset.value)}</p>
                                    <hr className={classes.hr} />
                                </Grid>
                            </Grid>
                        );
                    })
                }

                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleClickAddOpen}>
                            Add
                    </Button>
                        <AssetAddDialog open={openAdd} onClose={handleAddClose} />
                    </Grid>

                    <Grid item xs={12}>
                        <CoolLink to="/asset/breakdown">
                            Or see how your cash assets can grow over the years
                    </CoolLink>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        No assets yet...
                </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleClickAddOpen}>
                            Add
                    </Button>
                        <AssetAddDialog open={openAdd} onClose={handleAddClose} />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

const LiabilitiesPreview = props => {
    const classes = useStyles();
    const liabilities = props.liabilities ? props.liabilities : [];

    const [openAdd, setOpenAdd] = React.useState(false);

    const handleClickAddOpen = () => {
        setOpenAdd(true);
    };
    const handleAddClose = (added) => {
        setOpenAdd(false);

        if (props.currentUser && added === true) {
            props.onLoad();
        }
    };

    if (liabilities && liabilities.length > 0) {
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={2}>
                        <b>Name</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Type</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Monthly payment</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Years</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Value</b>
                    </Grid>
                </Grid>
                {
                    liabilities.map(liability => {
                        return (
                            <Grid key={liability.publicKey} container spacing={3} className={classes.root}>
                                <Grid item xs={2}>
                                    {liability.name}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    {liability.typeName}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    <p className={classes.red}>${liability.monthlyPayment ? numberWithCommas(liability.monthlyPayment) : 0}</p>
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    {liability.years ? liability.years : "Unspecified"}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    <p className={classes.red}>${numberWithCommas(liability.value)}</p>
                                    <hr className={classes.hr} />
                                </Grid>
                            </Grid>
                        );
                    })
                }

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleClickAddOpen}>
                        Add
                    </Button>
                    <LiabilityAddDialog open={openAdd} onClose={handleAddClose} />
                </Grid>
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        No liabilities yet...
                </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleClickAddOpen}>
                            Add
                    </Button>
                        <LiabilityAddDialog open={openAdd} onClose={handleAddClose} />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

const GoalsPreview = props => {
    const classes = useStyles();
    const goals = props.goals ? props.goals : [];

    if (goals && goals.length > 0) {
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={2}>
                        <b>Name</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Type</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Planned date</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Frequency</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Goal</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Current amount</b>
                    </Grid>
                </Grid>
                {
                    goals.map(goal => {
                        return (
                            <Grid key={goal.publicKey} container spacing={3} className={classes.root}>
                                <Grid item xs={2}>
                                    {goal.name}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    {goal.typeName}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    {formatDate(goal.plannedDate)}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    {goal.contributionFrequencyName}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    <p className={classes.green}>${numberWithCommas(goal.amount)}</p>
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={2}>
                                    <p className={classes.green}>${numberWithCommas(goal.currentAmount)}</p>
                                    <hr className={classes.hr} />
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                No goals yet...
            </React.Fragment>
        );
    }
}

const SubscriptionsPreview = props => {
    const classes = useStyles();
    const subscriptions = props.subscriptions ? props.subscriptions : [];

    if (subscriptions && subscriptions.length > 0) {
        return (
            <React.Fragment>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={3}>
                        <b>Name</b>
                    </Grid>
                    <Grid item xs={3}>
                        <b>Description</b>
                    </Grid>
                    <Grid item xs={3}>
                        <b>From</b>
                    </Grid>
                    <Grid item xs={3}>
                        <b>Amount</b>
                    </Grid>
                </Grid>
                {
                    subscriptions.map(subscription => {
                        return (
                            <Grid key={subscription.publicKey} container spacing={3} className={classes.root}>
                                <Grid item xs={3}>
                                    {subscription.name}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={3}>
                                    {subscription.description}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={3}>
                                    {subscription.from}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs={3}>
                                    <p className={classes.green}>${numberWithCommas(subscription.amount)}</p>
                                    <hr className={classes.hr} />
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                No subscriptions yet...
            </React.Fragment>
        );
    }
}

const AssetsLiabilitiesChart = props => {
    const assets = props.assets ? props.assets : [];
    const liabilities = props.liabilities ? props.liabilities : [];

    if ((!assets && assets.length === 0)
        || (!liabilities && liabilities.length === 0)) {
        return null;
    }

    const title = 'Assets vs. Liabilities';
    const assetsSum = props.totalAssets
        ? props.totalAssets
        : assets.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);
    const liabilitiesSum = props.totalLiabilities
        ? props.totalLiabilities
        : liabilities.map(a => a.value)
            .reduce((sum, current) => sum + current, 0);

    const state = {
        labels: [],
        datasets: [
            {
                label: 'Assets',
                backgroundColor: '#2FDE00',
                hoverBackgroundColor: '#2FDE00',
                data: [assetsSum]
            },
            {
                label: 'Liabilities',
                backgroundColor: '#B21F00',
                hoverBackgroundColor: '#B21F00',
                data: [liabilitiesSum]
            }
        ]
    }
    const options = {
        title: {
            display: true,
            text: title,
            fontSize: 20
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ]
        }
    }

    return (
        <Bar
            data={state || []}
            options={options}
        />
    );
}

const MainTabs = props => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <SquarePaper variant="outlined" square>
            <Tabs value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="assets liabilities goals tabs">
                <Tab label="Assets" {...a11yProps(0)} />
                <Tab label="Liabilities" {...a11yProps(1)} />
                <Tab label="Goals" {...a11yProps(2)} />
                <Tab label="Subscriptions" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AssetsPreview assets={props.assets} currentUser={props.currentUser} onLoad={props.onLoad} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LiabilitiesPreview liabilities={props.liabilities} currentUser={props.currentUser} onLoad={props.onLoad} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GoalsPreview goals={props.goals} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <SubscriptionsPreview subscriptions={props.subscriptions} />
            </TabPanel>
        </SquarePaper>
    );
}

const AssetAddDialog = props => {
    const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleAddClick = (added) => {
        onClose(added);
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="asset-add-dialog"
            open={open}
            classes={{ paper: classes.dialogPaper }}>
            <DialogTitle id="asset-add-dialog-title">Add asset</DialogTitle>
            <DialogContent>
                <AddAsset onAdd={handleAddClick} />
            </DialogContent>
        </Dialog>
    );
}
AssetAddDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

const LiabilityAddDialog = props => {
    const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleAddClick = (added) => {
        onClose(added);
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="liability-add-dialog"
            open={open}
            classes={{ paper: classes.dialogPaper }}>
            <DialogTitle id="liability-add-dialog-title">Add liability</DialogTitle>
            <DialogContent>
                <AddLiability onAdd={handleAddClick} />
            </DialogContent>
        </Dialog>
    );
}
LiabilityAddDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

const AnalyzeView = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <h4>
                <strong>Analytics</strong>
            </h4>

            {props.analyze ?
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <InPaper
                            title={"Assets total"}
                            body={<div className={classes.green}>${numberWithCommas(props.analyze.assetsTotal)}</div>} />
                    </Grid>

                    <Grid item xs={4}>
                        <InPaper
                            title={"Liabilities total"}
                            body={<div className={classes.red}>${numberWithCommas(props.analyze.liabilitiesTotal)}</div>} />
                    </Grid>

                    <Grid item xs={4}>
                        <InPaper
                            title={"Assets to liabilities difference"}
                            body={props.analyze.analytics.diff > 0
                                ? <div className={classes.green}>${numberWithCommas(props.analyze.analytics.diff)}</div>
                                : <div className={classes.red}>${numberWithCommas(props.analyze.analytics.diff)}</div>} />
                    </Grid>


                    {props.analyze.analytics.cashToCcRatio === null && props.analyze.analytics.ccToCashRatio === null
                        ? null
                        : <React.Fragment>
                            <InPaper
                                title={
                                <strong>
                                    {
                                        props.analyze.analytics.cashToCcRatio !== null
                                            ? "Cash to credit card ratio"
                                            : "Credit card to cash ratio"
                                    }
                                </strong>
                                }
                                body={
                                    props.analyze.analytics.cashToCcRatio !== null
                                        ? props.analyze.analytics.cashToCcRatio + "%"
                                        : props.analyze.analytics.ccToCashRatio + "%"
                                } />
                        </React.Fragment>
                    }

                    {props.analyze.analytics.debtToIncomeRatio === null || Number(props.analyze.analytics.debtToIncomeRatio) === 0
                        ? null
                        : <React.Fragment>
                            <Grid item xs>
                                <strong>Debt to income ratio</strong>
                            </Grid>
                            <Grid item xs>
                                ${numberWithCommas(props.analyze.analytics.debtToIncomeRatio)}
                            </Grid>
                        </React.Fragment>
                    }
                </Grid>
                : "Please add more information in order to run Analytics. Such as at least one Asset and Liability"}
        </React.Fragment>
    );
}

const UsefulDocumentation = props => {
    const docs = props.usefulDocumentations ? props.usefulDocumentations : [];

    return (
        <SquarePaper variant="outlined" square>
            <Grid item xs={12}>
                <img src={House} alt="House" style={{ width: "5rem", height: "5rem" }} />
            </Grid>
            <Grid item xs={12}>
                <br />
                <h6><b>Useful documentations</b></h6>
            </Grid>
            <Grid item xs={12}>
                <ul>
                    {
                        docs.map(d => {
                            return (
                                <li key={d.publicKey}><CoolExternalLink href={d.url}>{d.name}</CoolExternalLink></li>
                            );
                        })
                    }
                </ul>
            </Grid>
        </SquarePaper>
    );
}



const FinanceMainView = props => {
    const classes = useStyles();

    useEffect(() => {
        if (props.currentUser) {
            props.onLoad();
            props.onUsefulDocumentations();
        }
    }, []);
    useEffect(() => {
        if (props.currentUser && props.finance) {
            if (props.finance.assets && props.finance.liabilities) {
                props.onAnalyze(props.finance.assets, props.finance.liabilities);
            }
        }
    }, [props.finance.assets, props.finance.liabilities]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Finance</title>
            </Helmet>

            <Container maxWidth="xl">
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={3}>

                        <Grid item xs={12}>
                            {
                                props.inProgress
                                    ? <RectSkeleton height={600} />
                                    : <SquarePaper variant="outlined" square>
                                        <Overview />
                                    </SquarePaper>
                            }
                        </Grid>

                        <Grid item xs={12}>
                            {
                                props.usefulDocumentationsInProgress
                                    ? <RectSkeleton height={300} />
                                    : <UsefulDocumentation usefulDocumentations={props.usefulDocumentations} />
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={9}>
                        <React.Fragment>
                            <Grid container spacing={3} className={classes.root}>
                                <Grid item xs>
                                    {
                                        props.inProgress
                                            ? <RectSkeleton height={400} />
                                            : <MainTabs
                                                assets={props.assets}
                                                liabilities={props.liabilities}
                                                goals={props.goals}
                                                subscriptions={props.subscriptions}
                                                currentUser={props.currentUser}
                                                onLoad={props.onLoad} />
                                    }
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} className={classes.root}>
                                <Grid item xs>
                                    {
                                        props.inProgress
                                            ? <RectSkeleton height={400} />
                                            : <SquarePaper variant="outlined" square>
                                                <AssetsLiabilitiesChart
                                                    assets={props.assets}
                                                    liabilities={props.liabilities} />
                                            </SquarePaper>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} className={classes.root}>
                                <Grid item xs>
                                    {
                                        props.inProgress
                                            ? <RectSkeleton />
                                            : <SquarePaper variant="outlined" square>
                                                <AnalyzeView analyze={props.analyze} />
                                            </SquarePaper>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} className={classes.root}>
                                <Grid item xs>
                                    {
                                        props.inProgress
                                            ? <RectSkeleton height={100} />
                                            : <SquarePaper variant="outlined" square>
                                                More to come...
                                              </SquarePaper>
                                    }
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </Grid>

                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceMainView);