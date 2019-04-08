import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';

import TextFieldGroup from '../common/TextFieldGroup';
import {newSearch} from '../../actions/searchActions';


import { withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:'',
      errors: {}
    };

  //  this.onChange = this.onChange.bind(this);
  //  this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

//    const { user } = this.props.auth;

    const search = {
      search: this.state.search,
    };

    this.props.newSearch(search);
    //this.setState({ text: '', url:'' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      const authLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <form onSubmit={e => this.onSubmit(e)}>
              <div className="form-group">
              <TextFieldGroup 
                placeholder="Search"
                name="search"
                type="search"
                value={this.state.search}
                onChange={e => this.onChange(e)}
                error={errors.name}
              />
              </div>
              {/* <button type="submit" className="btn btn-dark">
              Submit
              </button> */}
            </form>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/feed">Feed</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Profile</Link>
          </li>
          <li className="nav-item">
            <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
              <img 
              className="rounded-circle"
                src={user.avatar} 
                alt={user.name}
                style={{width:'25px', marginRight:'5px'}}
                title="You must have a gravatar connected to your email to display an image"/>
                {' '} Logout
            </a>
          </li>
        </ul>
      );
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              <TextFieldGroup 
                placeholder="Search"
                name="search"
                type="search"
                value={this.state.name}
                onChange={e => this.onChange(e)}
                error={errors.name}
              />
              </div>

            </form>
          </li>        
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
  newSearch: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors:state.errors
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile, newSearch}) (withRouter(Navbar));