import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//setting themes
import themeObject from './util/theme'

//MUI stuff
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

//redux
import {Provider} from 'react-redux'
import store from './redux/store'

import jwtDecode from 'jwt-decode'

import AuthorizedRoute from './components/AuthorizedRoute'
//pages
import signup from './pages/signup'
import login from './pages/login'
import home from './pages/home'
import welcome from './pages/welcome'
import monthView from './pages/monthView'
import profile from './pages/profile'

//component
import NavBar from './components/NavBar'
import { SET_AUTHENTICATED } from './redux/types';
import {getAuthenticatedUserDataAndTodos} from './redux/actions/dataActions'
import {logoutUser} from './redux/actions/userActions'
import axios from 'axios';

const theme = createMuiTheme(themeObject)

//verify token
const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = './login'
  }else {
    store.dispatch({type : SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getAuthenticatedUserDataAndTodos())
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={welcome} />
                <AuthorizedRoute exact path="/home" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <AuthorizedRoute exact path="/month-view" component={monthView} />
                <AuthorizedRoute exact path="/profile" component={profile} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;
