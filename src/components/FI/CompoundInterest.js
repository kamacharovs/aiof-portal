import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { numberWithCommas } from '../Finance/Common';
import { GreenP, RedP } from '../../style/common';
import { AiofPaper, AiofLinearProgress } from '../../style/mui';
import { FI_PAGE_LOADED, FI_COMPOUND_INTEREST } from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.fi,
  appName: state.common.appName,
  inProgress: state.fi.inProgress,
  compoundInterest: state.fi.compoundInterest,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: FI_PAGE_LOADED }),
  onSubmit: compoundInterest =>
    dispatch({ type: FI_COMPOUND_INTEREST, payload: agent.Fi.compoundInterest(compoundInterest) })
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

const CompoundInterest = props => {
  const classes = useStyles();
  const [startingAmount, setStartingAmount] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [interest, setInterest] = useState(7);
  const [numberOfYears, setNumberOfYears] = useState(25);
  const [investmentFees, setInvestmentFees] = useState(0.50);
  const [taxDrag, setTaxDrag] = useState(0.50);

  const onSubmitForm = () => ev => {
    ev.preventDefault();

    const compoundInterest = {};

    compoundInterest.startingAmount = startingAmount ? Number(startingAmount) : null;
    compoundInterest.monthlyInvestment = monthlyInvestment ? Number(monthlyInvestment) : null;
    compoundInterest.interest = interest ? Number(interest) : null;
    compoundInterest.numberOfYears = numberOfYears ? Number(numberOfYears) : null;
    compoundInterest.investmentFees = investmentFees ? Number(investmentFees) : null;
    compoundInterest.taxDrag = taxDrag ? Number(taxDrag) : null;

    props.onSubmit(compoundInterest);
  }

  useEffect(() => {
    props.onLoad();

    if (props.compoundInterest) {
      setStartingAmount(props.compoundInterest[0].startingAmount);
      setMonthlyInvestment(props.compoundInterest[0].monthlyInvestment);
      setInterest(props.compoundInterest[0].interest);
      setNumberOfYears(props.compoundInterest[0].numberOfYears);
      setInvestmentFees(props.compoundInterest[0].investmentFees);
      setTaxDrag(props.compoundInterest[0].taxDrag);
    }
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{props.appName} | Compound interest</title>
      </Helmet>
      <Container maxWidth="sm">
        <AiofPaper elevation={3}>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm()}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextField label="Starting amount"
                    value={startingAmount}
                    onChange={e => setStartingAmount(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextField label="Monthly investment"
                    value={monthlyInvestment}
                    onChange={e => setMonthlyInvestment(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextField label="Interest"
                    value={interest}
                    onChange={e => setInterest(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>
                    }} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextField label="Years"
                    value={numberOfYears}
                    onChange={e => setNumberOfYears(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextField label="Investment Fees"
                    value={investmentFees}
                    onChange={e => setInvestmentFees(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>
                    }} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextField label="Tax Drag"
                    value={taxDrag}
                    onChange={e => setTaxDrag(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>
                    }} />
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

        <CompoundInterestResults compoundInterest={props.compoundInterest} inProgress={props.inProgress} />

      </Container>
    </React.Fragment>
  );
}

const CompoundInterestResults = props => {
  if (props.compoundInterest) {
    return (
      <React.Fragment>
        {
          props.compoundInterest.map(ci => {
            return (
              <React.Fragment key={ci.frequency}>
                <AiofPaper elevation={3}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <strong>Beginning</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <GreenP>${numberWithCommas(ci.compoundedBeginning)}</GreenP>
                    </Grid>

                    <Grid item xs={6}>
                      <strong>End</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <GreenP>${numberWithCommas(ci.compoundedEnd)}</GreenP>
                    </Grid>

                    <Grid item xs={12}>
                      <hr />
                    </Grid>

                    <Grid item xs={6}>
                      <strong>Starting amount</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <GreenP>${numberWithCommas(ci.startingAmount)}</GreenP>
                    </Grid>

                    <Grid item xs={6}>
                      <strong>Monthly investment</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <GreenP>${numberWithCommas(ci.monthlyInvestment)}</GreenP>
                    </Grid>

                    <Grid item xs={6}>
                      <strong>Interest</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <GreenP>{ci.interest}%</GreenP>
                    </Grid>

                    <Grid item xs={6}>
                      <strong>Years</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <GreenP>{ci.numberOfYears}</GreenP>
                    </Grid>

                    <Grid item xs={6}>
                      <strong>Frequency</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <GreenP>{ci.frequency}</GreenP>
                    </Grid>

                    <Grid item xs={6}>
                      <strong>Investment fees</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <RedP>{ci.investmentFees}%</RedP>
                    </Grid>

                    <Grid item xs={6}>
                      <strong>Tax drag</strong>
                    </Grid>
                    <Grid item xs={6} align="right">
                      <RedP>{ci.taxDrag}%</RedP>
                    </Grid>
                  </Grid>
                </AiofPaper>
              </React.Fragment>
            );
          })
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CompoundInterest);