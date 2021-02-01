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
import { ThinText } from '../../style/common';
import { SquarePaper, InPaper, AiofLinearProgress, DefaultRedColor, DefaultGreenColor } from '../../style/mui';
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
        </SquarePaper>

        <TimeToFiResults time={props.time} inProgress={props.inProgress} />

      </Container>
    </React.Fragment>
  );
}

const TimeToFiResults = props => {
  if (props.time) {
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
            <ThinText>
              Based on what you have entered into the form, we have calculated the following results
            </ThinText>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <InPaper title={"Starting amount"}
                body={<div className={classes.green}>${numberWithCommas(props.time.startingAmount)}</div>} />
            </Grid>

            <Grid item xs>
              <InPaper title={"Monthly investment"}
                body={<div className={classes.green}>${numberWithCommas(props.time.monthlyInvestment)}</div>} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <InPaper title={"Desired years expenses"}
                body={<div className={classes.green}>{props.time.desiredYearsExpensesForFi}</div>} />
            </Grid>

            <Grid item xs>
              <InPaper title={"Desired annual spending"}
                body={<div className={classes.green}>${numberWithCommas(props.time.desiredAnnualSpending)}</div>} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <InPaper title={"Desired retirement savings"}
                body={<div className={classes.green}>${numberWithCommas(props.time.desiredRetirementSavingsForFi)}</div>} />
            </Grid>

            <Grid item xs>
              <InPaper title={"Current deficit"}
                body={<div className={classes.red}>${numberWithCommas(props.time.currentDeficit)}</div>} />
            </Grid>
          </Grid>
        </SquarePaper>

        <SquarePaper variant="outlined" square>
          <Grid container spacing={1}>
            <ThinText>
              Time to reach FI (Financial Independence) based on interests
            </ThinText>
          </Grid>

          <Grid container spacing={1}>
            {
              props.time.years.map(year => {
                return (
                  <Grid container spacing={1}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeToFi);