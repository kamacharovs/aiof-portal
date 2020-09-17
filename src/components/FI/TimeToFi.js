import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import agent from '../../agent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FI_TIME_TO_FI } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.auth,
  appName: state.common.appName,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: FI_TIME_TO_FI, payload }),
});

class TimeToFi extends React.Component {
  constructor() {
    super();

    this.state = {
      startingAmount: '',
      monthlyInvestment: '',
      desiredYearsExpensesForFi: '',
      desiredAnnualSpending: '',
    };

    this.classes = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
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

      this.props.onSubmit(agent.Fi.time(timeToFi));
    };
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Time to FI</title>
        </Helmet>
        <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.submitForm}>
          <TextField id="standard-basic" label="Standard" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />

          <Button type="submit" variant="contained" color="primary" className={this.classes.button} >
            Calculate
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeToFi);