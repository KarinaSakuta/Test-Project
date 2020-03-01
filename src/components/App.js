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

export default class App extends Component {
  render() {
    return (
      <div className="app">
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
