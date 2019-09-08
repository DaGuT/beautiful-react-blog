import React from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes, {string} from 'prop-types'

import {success} from '../../utils/notification.js';

// I could have splitted tables into two, but this option is better as everything
// is in the same place.
const LoginRegisterFormView = (props) => {
  const isAuth = JSON.parse(localStorage.getItem('user'));
  if (isAuth) 
    success("Authorised!");
  return (
    <div className="login-register">
      <div className="form">
        <ul className="tab-group">
          <li className="tab active">
            <a href="#signup">Sign Up</a>
          </li>
          <li className="tab">
            <a href="#login">Log In</a>
          </li>
        </ul>
        <div className="tab-content">
          <div id="signup">
            <h1>Sign Up for Free</h1>
            <form id="register-form" onSubmit={props.handleRegister}>
              <div className="top-row">
                <div className="field-wrap">
                  {props.reg_errors.name && <div style={{
                    color: "white"
                  }}>{props.reg_errors.name}</div>}
                  <label>
                    First Name<span className="req">*</span>
                  </label>
                  <input id="first-name-register" type="text" required autoComplete="off"/>
                </div>
                <div className="field-wrap">
                  {props.reg_errors.name && <div style={{
                    color: "white"
                  }}>&nbsp;</div>}
                  <label>
                    Last Name
                  </label>
                  <input id="last-name-register" type="text" autoComplete="off"/>
                </div>
              </div>
              <div className="field-wrap">
                {props.reg_errors.email && <div style={{
                  color: "white"
                }}>{props.reg_errors.email}</div>}
                <label>
                  Email Address<span className="req">*</span>
                </label>
                <input id="email-register" type="email" required autoComplete="off"/>
              </div>
              <div className="field-wrap">
                {props.reg_errors.password && <div style={{
                  color: "white"
                }}>{props.reg_errors.password}</div>}
                <label>
                  Set A Password<span className="req">*</span>
                </label>
                <input id="password-register" type="password" required autoComplete="off"/>
              </div>
              <button type="submit" className="button button-block">Get Started</button>
            </form>
          </div>
          <div id="login">
            <h1>Welcome Back!</h1>
            <form id="login-form" onSubmit={props.handleLogin}>
              <div className="field-wrap">
                {props.errors.email && <div style={{
                  color: "white"
                }}>{props.errors.email}</div>}
                {props.errors.invalid && <div style={{
                  color: "white"
                }}>{props.errors.invalid}</div>}
                <label>
                  Email Address<span className="req">*</span>
                </label>

                <input
                  id="email-login"
                  type="email"
                  className={props.errors.email
                  ? 'error'
                  : ''}
                  required
                  autoComplete="off"/>
              </div>
              <div className="field-wrap">
                {props.errors.password && <div style={{
                  color: "white"
                }}>{props.errors.password}</div>}
                <label>
                  Password<span className="req">*</span>
                </label>

                <input
                  id="password-login"
                  className={props.errors.password
                  ? 'error'
                  : ''}
                  type="password"
                  required
                  autoComplete="off"/>
              </div>
              <button className="button button-block">Log In</button>
            </form>
          </div>
        </div>{/* tab-content */}
      </div>
      {/* /form */}

      {isAuth && <Redirect to={process.env.PUBLIC_URL + "/"}/>}
    </div>
  )
}

LoginRegisterFormView.propTypes = {
  handleLogin: PropTypes.func.isRequired, //what to do when user tries to login (in my case it's handler that dispatches redux action)
  handleRegister: PropTypes.func.isRequired, //same for register,
  errors: PropTypes.oneOfType([PropTypes.shape({
    errors: PropTypes.shape({email: PropTypes.string, password: PropTypes.string, invalid: PropTypes.string}),
    reg_errors: PropTypes.shape({email: PropTypes.string, password: PropTypes.string, name: PropTypes.string})
  }), PropTypes.string])
}

export default LoginRegisterFormView;