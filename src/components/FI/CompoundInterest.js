import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { TextFieldInputAdornment, TextFieldMoneyInputAdornment, TextFieldPercInputAdornment } from '../Common/Inputs';
import { numberWithCommas } from '../Finance/Common';
import { SquarePaper, InPaper, AiofLinearProgress, TextMain } from '../../style/mui';
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
  green: {
    color: theme.palette.success.main,
    margin: '0rem',
    padding: '0rem'
  },
  red: {
    color: theme.palette.error.main,
    margin: '0rem',
    padding: '0rem'
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
    compoundInterest.investmentFees = investmentFees ? Number(investmentFees) : 0;
    compoundInterest.taxDrag = taxDrag ? Number(taxDrag) : 0;

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
        <SquarePaper variant="outlined" square>
          <Grid container>
            <Grid item xs>
              <Typography variant="h1">
                Compound interest calculator
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              <TextMain>
                Your compound interest information
              </TextMain>
            </Grid>
          </Grid>
        </SquarePaper>

        <SquarePaper variant="outlined" square>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitForm()}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextFieldMoneyInputAdornment
                    id="starting-amount"
                    label="Starting amount"
                    value={startingAmount}
                    onChange={e => setStartingAmount(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextFieldMoneyInputAdornment
                    id="monthly-investment"
                    label="Monthly investment"
                    value={monthlyInvestment}
                    onChange={e => setMonthlyInvestment(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextFieldPercInputAdornment
                    id="interest"
                    label="Interest"
                    value={interest}
                    onChange={e => setInterest(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextFieldInputAdornment
                    id="years"
                    label="Years"
                    value={numberOfYears}
                    onChange={e => setNumberOfYears(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextFieldPercInputAdornment
                    id="investment-fees"
                    label="Investment Fees"
                    value={investmentFees}
                    onChange={e => setInvestmentFees(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className={classes.margin}>
                  <TextFieldPercInputAdornment
                    id="tax-drag"
                    label="Tax Drag"
                    value={taxDrag}
                    onChange={e => setTaxDrag(e.target.value)} />
                </div>
              </Grid>

              <Grid item xs={12}>
                <Button 
                  id="calculate-button"
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  className={classes.button} >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </form>
        </SquarePaper>

        <CompoundInterestResults compoundInterest={props.compoundInterest} inProgress={props.inProgress} />

      </Container>
    </React.Fragment>
  );
}

const CompoundInterestResults = props => {
  if (props.compoundInterest) {
    const classes = useStyles();
    const ciDefault = props.compoundInterest.filter(x => x.frequency === 12)[0];

    return (
      <React.Fragment>
        <SquarePaper variant="outlined" square>
          <Grid container spacing={1}>
            <Typography variant="h1">
              Your results
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <TextMain>
              Based on what you have entered into the form, we have calculated the following results
            </TextMain>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <InPaper title={"Compounded"}
                body={<div className={classes.green}>${numberWithCommas(ciDefault.compoundedBeginning)}</div>} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <InPaper title={"Starting amount"}
                body={<div className={classes.green}>${numberWithCommas(ciDefault.startingAmount)}</div>} />
            </Grid>
            <Grid item xs>
              <InPaper title={"Monthly investment"}
                body={<div className={classes.green}>${numberWithCommas(ciDefault.monthlyInvestment)}</div>} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <InPaper title={"Interest"}
                body={<div className={classes.green}>{ciDefault.interest}%</div>} />
            </Grid>
            <Grid item xs>
              <InPaper title={"Years"}
                body={<div className={classes.green}>{ciDefault.numberOfYears}</div>} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <InPaper title={"Frequency (months)"}
                body={<div className={classes.green}>{ciDefault.frequency}</div>} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs>
              <InPaper title={"Investment fees"}
                body={<div className={classes.red}>{ciDefault.investmentFees}%</div>} />
            </Grid>
            <Grid item xs>
              <InPaper title={"Tax drag"}
                body={<div className={classes.red}>{ciDefault.taxDrag}%</div>} />
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompoundInterest);