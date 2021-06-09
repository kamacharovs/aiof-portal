import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import MainView from './MainView';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  appFullName: state.common.appFullName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: HOME_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

const Home = props => {
  useEffect(() => () => {
    props.onUnload();
  }, []);

  return (
    <React.Fragment>
        <Helmet>
          <title>{props.appName} | Home</title>
        </Helmet>
        
        <MainView />
      </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
