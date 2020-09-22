import React from 'react';
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
import Table from 'react-bootstrap/Table';
import { numberWithCommas } from '../Finance/Common';
import { AiofBox } from '../../style/common';
import { FI_TIME_TO_FI } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.fi,
  appName: state.common.appName,
  time: state.fi.time,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: timeToFi =>
    dispatch({ type: FI_TIME_TO_FI, payload: agent.Fi.time(timeToFi) })
});

class TimeToFi extends React.Component {
  constructor() {
    super();

    this.state = {
      startingAmount: 800000,
      monthlyInvestment: 5000,
      desiredYearsExpensesForFi: 25,
      desiredAnnualSpending: 100000,
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

      const timeToFi = Object.assign({}, this.state);

      timeToFi.startingAmount = timeToFi.startingAmount ? Number(timeToFi.startingAmount) : null;
      timeToFi.monthlyInvestment = timeToFi.monthlyInvestment ? Number(timeToFi.monthlyInvestment) : null;
      timeToFi.desiredYearsExpensesForFi = timeToFi.desiredYearsExpensesForFi ? Number(timeToFi.desiredYearsExpensesForFi) : null;
      timeToFi.desiredAnnualSpending = timeToFi.desiredAnnualSpending ? Number(timeToFi.desiredAnnualSpending) : null;

      this.props.onSubmit(timeToFi);
    };
  }

  componentDidMount() {
    if (this.props.time) {
      this.setState({
        startingAmount: this.props.time.startingAmount,
        monthlyInvestment: this.props.time.monthlyInvestment,
        desiredYearsExpensesForFi: this.props.time.desiredYearsExpensesForFi,
        desiredAnnualSpending: this.props.time.desiredAnnualSpending,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Time to FI</title>
        </Helmet>
        <Container maxWidth="sm">
          <AiofBox>
            <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <AttachMoneyIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label="Starting amount"
                          value={this.state.startingAmount}
                          onChange={this.updateState('startingAmount')} />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <AttachMoneyIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label="Monthly investment"
                          value={this.state.monthlyInvestment}
                          onChange={this.updateState('monthlyInvestment')} />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <ArrowUpwardIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label="Years expenses"
                          value={this.state.desiredYearsExpensesForFi}
                          onChange={this.updateState('desiredYearsExpensesForFi')} />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <div className={this.classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <AttachMoneyIcon />
                      </Grid>
                      <Grid item>
                        <TextField id="input-with-icon-grid" label="Annual spending"
                          value={this.state.desiredAnnualSpending}
                          onChange={this.updateState('desiredAnnualSpending')} />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" className={this.classes.button} >
                    Calculate
                </Button>
                </Grid>
              </Grid>
            </form>
          </AiofBox>

          <TimeToFiResults time={this.props.time} />

        </Container>
      </React.Fragment>
    );
  }
}

const TimeToFiResults = props => {
  if (props.time) {
    return (
      <React.Fragment>
      <AiofBox style={{fontSize: ".8125rem"}}>
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
        <hr/>
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
      </AiofBox>
      </React.Fragment>
    );
  }
  return null
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeToFi);