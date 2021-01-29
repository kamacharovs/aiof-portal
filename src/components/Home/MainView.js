import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SquarePaper } from '../../style/mui';


const mapStateToProps = state => ({
  ...state.home,
  token: state.common.token,
  currentUser: state.common.currentUser
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

        <Grid item xs={12}>
          <SquarePaper variant="outlined" square>
            More to come...
          </SquarePaper>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
