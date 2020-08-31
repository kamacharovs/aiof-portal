import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ProfileSettings from '../components/ProfileSettings';
import FinanceMainView from '../components/Finance/FinanceMainView';
import Subscriptions from '../components/Finance/Subscriptions';
import Register from '../components/Register';
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
        <div>
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
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route exact path="/@:username/finance/subscriptions" component={Subscriptions} />
            <Route exact path="/@:username/finance" component={FinanceMainView} />
            <Route exact path="/@:username/settings" component={ProfileSettings} />
            <Route exact path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
