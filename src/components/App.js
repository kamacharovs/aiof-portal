import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import Navigation from './Navigation';
import Home from './Home';

export default function App({ children }) {
  return (
    <div>
      <Navigation />
    </div>
  );
}
