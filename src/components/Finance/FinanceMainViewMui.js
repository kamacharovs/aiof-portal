import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { FINANCE_PAGE_LOADED, LIABILITY_ADD, LIABILITY_TYPES } from '../../constants/actionTypes';

import { Overview } from './Overview';
import { AiofPaper } from '../../style/mui';
import Calculator from '../../style/icons/Calculator.svg';
import { numberWithCommas, formatDate } from './Common';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const mapStateToProps = state => ({
    ...state.finance,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    inProgress: state.finance.inProgress,
    finance: state.finance,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: FINANCE_PAGE_LOADED, payload }),
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
    hr: {
        borderTop: '1px solid',
        marginTop: '0.25rem',
        color: '#ebebeb',
        opacity: '90%'
    },
    green: {
        color: 'green',
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: 'red',
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
        </React.Fragment>
    );
}

const LiabilitiesPreview = props => {
    const classes = useStyles();
    const liabilities = props.liabilities ? props.liabilities : [];

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
                liabilities.map(liability => {
                    return (
                        <Grid key={liability.publicKey} container spacing={3} className={classes.root}>
                            <Grid item xs={4}>
                                {liability.name}
                                <hr className={classes.hr} />
                            </Grid>

                            <Grid item xs={4}>
                                {liability.typeName}
                                <hr className={classes.hr} />
                            </Grid>

                            <Grid item xs={4}>
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

const MainTabs = props => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AiofPaper elevation={3}>
            <Tabs value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="assets liabilities goals tabs">
                <Tab label="Assets" {...a11yProps(0)} />
                <Tab label="Liabilities" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AssetsPreview assets={props.assets} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <LiabilitiesPreview liabilities={props.liabilities} />
            </TabPanel>
        </AiofPaper>
    );
}

const FinanceMainView = props => {
    const classes = useStyles();

    useEffect(() => {
        if (props.currentUser) {
            props.onLoad(agent.User.get(props.currentUser.id));
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Finance</title>
            </Helmet>

            <Container maxWidth="lg">
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={4}>

                        <Grid item xs={12}>
                            <AiofPaper elevation={3}>
                                <Overview />
                            </AiofPaper>
                        </Grid>

                        <Grid item xs={12}>
                            <AiofPaper elevation={3}>

                            </AiofPaper>
                        </Grid>

                    </Grid>

                    <Grid item xs={8}>

                        <Grid item xs={12}>
                            <MainTabs assets={props.assets} liabilities={props.liabilities} />
                        </Grid>

                        <Grid item xs={12}>
                            <AiofPaper elevation={3}>
                                <p>more</p>
                            </AiofPaper>
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceMainView);