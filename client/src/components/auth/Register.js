import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
//import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

    state = {
        name: 'test',
        handle: 'test',
        email: 'test5@test5.com',
        password: 'test123',
        password2:'test123',
        errors: {},
    };

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
          this.props.history.push('./dashboard')
        }
      }

    componentWillReceiveProps (nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            ...this.state,
        }
        console.log(newUser);

        this.props.registerUser(newUser, this.props.history);

    }

    render() {
        const {errors} = this.state;

        return (
            <div className="register">

            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your NewsLetter account</p>
                  <form  onSubmit={e => this.onSubmit(e)}>
                  <TextFieldGroup 
                      placeholder="Name"
                      name="name"
                      type="name"
                      value={this.state.name}
                      onChange={e => this.onChange(e)}
                      error={errors.name}
                    />
                    <TextFieldGroup
                    placeholder="* Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={e => this.onChange(e)}
                    error={errors.handle}
                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                    />
                    <TextFieldGroup 
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={e => this.onChange(e)}
                      error={errors.email}
                      info="This site uses a Gravatar so if you want a profile image, use a gravatar"
                    />
                    <TextFieldGroup 
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={e => this.onChange(e)}
                      error={errors.password}
                    />
                    <TextFieldGroup 
                      placeholder="Confirm Password"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={e => this.onChange(e)}
                      error={errors.password2}
                    />
                    {/* <div className="form-group">
                      <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.name})} placeholder="Name" name="name"   value={this.state.name} onChange={e => this.onChange(e)}/>
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}
                    </div>
                    <div className="form-group">
                      <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="Email Address" name="email" value={this.state.email} onChange={e => this.onChange(e)}/>
                      <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                      {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>
                    <div className="form-group">
                      <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={e => this.onChange(e)}/>
                      {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="form-group">
                      <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password2})} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={e => this.onChange(e)}/>
                      {errors.password2 && (
                            <div className="invalid-feedback">{errors.password2}</div>
                        )}
                    </div> */}
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => (
    {
        auth:state.auth,
        errors:state.errors,
        
    }
)

export default connect(mapStateToProps, {registerUser})(withRouter(Register));