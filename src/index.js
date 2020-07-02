import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PortalNavbar from './components/Navbar';
import App from './App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<PortalNavbar />, document.getElementById('portal-navbar'));
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
