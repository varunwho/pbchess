import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import Profile from './components/profile/profile';
import Lobby from './components/lobby/lobby';
import NotFound from './components/pagenotfound/pagenotfound';
import PrivateRoute from './components/private/private';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user)
      this.setState({
        currentUser: user,
      });
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: null
    });
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
        <Navbar
          currentUser = { this.state.currentUser }
          logOut = { this.logOut }
        />

        <div>
          <Switch>
            <Route exact path = '/' component = { Home } />
            <Route exact path = '/login' component = { Login } />
            <Route exact path = '/register' component = { Register } />
            <Route path = '/@' component = { Profile } />
            <PrivateRoute path = '/live' component = { Lobby } />
            <Route component = { NotFound } />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
