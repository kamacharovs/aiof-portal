import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';

function App({ children }) {
  return (
    <div>
      <Navigation />
    </div>
  );
}

function mapStateToProps(state) {
  return {
      username: state.username,
      user: state.user
  };
};

export default connect(
  mapStateToProps
)(App)