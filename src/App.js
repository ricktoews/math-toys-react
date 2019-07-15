import React from 'react';
import './App.css';
import Router from './Router';

function header() {
  return (
      <header className="App-header">
          Arithmophile
      </header>
  );
}

function App() {
  return (
    <div className="App">
      {header()}
      <Router />
    </div>
  );
}

export default App;
