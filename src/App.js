import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import Masthead from './Masthead';

import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Pythag from './components/pythag/Pythag-mobile';
import Denom from './components/denom/Denom-mobile';
import Mastermind from './components/mastermind/Mastermind';
//import './css/math.css';

function withNav(MyComponent, title) {

  return function(...props) {

    return (
    <>
      <Masthead title={title} />
      <main>
        <MyComponent {...props} />
      </main>
    </>
    );
  }
};

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={withNav(Home, 'The Avocational Arithmophile')} />
        <Route path="/pythag" component={withNav(Pythag, 'Pythagorean Toy')} />
        <Route path="/denom" component={withNav(Denom, 'Denominators')} />
        <Route path="/mastermind" component={withNav(Mastermind, 'Mastermind')} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
