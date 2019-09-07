import React, {Component} from 'react'

import $ from 'jquery';

import {connect} from "react-redux";

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
    e.preventDefault();

    const email = document.getElementById('email-register').value;
    const firstName = document.getElementById('first-name-register').value;
    const lastName = document.getElementById('last-name-register').value;
    const password = document.getElementById('password-register').value;

    this.props.register(email,password,firstName+' '+lastName);
}

handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    this.props.login(email,password);
  }

  componentDidMount() {

    //form graphic
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

  render() {
    return (
      <div>
        <LoginRegisterFormView {...this.props} handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterForm);