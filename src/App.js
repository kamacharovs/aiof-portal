import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Login from './components/Login';

export default function  App() {
  return (
    <div id="root" className="App">
      <Login></Login>
    </div>
  );
}
