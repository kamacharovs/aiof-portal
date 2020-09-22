import React from 'react';
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
import { AiofPaper } from '../../style/mui';
import { FI_COMPOUND_INTEREST } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.fi,
  appName: state.common.appName,
  compoundInterest: state.fi.compoundInterest,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: compoundInterest =>
    dispatch({ type: FI_COMPOUND_INTEREST, payload: agent.Fi.compoundInterest(compoundInterest) })
});

class CompoundInterest extends React.Component {
  constructor() {
    super();

    this.state = {
      startingAmount: 0,
      monthlyInvestment: 5000,
      interest: 7,
      numberOfYears: 25,
      investmentFees: 0.50,
      taxDrag: 0.50,
    };

    this.classes = makeStyles((theme) => ({
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

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const compoundInterest = Object.assign({}, this.state);

      compoundInterest.startingAmount = compoundInterest.startingAmount ? Number(compoundInterest.startingAmount) : null;
      compoundInterest.monthlyInvestment = compoundInterest.monthlyInvestment ? Number(compoundInterest.monthlyInvestment) : null;
      compoundInterest.interest = compoundInterest.interest ? Number(compoundInterest.interest) : null;
      compoundInterest.numberOfYears = compoundInterest.numberOfYears ? Number(compoundInterest.numberOfYears) : null;
      compoundInterest.investmentFees = compoundInterest.investmentFees ? Number(compoundInterest.investmentFees) : null;
      compoundInterest.taxDrag = compoundInterest.taxDrag ? Number(compoundInterest.taxDrag) : null;

      this.props.onSubmit(compoundInterest);
    };
  }

  componentDidMount() {
    if (this.props.compoundInterest) {
      this.setState({
        startingAmount: this.props.compoundInterest[0].startingAmount,
        monthlyInvestment: this.props.compoundInterest[0].monthlyInvestment,
        interest: this.props.compoundInterest[0].interest,
        numberOfYears: this.props.compoundInterest[0].numberOfYears,
        investmentFees: this.props.compoundInterest[0].investmentFees,
        taxDrag: this.props.compoundInterest[0].taxDrag,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Compound Interest</title>
        </Helmet>
        <Container maxWidth="sm">
          <AiofPaper elevation={3}>
            <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField label="Starting amount"
                      value={this.state.startingAmount}
                      onChange={this.updateState('startingAmount')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField label="Monthly investment"
                      value={this.state.monthlyInvestment}
                      onChange={this.updateState('monthlyInvestment')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField label="Interest"
                      value={this.state.interest}
                      onChange={this.updateState('interest')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField label="Years"
                      value={this.state.numberOfYears}
                      onChange={this.updateState('numberOfYears')} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField label="Investment Fees"
                      value={this.state.investmentFees}
                      onChange={this.updateState('investmentFees')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField label="Tax Drag"
                      value={this.state.taxDrag}
                      onChange={this.updateState('taxDrag')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>
                      }} />
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" className={this.classes.button} >
                    Calculate
                </Button>
                </Grid>
              </Grid>
            </form>
          </AiofPaper>

          <CompoundInterestResults compoundInterest={this.props.compoundInterest} />

        </Container>
      </React.Fragment>
    );
  }
}

const CompoundInterestResults = props => {
  if (props.compoundInterest) {
    return (
      <AiofPaper elevation={3}>
        <h3>Results</h3>
        <hr />
        {
          props.compoundInterest.map(ci => {
            return (
              <React.Fragment key={ci.frequency}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <b>Beginning</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "green" }}>${numberWithCommas(ci.compoundedBeginning)}</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>End</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "green" }}>${numberWithCommas(ci.compoundedEnd)}</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>Starting amount</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "green" }}>${numberWithCommas(ci.startingAmount)}</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>Monthly investment</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "green" }}>${numberWithCommas(ci.monthlyInvestment)}</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>Interest</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "green" }}>{ci.interest}%</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>Years</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "green" }}>{ci.numberOfYears}</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>Frequency</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "green" }}>{ci.frequency}</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>Investment fees</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "red" }}>{ci.investmentFees}%</i>
                  </Grid>

                  <Grid item xs={6}>
                    <b>Tax drag</b>
                  </Grid>
                  <Grid item xs={6}>
                    <i style={{ color: "red" }}>{ci.taxDrag}%</i>
                  </Grid>
                </Grid>
                <hr />
              </React.Fragment>
            );
          })
        }
      </AiofPaper>
    );
  }
  return null
}

export default connect(mapStateToProps, mapDispatchToProps)(CompoundInterest);