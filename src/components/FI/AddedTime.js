import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { numberWithCommas } from '../Finance/Common';
import { GreenP, Hr75 } from '../../style/common';
import { AiofPaper, AiofLinearProgress } from '../../style/mui';
import { FI_PAGE_LOADED, FI_ADDED_TIME } from '../../constants/actionTypes';


const mapStateToProps = state => ({
    ...state.fi,
    appName: state.common.appName,
    inProgress: state.fi.inProgress,
    addedTime: state.fi.addedTime,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: FI_PAGE_LOADED }),
    onSubmit: addedTime =>
        dispatch({ type: FI_ADDED_TIME, payload: agent.Fi.addedTime(addedTime) })
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const AddedTime = props => {
    const classes = useStyles();
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    const [totalAdditionalExpense, setTotalAdditionalExpense] = useState(422000);

    const onSubmitForm = ev => {
        ev.preventDefault();

        let addedTime = {};
        addedTime.monthlyInvestment = monthlyInvestment ? Number(monthlyInvestment) : null;
        addedTime.totalAdditionalExpense = totalAdditionalExpense ? Number(totalAdditionalExpense) : null;

        props.onSubmit(addedTime);
    };

    useEffect(() => {
        props.onLoad();

        if (props.addedTime) {
            setMonthlyInvestment(props.addedTime.monthlyInvestment);
            setTotalAdditionalExpense(props.addedTime.totalAdditionalExpense);
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{props.appName} | Added time</title>
            </Helmet>
            <Container maxWidth="sm">
                <AiofPaper elevation={3}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <div className={classes.margin}>
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <AttachMoneyIcon />
                                        </Grid>
                                        <Grid item>
                                            <TextField label="Monthly investment"
                                                value={monthlyInvestment}
                                                onChange={e => setMonthlyInvestment(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <div className={classes.margin}>
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <AttachMoneyIcon />
                                        </Grid>
                                        <Grid item>
                                            <TextField label="Additional expense"
                                                value={totalAdditionalExpense}
                                                onChange={e => setTotalAdditionalExpense(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                                    Calculate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </AiofPaper>

                <AddedTimeResults addedTime={props.addedTime} inProgress={props.inProgress} />

            </Container>
        </React.Fragment>
    )
}

const AddedTimeResults = props => {
    if (props.addedTime) {
        return (
            <React.Fragment>
                <AiofPaper elevation={3}>
                    <Grid container direction="column" spacing={0}>
                        <Grid item xs>
                            <strong>Monthly investment</strong>
                        </Grid>
                        <Grid item xs>
                            <GreenP>${numberWithCommas(props.addedTime.monthlyInvestment)}</GreenP>
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>

                        <Grid>
                            <strong>Total additional expenses</strong>
                        </Grid>
                        <Grid>
                            <GreenP>${numberWithCommas(props.addedTime.totalAdditionalExpense)}</GreenP>
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>
                    </Grid>

                    <br/>

                    <Grid container>
                        {
                            props.addedTime.years.map(year => {
                                return (
                                    <Grid container spacing={0} key={year.interest}>
                                        <Grid item xs>
                                            <strong>Interest: </strong>{year.interest}%
                                            <Hr75 />
                                        </Grid>
                                        <Grid item xs>
                                            <strong>Years: </strong>{year.years}
                                            <Hr75 />
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </AiofPaper>
            </React.Fragment>

        );
    }
    else if (props.inProgress) {
        return (
            <AiofLinearProgress />
        );
    }
    else {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedTime);