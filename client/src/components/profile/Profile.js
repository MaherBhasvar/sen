import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
// import ProfileCreds from './ProfileCreds';
// import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      console.log("didmount")
      this.props.getProfileByHandle(this.props.match.params.handle);
      console.log(this.props.match.params.handle)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading && this.props.match.params.handle !== this.props.auth.user.handle) {
      this.props.history.push('/not-found');
    } //else if (this.props.match.params.handle === this.props.auth.user.handle && this.props.profile.profile.handle !== this.props.auth.user.handle){
      // this.props.getProfileByHandle(this.props.match.params.handle);
      // console.log(this.props.match.params.handle);
    //}
  }

  updateProfile() {
    this.props.getProfileByHandle(this.props.match.params.handle);
  }

  render() {
    
    const { profile, loading } = this.props.profile;
    const {auth} = this.props;
    const {user} = this.props.auth;

    //handle of profile state !== handle of url





    //dashboard content is for new users

    let  dashboardContent = (
      <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
          Create Profile
          </Link>
      </div>
    );
    const dashboard = (
      <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <h1 className="display-4">Profile Setup</h1>
          {dashboardContent}
          </div>
          </div>
      </div>
      </div>
    );

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      let editProfile = null;
      //edit-profile button while viewing profile (profile.user._id === auth.user.id || 
      if(this.props.auth.isAuthenticated && this.props.match.params.handle === auth.user.handle) {
        if(profile.handle !== this.props.match.params.handle) {
          this.updateProfile();
        }

        console.log("true");
        editProfile =(
          <div className="col-md-6" >
            <Link to="/edit-profile" className="btn btn-light mb-3 float-right">
                <i className="fas fa-user-circle text-info mr-1"></i> 
                Edit Profile
            </Link>
        </div>
        );
      };
      //adding profile content
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Go To Profiles
              </Link>
            </div>
            {editProfile}
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {/* <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null} */}
        </div>
      );
    }

    let displayContent;
    if(profile === null && this.props.match.params.handle === auth.user.handle) {
      displayContent = dashboard;
    } else if (profile === null || loading) {
      displayContent = <Spinner/>;
    } else {
      displayContent = profileContent
    }


    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{displayContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
