import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'',
      text: '',
//      handle: this.props.profile.handle,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      url: this.state.url,
//      handle: this.state.handle,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    console.log(this.props.auth);

    this.props.addPost(newPost);
    this.setState({ text: ''});
    this.setState({url: ''});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              <TextFieldGroup
                  placeholder="URL"
                  name="url"
                  type="url"
                  value={this.state.url}
                  onChange={this.onChange}
                  error={errors.url}
                />
                <TextAreaFieldGroup
                  placeholder="My Thoughts"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
