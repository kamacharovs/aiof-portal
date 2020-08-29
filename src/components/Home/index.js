import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import Banner from './Banner';
import MainView from './MainView';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.onLoad(Promise.all([
        agent.UserProfile.get(this.props.currentUser.username)
      ]));
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <React.Fragment>
        <Banner token={this.props.token} appName={this.props.appName} />
        
        <MainView />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
