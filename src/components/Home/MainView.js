import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import BannerView from './Banner';
import SnapshotView from './Snapshot';
import GettingStartedView from './GettingStarted';
import StatisticsView from './Statistics';


const mapStateToProps = state => ({
  ...state.home,
  ...state.finance,
  appName: state.common.appName,
  appFullName: state.common.appFullName,
  currentUser: state.common.currentUser,
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
        <Grid item xs={4}>
          <SnapshotView
            currentUser={props.currentUser} />
        </Grid>

        <Grid item xs={8}>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
