import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
//import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';

import {getProfileByHandle} from '../../actions/profileActions';

class Login extends Component {
    
    state = {
        email: 'test2@test2.com',
        password: 'test123',
        errors: {},
    };

    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.getProfileByHandle(this.props.auth.user.handle);
        this.props.history.push('./feed')
      }
    }

    componentWillReceiveProps (nextProps)  {

      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/feed');
      } 
      if(nextProps.errors) {
          this.setState({errors: nextProps.errors});
      }
  }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            ...this.state,
        };
        this.props.loginUser(userData);
        
    }
    render() {
      const {errors} = this.state;
      
        return (
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your NewsLetter account</p>
                  <form onSubmit={e => this.onSubmit(e)}>
                    <TextFieldGroup 
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={e => this.onChange(e)}
                      error={errors.email}
                    />
                    <TextFieldGroup 
                      placeholder="passwodrd"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={e => this.onChange(e)}
                      error={errors.password}
                    />
                    {/* <div className="form-group">
                      <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="Email Address" name="email" value={this.state.email} onChange={e => this.onChange(e)}/>
                      {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>
                    <div className="form-group">
                      <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={e => this.onChange(e)}/>
                      {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                        {console.log(errors.password)}
                    </div> */}
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Login.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth : state.auth,
  errors: state.errors,
}); 

export default connect(mapStateToProps, {loginUser, getProfileByHandle})(Login);