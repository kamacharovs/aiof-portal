import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { Overview } from './Overview';
import { SquarePaper, CoolLink } from '../../style/mui';
import { RectSkeleton } from '../Common/Sekeleton';
import { numberWithCommas, formatDate } from './Common';
import { FINANCE_PAGE_LOADED } from '../../constants/actionTypes';
import { GOAL_TYPE_MAPPING } from '../../constants/goals';

import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

import AddAsset from './AssetEditor';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.finance.inProgress,
    finance: state.finance,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: FINANCE_PAGE_LOADED, payload: agent.User.get() }),
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
        color: theme.palette.grey.hr,
        opacity: '90%'
    },
    green: {
        color: theme.palette.success.main,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: theme.palette.error.main,
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
                    <Grid item xs>
                        <b>Name</b>
                    </Grid>
                    <Grid item xs>
                        <b>Type</b>
                    </Grid>
                    <Grid item xs>
                        <b>Monthly payment</b>
                    </Grid>
                    <Grid item xs>
                        <b>Years</b>
                    </Grid>
                    <Grid item xs>
                        <b>Value</b>
                    </Grid>
                </Grid>
                {
                    liabilities.map(liability => {
                        return (
                            <Grid key={liability.publicKey} container spacing={3} className={classes.root}>
                                <Grid item xs>
                                    {liability.name}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    {liability.typeName}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    <p className={classes.red}>${liability.monthlyPayment ? numberWithCommas(liability.monthlyPayment) : 0}</p>
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    {liability.years ? liability.years : "Unspecified"}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    <p className={classes.red}>${numberWithCommas(liability.value)}</p>
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
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        No liabilities yet...
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
                    <Grid item xs>
                        <b>Name</b>
                    </Grid>
                    <Grid item xs>
                        <b>Type</b>
                    </Grid>
                    <Grid item xs>
                        <b>Planned date</b>
                    </Grid>
                    <Grid item xs>
                        <b>Goal</b>
                    </Grid>
                    <Grid item xs>
                        <b>Current amount</b>
                    </Grid>
                </Grid>
                {
                    goals.map(goal => {
                        return (
                            <Grid key={goal.publicKey} container spacing={3} className={classes.root}>
                                <Grid item xs>
                                    {goal.name}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    {GOAL_TYPE_MAPPING[goal.type.toUpperCase()]}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    {formatDate(goal.plannedDate)}
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    <p className={classes.green}>${numberWithCommas(goal.amount)}</p>
                                    <hr className={classes.hr} />
                                </Grid>

                                <Grid item xs>
                                    <p className={classes.green}>${numberWithCommas(goal.currentAmount)}</p>
                                    <hr className={classes.hr} />
                                </Grid>
                            </Grid>
                        );
                    })
                }

                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs>
                        <CoolLink to={`/finance/goals`}>
                            A more detailed view of your goals can be found in your profile's Goals page
                        </CoolLink>
                    </Grid>
                </Grid>
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
                <GoalsPreview
                    goals={props.goals}
                    currentUser={props.currentUser} />
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

const FinanceMainView = props => {
    const classes = useStyles();

    useEffect(() => {
        if (props.currentUser) {
            props.onLoad();
        }
    }, []);

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
                    </Grid>

                    <Grid item xs={9}>
                        <React.Fragment>
                            <Grid container spacing={3} className={classes.root}>
                                <Grid item xs>
                                    {
                                        props.inProgress
                                            ? <RectSkeleton height={400} />
                                            : <MainTabs
                                                currentUser={props.currentUser}
                                                assets={props.assetsBase}
                                                liabilities={props.liabilities}
                                                goals={props.goalsBase}
                                                subscriptions={props.subscriptions}
                                                onLoad={props.onLoad} />
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