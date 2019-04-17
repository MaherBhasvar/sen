import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    // interest List
    const interests = profile.interests.map((interest, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {interest}
      </div>
      
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Interest Set</h3>
            <p className="lead">Interest: {profile.interests.map((interest, index) => (
              <span key={interest}>
                {interest.split(' ').map(tag => (
                  <span key={tag}>
                  <span className="badge badge-secondary text-decoration-none"><a style={{ color: 'white' }} href= {'/search/'+tag}  >{tag}</a></span> 
                  <span className="" > </span>
                  </span>
                ))}

              
              </span>
            ))}</p>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
