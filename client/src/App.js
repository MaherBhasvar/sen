import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import {clearCurrentProfile } from './actions/profileActions';


import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile';

import PrivateRoute from './components/common/PrivateRoute';
import {Switch} from 'react-router-dom';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';

import Posts from './components/posts/Posts';
import SearchPosts from './components/posts/SearchPosts';
import Post from './components/post/Post';



//check for token
if(localStorage.jwtToken) {
  console.log(localStorage.jwtToken)
  //set auth token to header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token to get user id ect
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and authenticated
  store.dispatch(setCurrentUser(decoded));

  //set for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
    //TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());

    //Redirect to login 
    window.location.href = '/login';
    }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/landing" component={Landing} />
            <div className="container">
            
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/not-found" component={NotFound} />
              <Route exact path="/feed" component={Posts} />
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/search/:id" component={SearchPosts} />
              <Route exact path="/search/" component={SearchPosts} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
              {/* <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch> */}
              {/* <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch> */}
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
