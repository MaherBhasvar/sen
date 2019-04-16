import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile, getProfileByHandle} from '../../actions/profileActions';

import TextFieldGroup from '../common/TextFieldGroup';
import {getNewSearch, clearSearchTerm} from '../../actions/postActions';

import Dropdown from 'react-bootstrap/Dropdown';

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
//    this.props.history.push(`/search/${searchTerm.search}`)
  console.log("sent from onSubmit Navbar")
    this.props.getNewSearch(this.state.search, this.props.history);
    this.props.history.push(`/search/${this.state.search}`)
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

  onEmptyState () {
    this.setState({search: ''})
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
//      console.log(errors);
//      const {profile} = this.props.profile;
      let dropdown;


      if(isAuthenticated){
      if (user.notification !== null) {
        dropdown = (
          <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" > 
            Notification
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {user.notification.length === 0 ? (
              <Dropdown.Item href="">No Notifications</Dropdown.Item>
            ) : (
              <div>
                {user.notification.map(note => <Dropdown.Item href="#/action-1" key="note">{note}</Dropdown.Item>)}
              </div>
            )}
          </Dropdown.Menu>
        </Dropdown>
        );
      }
    }

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


          <li className="nav-item">
            {dropdown}
          </li>
          <li className="nav-item">
          <span className="px-3 pb-3">
            <button onClick={this.onProfileClick.bind(this)} className="btn btn-outline-light">
              <img 
              className="rounded-circle"
                src={user.avatar} 
                alt={user.name}
                style={{width:'20px', marginRight:'5px'}}
                title="You must have a gravatar connected to your email to display an image"/>
                {' '} Profile
            </button>
            </span>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to={`/profile/${user.handle}`}>Profile</Link>
          </li> */}
          <li className="nav-item">
            <button onClick={this.onLogoutClick.bind(this)} className="btn btn-outline-danger">
                {' '} Logout
            </button>
          </li>

        </ul>
      );
      const guestLinks = (
        <ul className="navbar-nav ml-auto  mr-auto">
            
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
            <div className="container nav-item navbar-nav mr-auto ">
              <Link className="navbar-brand" to="/landing" onClick={(e) => {this.props.clearSearchTerm(); this.onEmptyState()}}>NewsLetter</Link>
              <Link className="nav-link" to="/profiles" onClick={(e) => {this.props.clearSearchTerm()}}> People</Link>
              <Link className="nav-link" to="/feed" onClick={(e) => {this.props.clearSearchTerm(); this.onEmptyState()}}>Feed</Link>
              {searchBar} 
              <div className="collapse navbar-collapse" id="mobile-nav">
                {/* <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles"> People
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/feed">Feed</Link>
                  </li >
                  <li className="nav-item">
                  {searchBar} 
                  </li>
                </ul> */}
        
                {isAuthenticated ? authLinks : guestLinks}

              </div>
            </div>
          </nav>
        );
    }
}

Navbar.propTypes = {
  clearSearchTerm: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  getNewSearch: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
//  profile: state.profile
});

export default connect(mapStateToProps, {clearSearchTerm, logoutUser, clearCurrentProfile, getNewSearch, getProfileByHandle}) (withRouter(Navbar));