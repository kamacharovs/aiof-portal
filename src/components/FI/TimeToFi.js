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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { numberWithCommas } from '../Finance/Common';
import { GreenP, RedP } from '../../style/common';
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
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <b>Starting amount</b>
            </Grid>
            <Grid item xs={6} align="right">
              <GreenP>${numberWithCommas(props.time.startingAmount)}</GreenP>
            </Grid>

            <Grid item xs={6}>
              <b>Monthly investment</b>
            </Grid>
            <Grid item xs={6} align="right">
              <GreenP>${numberWithCommas(props.time.monthlyInvestment)}</GreenP>
            </Grid>

            <Grid item xs={6}>
              <b>Desired years expenses for FI</b>
            </Grid>
            <Grid item xs={6} align="right">
              <GreenP>{props.time.desiredYearsExpensesForFi}</GreenP>
            </Grid>

            <Grid item xs={6}>
              <b>Desired annual spending</b>
            </Grid>
            <Grid item xs={6} align="right">
              <GreenP>${numberWithCommas(props.time.desiredAnnualSpending)}</GreenP>
            </Grid>

            <Grid item xs={6}>
              <b>Desired retirement savings for FI</b>
            </Grid>
            <Grid item xs={6} align="right">
              <GreenP>${numberWithCommas(props.time.desiredRetirementSavingsForFi)}</GreenP>
            </Grid>

            <Grid item xs={6}>
              <b>Current deficit</b>
            </Grid>
            <Grid item xs={6} align="right">
              <RedP>${numberWithCommas(props.time.currentDeficit)}</RedP>
            </Grid>
          </Grid>

          <Table responsive="sm"
            borderless={true}>
            <TableHead>
              <TableRow>
                <TableCell align="left"><strong>Interest</strong></TableCell>
                <TableCell align="left"><strong>Years</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.time.years.map(year => {
                  return (
                    <TableRow key={year.interest}>
                      <TableCell align="left">{year.interest}%</TableCell>
                      <TableCell align="left">{year.years}</TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
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