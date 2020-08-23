import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Denom from './math-denom/Denom';
import Denom_mobile from './math-denom/Denom-mobile';
import Phi from './Phi';
import Pythag from './Pythag';
import Mastermind from './mastermind/Mastermind';

class Router extends Component {

  render() {
    return (
      <div id="router">
        <MediaQuery query="(max-width:4096px) and (min-width:481px)">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/denom' component={Denom}/>
            <Route path='/denom/:denom' component={Denom}/>
            <Route path='/phi' component={Phi}/>
            <Route path='/pythag' component={Pythag}/>
            <Route path='/mastermind' component={Mastermind}/>
          </Switch>
        </MediaQuery>

        <MediaQuery query="(max-width:480px)">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/denom' component={Denom_mobile}/>
            <Route path='/denom/:denom' component={Denom_mobile}/>
            <Route path='/phi' component={Phi}/>
            <Route path='/pythag' component={Pythag}/>
            <Route path='/mastermind' component={Mastermind}/>
          </Switch>
        </MediaQuery>
      </div>
    );
  }
}

export default Router;
