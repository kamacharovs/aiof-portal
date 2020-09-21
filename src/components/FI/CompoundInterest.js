import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from 'react-bootstrap/Table';
import { numberWithCommas } from '../Finance/Common';
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
    if (this.props.time) {
      this.setState({
        startingAmount: this.props.time.startingAmount,
        monthlyInvestment: this.props.time.monthlyInvestment,
        interest: this.props.time.interest,
        numberOfYears: this.props.time.numberOfYears,
        investmentFees: this.props.time.investmentFees,
        taxDrag: this.props.time.taxDrag,
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
          <Paper elevation={3} style={{padding: "1rem"}}>
            <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField id="input-with-icon-grid" label="Starting amount"
                      value={this.state.startingAmount}
                      onChange={this.updateState('startingAmount')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField id="input-with-icon-grid" label="Monthly investment"
                      value={this.state.monthlyInvestment}
                      onChange={this.updateState('monthlyInvestment')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField id="input-with-icon-grid" label="Interest"
                      value={this.state.interest}
                      onChange={this.updateState('interest')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField id="input-with-icon-grid" label="Years"
                      value={this.state.numberOfYears}
                      onChange={this.updateState('numberOfYears')} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField id="input-with-icon-grid" label="Investment Fees"
                      value={this.state.investmentFees}
                      onChange={this.updateState('investmentFees')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }} />
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <TextField id="input-with-icon-grid" label="Tax Drag"
                      value={this.state.taxDrag}
                      onChange={this.updateState('taxDrag')}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
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
          </Paper>

          <TimeToFiResults time={this.props.time} />

        </Container>
      </React.Fragment>
    );
  }
}

const TimeToFiResults = props => {
  if (props.time) {
    return (
      <Paper elevation={3}>
        <h3>Results</h3>
        <hr />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <b>Starting amount</b>:
          </Grid>
          <Grid item xs={6}>
            <i style={{ color: "green" }}>${numberWithCommas(props.time.startingAmount)}</i>
          </Grid>

          <Grid item xs={6}>
            <b>Monthly investment</b>:
          </Grid>
          <Grid item xs={6}>
            <i style={{ color: "green" }}>${numberWithCommas(props.time.monthlyInvestment)}</i>
          </Grid>

          <Grid item xs={6}>
            <b>Desired years expenses for FI</b>:
          </Grid>
          <Grid item xs={6}>
            <i style={{ color: "green" }}>{props.time.desiredYearsExpensesForFi}</i>
          </Grid>

          <Grid item xs={6}>
            <b>Desired annual spending</b>:
          </Grid>
          <Grid item xs={6}>
            <i style={{ color: "green" }}>${numberWithCommas(props.time.desiredAnnualSpending)}</i>
          </Grid>

          <Grid item xs={6}>
            <b>Desired retirement savings for FI</b>:
          </Grid>
          <Grid item xs={6}>
            <i style={{ color: "green" }}>${numberWithCommas(props.time.desiredRetirementSavingsForFi)}</i>
          </Grid>

          <Grid item xs={6}>
            <b>Current deficit</b>:
          </Grid>
          <Grid item xs={6}>
            <i style={{ color: "red" }}>${numberWithCommas(props.time.currentDeficit)}</i>
          </Grid>

        </Grid>
        <hr />
        <Table responsive="sm"
          borderless={true}>
          <thead>
            <tr>
              <th>interest</th>
              <th>years</th>
            </tr>
          </thead>
          <tbody>
            {
              props.time.years.map(year => {
                return (
                  <tr>
                    <td>{year.interest}%</td>
                    <td>{year.years}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </Paper>
    );
  }
  return null
}

export default connect(mapStateToProps, mapDispatchToProps)(CompoundInterest);