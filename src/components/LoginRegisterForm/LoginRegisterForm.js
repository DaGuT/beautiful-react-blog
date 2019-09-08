import React, {Component} from 'react'

import $ from 'jquery';

import {connect} from "react-redux";

import config from '../../config/config.js';

import LoginRegisterFormView from './LoginRegisterForm-view'
import './LoginRegisterForm.scss'
import {mapStateToProps, mapDispatchToProps} from './LoginRegisterForm-redux';

class LoginRegisterForm extends Component {

  constructor() {
    super();

    this.handleLogin = this
      .handleLogin
      .bind(this);
    this.handleRegister = this
      .handleRegister
      .bind(this);
  }

  handleRegister(e) {
    //prevenging browser default form sumission
    e.preventDefault();

    //grabbing user data
    const email = document.getElementById('email-register').value;
    const firstName = document.getElementById('first-name-register').value;
    const lastName = document.getElementById('last-name-register').value;
    const password = document.getElementById('password-register').value;

    //trying to register
    this.props.register(email,password,firstName+' '+lastName);
}

handleLogin(e) {
  //upon login submit, we want to do our own things
    e.preventDefault();
    
    //we grab user dada
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    //and we send login request and store result in localStorage
    this.props.login(email,password);
  }

  componentDidMount() {

    //chaning title to be appropriate to login
    document.title = config.siteName + '- Login or Register';

    //form graphic used to make switches and highlight for fields
    $('.form')
      .find('input, textarea')
      .on('keyup blur focus', function (e) {

        var $this = $(this),
          label = $this.prev('label');

        if (e.type === 'keyup') {
          if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
        } else if (e.type === 'blur') {
          if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.removeClass('highlight');
          }
        } else if (e.type === 'focus') {

          if ($this.val() === '') {
            label.removeClass('highlight');
          } else if ($this.val() !== '') {
            label.addClass('highlight');
          }
        }

      });

    $('.tab a').on('click', function (e) {

      e.preventDefault();

      $(this)
        .parent()
        .addClass('active');
      $(this)
        .parent()
        .siblings()
        .removeClass('active');

      let target = $(this).attr('href');

      $('.tab-content > div')
        .not(target)
        .hide();

      $(target).fadeIn(600);

    });
  }

  //changing title back
  componentWillUnmount() {
    document.title = config.siteName;
  }

  render() {
    return (
      <div>
        <LoginRegisterFormView {...this.props} handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);