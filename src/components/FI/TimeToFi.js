import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { numberWithCommas } from '../Finance/Common';
import { GreenP, RedP, Hr75 } from '../../style/common';
import { AiofPaper, AiofLinearProgress } from '../../style/mui';
import { FI_PAGE_LOADED, FI_TIME_TO_FI } from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.fi,
  appName: state.common.appName,
  inProgress: state.fi.inProgress,
  time: state.fi.time,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: FI_PAGE_LOADED }),
  onSubmit: timeToFi =>
    dispatch({ type: FI_TIME_TO_FI, payload: agent.Fi.time(timeToFi) })
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

const TimeToFi = props => {
  const classes = useStyles();
  const [startingAmount, setStartingAmount] = useState(800000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [desiredYearsExpensesForFi, setDesiredYearsExpensesForFi] = useState(25);
  const [desiredAnnualSpending, setDesiredAnnualSpending] = useState(100000);

  const onSubmitForm = ev => {
    ev.preventDefault();

    let timeToFi = {};
    timeToFi.startingAmount = startingAmount ? Number(startingAmount) : null;
    timeToFi.monthlyInvestment = monthlyInvestment ? Number(monthlyInvestment) : null;
    timeToFi.desiredYearsExpensesForFi = desiredYearsExpensesForFi ? Number(desiredYearsExpensesForFi) : null;
    timeToFi.desiredAnnualSpending = desiredAnnualSpending ? Number(desiredAnnualSpending) : null;

    props.onSubmit(timeToFi);
  };

  useEffect(() => {
    props.onLoad();

    if (props.time) {
      setStartingAmount(props.time.startingAmount);
      setMonthlyInvestment(props.time.monthlyInvestment);
      setDesiredYearsExpensesForFi(props.time.desiredYearsExpensesForFi);
      setDesiredAnnualSpending(props.time.desiredAnnualSpending);
    }
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.appName} | Time to FI</title>
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
                      <TextField id="input-with-icon-grid" label="Starting amount"
                        value={startingAmount}
                        onChange={e => setStartingAmount(e.target.value)} />
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
                      <TextField id="input-with-icon-grid" label="Monthly investment"
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
                      <ArrowUpwardIcon />
                    </Grid>
                    <Grid item>
                      <TextField id="input-with-icon-grid" label="Years expenses"
                        value={desiredYearsExpensesForFi}
                        onChange={e => setDesiredYearsExpensesForFi(e.target.value)} />
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
                      <TextField id="input-with-icon-grid" label="Annual spending"
                        value={desiredAnnualSpending}
                        onChange={e => setDesiredAnnualSpending(e.target.value)} />
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

        <TimeToFiResults time={props.time} inProgress={props.inProgress} />

      </Container>
    </React.Fragment>
  );
}

const TimeToFiResults = props => {
  if (props.time) {
    return (
      <React.Fragment>
        <AiofPaper elevation={3}>
          <Grid container direction="column" spacing={0}>
            <Grid item xs>
              <strong>Starting amount</strong>
            </Grid>
            <Grid item xs>
              <GreenP>${numberWithCommas(props.time.startingAmount)}</GreenP>
            </Grid>
            <Grid>
              <br />
            </Grid>

            <Grid>
              <strong>Monthly investment</strong>
            </Grid>
            <Grid>
              <GreenP>${numberWithCommas(props.time.monthlyInvestment)}</GreenP>
            </Grid>
            <Grid>
              <br />
            </Grid>

            <Grid>
              <strong>Desired years expenses for FI</strong>
            </Grid>
            <Grid>
              {props.time.desiredYearsExpensesForFi}
            </Grid>
            <Grid>
              <br />
            </Grid>

            <Grid>
              <strong>Desired annual spending</strong>
            </Grid>
            <Grid>
              <GreenP>${numberWithCommas(props.time.desiredAnnualSpending)}</GreenP>
            </Grid>
            <Grid>
              <br />
            </Grid>

            <Grid>
              <strong>Desired retirement savings for FI</strong>
            </Grid>
            <Grid>
              <GreenP>${numberWithCommas(props.time.desiredRetirementSavingsForFi)}</GreenP>
            </Grid>
            <Grid>
              <br />
            </Grid>

            <Grid>
              <strong>Current deficit</strong>
            </Grid>
            <Grid>
              <RedP>${numberWithCommas(props.time.currentDeficit)}</RedP>
            </Grid>
            <Grid>
              <br />
            </Grid>
          </Grid>

          <Grid>
            <br/>
          </Grid>

          <Grid container>
            {
              props.time.years.map(year => {
                return (
                  <Grid container spacing={0}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeToFi);