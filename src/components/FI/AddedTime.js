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
import { SquarePaper, InPaper, AiofLinearProgress, DefaultRedColor, DefaultGreenColor, ThinText } from '../../style/mui';
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
    green: {
        color: DefaultGreenColor,
        margin: '0rem',
        padding: '0rem'
    },
    red: {
        color: DefaultRedColor,
        margin: '0rem',
        padding: '0rem'
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
                <SquarePaper variant="outlined" square>
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
                                <Button type="submit" variant="contained" color="primary" >
                                    Calculate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </SquarePaper>

                <AddedTimeResults addedTime={props.addedTime} inProgress={props.inProgress} />

            </Container>
        </React.Fragment>
    )
}

const AddedTimeResults = props => {
    if (props.addedTime) {
        const classes = useStyles();

        return (
            <React.Fragment>
                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <h4>
                            <strong>Your results</strong>
                        </h4>
                    </Grid>
                    <Grid container spacing={1}>
                        <ThinText>Based on what you have entered into the form, we have calculated the following results</ThinText>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs>
                            <InPaper title={"Monthly investment"}
                                body={<div className={classes.green}>${numberWithCommas(props.addedTime.monthlyInvestment)}</div>} />
                        </Grid>

                        <Grid item xs>
                            <InPaper title={"Additional expenses"}
                                body={<div className={classes.green}>${numberWithCommas(props.addedTime.totalAdditionalExpense)}</div>} />
                        </Grid>
                    </Grid>
                </SquarePaper>

                <SquarePaper variant="outlined" square>
                    <Grid container spacing={1}>
                        <ThinText>Time added to reach FI (Financial Independence) based on interests</ThinText>
                    </Grid>

                    <Grid container spacing={1}>
                        {
                            props.addedTime.years.map(year => {
                                return (
                                    <Grid container spacing={1} key={year.interest}>
                                        <Grid item xs>
                                            <InPaper title={"Interest"}
                                                body={<div className={classes.green}>{year.interest}%</div>} />
                                        </Grid>
                                        <Grid item xs>
                                            <InPaper title={"Years"}
                                                body={<div className={classes.green}>{year.years}</div>} />
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </SquarePaper>
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