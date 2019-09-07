import config from '../../config/config';

import {error as showError} from '../../utils/notification.js';

import axios from 'axios';

//--------------- ACTIONS

const LOGIN = "LOGIN";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGIN_LOADING = "LOGIN_LOADING";
const LOGIN_LOADED = "LOGIN_LOADED";

const REGISTER = "REGISTER";
const REGISTER_ERROR = "REGISTER_ERROR";
const REGISTER_LOADING = "REGISTER_LOADING";
const REGISTER_LOADED = "REGISTER_LOADED";

function formatErrors(e) {
  const errors = {};

  if (e.response && e.response.status === 422) {

    for (let error in e.response.data) {
      errors[error] = e.response.data[error][0];
    }

  }

  if (e.response && e.response.status===401) {
    errors['invalid'] = "Invalid credentials";
  }

  return errors;
}

const login = (email, password) => async(dispatch, getState) => {
  let data;
  try {
    dispatch({type: LOGIN_LOADING});

    data = await axios.post(`${config.apiBaseUrl}/auth/login`, {email, password});
    localStorage.setItem('user', JSON.stringify(data.data.data));

    dispatch({type: LOGIN, payload: data.data.data})

    dispatch({type: LOGIN_LOADED});

  } catch (e) {

    const errors = formatErrors(e);

    dispatch({
      type: LOGIN_ERROR,
      payload: (errors || e || true)
    });
    showError(e.message);
  }
}

const register = (email, password, name) => async(dispatch, getState) => {

  let data;
  try {
    dispatch({type: REGISTER_LOADING});

    data = await axios.post(`${config.apiBaseUrl}/auth/register`, {email, password, name});
    localStorage.setItem('user', JSON.stringify(data.data.data));

    dispatch({type: REGISTER, payload: data})

    dispatch({type: REGISTER_LOADED});

  } catch (e) {

    const errors = formatErrors(e);

    dispatch({
      type: REGISTER_ERROR,
      payload: (errors || e || true)
    });
    showError(e.message);
  }

}

//--------------- REDUCER

export const authReducer = (state = {
  loading: false,
  errors: {},
  reg_errors:{},
  user: JSON.parse(localStorage.getItem('user'))
}, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false
      }
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        errors: {}
      }
    case LOGIN_LOADED:
      return {
        ...state,
        loading: false
      }
    case LOGIN:
      return {
        ...state,
        user: action.payload
      }
    case REGISTER:
      return {
        ...state,
        user: action.payload
      }
    case REGISTER_ERROR:
      return {
        ...state,
        reg_errors: action.payload,
        reg_loading: false
      }
    case REGISTER_LOADING:
      return {
        ...state,
        reg_loading: true,
        reg_errors: {}
      }
    case REGISTER_LOADED:
      return {
        ...state,
        reg_loading: false
      }
    default:
      return state;
  }
}

//--------------- mapStateToProps and mapDispatchToProps

export const mapStateToProps = state => ({auth: state.auth.user, loading: state.auth.loading, errors: state.auth.errors, reg_loading: state.auth.reg_loading, reg_errors: state.auth.reg_errors});

export const mapDispatchToProps = dispatch => ({
  login: (email, password) => {
    dispatch(login(email, password));
  },
  register: (email, password, name) => {
    dispatch(register(email, password, name));
  }
});