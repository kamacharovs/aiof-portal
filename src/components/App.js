import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import agent from '../agent';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import ProfileStepper from '../components/ProfileStepper';
import Profile from '../components/ProfileMui';
import ProfileSettings from '../components/ProfileSettings';
import FinanceMainView from '../components/Finance/FinanceMainViewMui';
import AssetBreakdown from '../components/Finance/AssetBreakdown';
import LiabilityEditor from '../components/Finance/LiabilityEditor';

import FI from '../components/FI';
import TimeToFi from '../components/FI/TimeToFi';
import AddedTime from '../components/FI/AddedTime';
import CompoundInterest from '../components/FI/CompoundInterest';
import Bmi from '../components/FI/Bmi';
import { store } from '../store';
import { push } from 'react-router-redux';
import Cookies from 'js-cookie';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { ACCESS_TOKEN, USER } from '../constants/common';


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    appDescription: state.common.appDescription,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = Cookies.get(ACCESS_TOKEN);
    const user = Cookies.getJSON(USER);
    agent.setToken(token);
    this.props.onLoad(user, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <React.Fragment>
          <Helmet>
            <title>{this.props.appName}</title>
            <meta charSet="utf-8" />
            <meta name="description" content={this.props.appDescription} />
          </Helmet>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile/update" component={ProfileStepper} />
            <Route exact path="/@:username/finance" component={FinanceMainView} />
            <Route exact path="/@:username/finance/liability" component={LiabilityEditor} />
            <Route exact path="/@:username/settings" component={ProfileSettings} />
            <Route exact path="/@:username" component={Profile} />
            <Route exact path="/fi" component={FI} />
            <Route exact path="/fi/added/time" component={AddedTime} />
            <Route exact path="/fi/time" component={TimeToFi} />
            <Route exact path="/fi/compound/interest" component={CompoundInterest} />
            <Route exact path="/fi/bmi" component={Bmi} />
            <Route exact path="/asset/breakdown" component={AssetBreakdown} />
          </Switch>
          <Footer
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        <Footer
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </React.Fragment>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
