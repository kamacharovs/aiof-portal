import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { CookiesProvider } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <CookiesProvider>
          <Route path="/" component={App} />
        </CookiesProvider>
      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
