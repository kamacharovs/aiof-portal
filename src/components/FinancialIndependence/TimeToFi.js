import React from 'react';
import agent from '../../agent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FI_TIME_TO_FI } from '../../constants/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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
    const classes = useStyles();
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} | Time to FI</title>
        </Helmet>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Standard" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeToFi);