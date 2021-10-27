import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './store';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import App from './components/App';
import { theme } from './style/mui';


ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={App} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
