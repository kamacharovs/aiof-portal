import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './store';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from '@material-ui/core/styles';

import App from './components/App';
import { theme } from './style/mui';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
