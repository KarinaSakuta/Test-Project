import React, {Component} from 'react';
import ListPage from './ListPage';
import DetailsPage from './DetailsPage';
import Footer from './Footer';
import LoginPage from './LoginPage';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Favicon from 'react-favicon';
import logoIcon from '../assets/img/cat-icon.png';

export default class App extends Component {

  renderIcon() {
    return (
      <div>
        <Favicon url={logoIcon} />
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        {this.renderIcon()}
        <Router>
          <main className="app__main">
            <Switch>
              <Route component={ListPage} exact={true} path="/"></Route>
              <Route component={DetailsPage} path="/details/:catId"></Route>
              <Route component={LoginPage} path="/login"></Route>
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}
