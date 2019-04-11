import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile, getProfileByHandle} from '../../actions/profileActions';

import TextFieldGroup from '../common/TextFieldGroup';
import {newSearch} from '../../actions/searchActions';


import { withRouter } from "react-router-dom";

class Navbar extends Component {

  state = {
    search: '',
    errors: {
      search: '',
    },
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors.search !== this.state.errors.search) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

//    const { user } = this.props.auth;

    const searchTerm = {
      ...this.state,
    };

    this.props.newSearch(searchTerm, this.props.history);
    //this.setState({ text: '', url:'' });
    //this.props.history.push(`/search/${this.state.search}`)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onProfileClick(e) {
    e.preventDefault();
    this.props.getProfileByHandle(this.props.auth.user.handle);
    this.props.history.push(`/profile/${this.props.auth.user.handle}`);
  } 


  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
    this.props.history.push("/login");
  }
    render () {
      const { errors } = this.state;
      const {isAuthenticated, user} = this.props.auth;

//      const {profile} = this.props.profile;

      const searchBar =  (      
      <li className="nav-item">
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
          <TextFieldGroup 
            placeholder="Search"
            name="search"
            type="search"
            value={this.state.search}
            onChange={e => this.onChange(e)}
            error={errors.search}
          />
          </div>
          {/* <button type="submit" className="btn btn-dark">
          Submit
          </button> */}
        </form>
      </li>);

      const authLinks = (
        <ul className="navbar-nav ml-auto">
          {searchBar}
          <li className="nav-item">
            <Link className="nav-link" to="/feed">Feed</Link>
          </li>
          <li className="nav-item">
            <button onClick={this.onProfileClick.bind(this)} className="btn btn-outline-primary">
              <img 
              className="rounded-circle"
                src={user.avatar} 
                alt={user.name}
                style={{width:'25px', marginRight:'5px'}}
                title="You must have a gravatar connected to your email to display an image"/>
                {' '} Profile
            </button>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to={`/profile/${user.handle}`}>Profile</Link>
          </li> */}
          <li className="nav-item">
            <button onClick={this.onLogoutClick.bind(this)} className="btn btn-outline-danger">
              <img 
              className="rounded-circle"
                src={user.avatar} 
                alt={user.name}
                style={{width:'25px', marginRight:'5px'}}
                title="You must have a gravatar connected to your email to display an image"/>
                {' '} Logout
            </button>
          </li>
        </ul>
      );
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
          {searchBar}     
        <li className="nav-item">
            <Link className="nav-link" to="/feed">Feed</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      );
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              <Link className="navbar-brand" to="/landing">NewsLetter</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles"> People
                    </Link>
                  </li>
                </ul>
        
                {isAuthenticated ? authLinks : guestLinks}

              </div>
            </div>
          </nav>
        );
    }
}

Navbar.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  newSearch: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
//  profile: state.profile
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile, newSearch, getProfileByHandle}) (withRouter(Navbar));