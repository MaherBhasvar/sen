import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
//import SelectListGroup from '../common/SelectListGroup';

import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import {logoutUser} from '../../actions/authActions';
import {withRouter, Link} from 'react-router-dom'
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component  {
    state = {
        displaySocialInputs: false,
        handle: '',
        age: '',
        // company: '',
        // website: '',
        location: '',
//        status: '',
        interests: '',
        // githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {},
    }

    componentDidMount () {
        this.props.getCurrentProfile();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            const interestsCSV = profile.interests.join(',');
            // If profile field doesnt exist, make empty string
            // profile.company = !isEmpty(profile.company) ? profile.company : '';
            // profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            // profile.githubusername = !isEmpty(profile.githubusername)
            //     ? profile.githubusername
            //     : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                age: profile.age,
                // company: profile.company,
                // website: profile.website,
                location: profile.location,
                // status: profile.status,
                interests: interestsCSV,
                // githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram,
            });
        }
      }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            age: this.state.age,
            // company: this.state.company,
            // website: this.state.website,
            location: this.state.location,
            // status: this.state.status,
            interests: this.state.interests,
            // githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
          };

        this.props.createProfile(profileData, this.props.auth.user.handle,this.props.history);
        if (profileData.handle !== this.props.auth.user.handle) {
            this.props.logoutUser();
        }

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors, displaySocialInputs} = this.state;
        // const options = [
        //     { label: '* Select Professional Status', value: 0 },
        //     { label: 'Developer', value: 'Developer' },
        //     { label: 'Junior Developer', value: 'Junior Developer' },
        //     { label: 'Senior Developer', value: 'Senior Developer' },
        //     { label: 'Manager', value: 'Manager' },
        //     { label: 'Student or Learning', value: 'Student or Learning' },
        //     { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        //     { label: 'Intern', value: 'Intern' },
        //     { label: 'Other', value: 'Other' }
        //   ];
        
        
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={e => this.onChange(e)}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={e => this.onChange(e)}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={e => this.onChange(e)}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={e => this.onChange(e)}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={e => this.onChange(e)}
            error={errors.instagram}
          />
        </div>
      );
    } 
        return (
            <div className="create-profile">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                <Link to="/profiles" className="btn btn-light">
                Go Back
              </Link>
                  <h1 className="display-4 text-center">Edit Your Profile</h1>
                  <p className="lead text-center">
                    Let's get some information to make your profile stand out
                  </p>
                  <small className="d-block pb-3">* = required fields</small>
                  <form onSubmit={e => this.onSubmit(e)}>
                    <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={e => this.onChange(e)}
                    error={errors.handle}
                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                    />
                    <TextFieldGroup
                    placeholder="* Date of Birth"
                    name="age"
                    type="date"
                    value={this.state.age}
                    onChange={e => this.onChange(e)}
                    error={errors.age}
                    info=""
                    />
                    {/* <SelectListGroup
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={e => this.onChange(e)}
                    options={options}
                    error={errors.status}
                    info="Give us an idea of where you are at in your career"
                    />
                    <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={e => this.onChange(e)}
                    error={errors.company}
                    info="Could be your own company or one you work for"
                    />
                    <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={e => this.onChange(e)}
                    error={errors.website}
                    info="Could be your own website or a company one"
                    /> */}
                    <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={e => this.onChange(e)}
                    error={errors.location}
                    info="City or city & state suggested (eg. Boston, MA)"
                    />
                    <TextFieldGroup
                    placeholder="* interests"
                    name="interests"
                    value={this.state.interests}
                    onChange={e => this.onChange(e)}
                    error={errors.interests}
                    info=""
                    />
                    {/* <TextFieldGroup
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={e => this.onChange(e)}
                    error={errors.githubusername}
                    info="If you want your latest repos and a Github link, include your username"
                    /> */}
                    <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={e => this.onChange(e)}
                    error={errors.bio}
                    info="Tell us a little about yourself"
                    />
                    <div className="mb-3">
                        <button
                            type="button"
                            onClick={() => {
                            this.setState(prevState => ({
                                displaySocialInputs: !prevState.displaySocialInputs
                            }));
                            }}
                            className="btn btn-light"
                        >
                            Add Social Network Links
                        </button>
                        <span className="text-muted">Optional</span>
                    </div>
                    {socialInputs}
                    <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                    />                  
                   </form>
                </div>
                </div>
            </div>
            </div>
        );
    }
};

EditProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth,
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile, logoutUser})(withRouter(EditProfile));
