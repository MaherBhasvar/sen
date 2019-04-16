import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
//import SelectListGroup from '../common/SelectListGroup';

import {createProfile} from '../../actions/profileActions';
import {loginUser} from '../../actions/authActions';
import {withRouter} from 'react-router-dom'

class CreateProfile extends Component  {
    state = {
        displaySocialInputs: false,
        handle: '',
        age: '',
        // company: '',
        // website: '',
        location: '',
        // status: '',
        interests: '',
        // githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}        
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
    componentDidMount () {
        this.setState({handle : this.props.auth.user.handle});
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("age ",this.state.age)
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
            instagram: this.state.instagram
          };
        //  this.props.loginUser();
        this.props.createProfile(profileData, this.props.auth.user.handle, this.props.history);

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
                  <h1 className="display-4 text-center">Create Your Profile</h1>
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
                    info="date of birth"
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
                    placeholder="* Interests"
                    name="interests"
                    value={this.state.interests}
                    onChange={e => this.onChange(e)}
                    error={errors.interests}
                    info="Singing, Dancing, Music, Coding, Reading, Movies, etc"
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

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth,
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
