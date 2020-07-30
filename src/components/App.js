import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Navigation from './Navigation';

export default function App({ children }) {
  return (
    <div>
      <ErrorBoundary>
        <Navigation />
      </ErrorBoundary>
    </div>
  );
}