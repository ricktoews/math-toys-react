import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Denom from './Denom';

class Router extends Component {

  render() {
    return (
      <div id="router">
        <MediaQuery query="(max-width:4096px) and (min-width:481px)">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/denom' component={Denom}/>
            <Route path='/denom/:denom' component={Denom}/>
          </Switch>
        </MediaQuery>

        <MediaQuery query="(max-width:480px)">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/denom' component={Denom}/>
            <Route path='/denom/:denom' component={Denom}/>
          </Switch>
        </MediaQuery>
      </div>
    );
  }
}

export default Router;
