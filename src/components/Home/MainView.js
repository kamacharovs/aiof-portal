import React from 'react';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import BannerView from './Banner';
import SnapshotView from './Snapshot';
import GettingStartedView from './GettingStarted';
import StatisticsView from './Statistics';
import AnalyzeView from './Analyze';


const mapStateToProps = state => ({
  ...state.home,
  ...state.finance,
  appName: state.common.appName,
  appFullName: state.common.appFullName,
  currentUser: state.common.currentUser,
  profile: state.finance.profile,
  assets: state.finance.assets,
  liabilities: state.finance.liabilities,
  goals: state.finance.goalsBase,
});

const mapDispatchToProps = dispatch => ({
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

const MainView = props => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={3}>
          <SnapshotView
            currentUser={props.currentUser} />
        </Grid>

        <Grid item xs={9}>
          <Grid container className={classes.root}>
            <BannerView
              currentUser={props.currentUser}
              appName={props.appName}
              appFullName={props.appFullName} />
          </Grid>

          <Grid container className={classes.root}>
            <GettingStartedView
              currentUser={props.currentUser}
              appName={props.appName} />
          </Grid>

          <Grid container className={classes.root}>
            <StatisticsView
              currentUser={props.currentUser}
              assets={props.assets}
              liabilities={props.liabilities} />
          </Grid>

          <Grid container>
            <AnalyzeView
              assets={props.assets}
              liabilities={props.liabilities}
              grossSalary={props.profile ? props.profile.grossSalary : null} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
