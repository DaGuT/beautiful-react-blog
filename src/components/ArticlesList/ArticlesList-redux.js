import config from '../../config/config';

import {error as showError} from '../../utils/notification.js';

import axios from 'axios';

//--------------- ACTIONS

const GET_ARTICLES_LIST = "GET_ARTICLES_LIST";
const GET_ARTICLES_LIST_LOADING = "GET_ARTICLES_LIST_LOADING";
const GET_ARTICLES_LIST_LOADED = "GET_ARTICLES_LIST_LOADED";
const GET_ARTICLES_LIST_ERROR = "GET_ARTICLES_LIST_ERROR";

const DELETE_ARTICLE_LOADING = "DELETE_ARTICLE_LOADING";
const DELETE_ARTICLE_LOADED = "DELETE_ARTICLE_LOADED";
const DELETE_ARTICLE_ERROR = "DELETE_ARTICLE_ERROR";

const getArticlesList = (page = 1) => async(dispatch, getState) => {

  //saying we're loading
  dispatch({type: GET_ARTICLES_LIST_LOADING});

  //error handling
  try {
    const response = await axios.get(`${config.apiBaseUrl}/articles/?page=${page}`);

    //returning data to redux
    dispatch({type: GET_ARTICLES_LIST, payload: response.data.data});

    //saying it's loaded
    dispatch({type: GET_ARTICLES_LIST_LOADED});
  } catch (e) { // in case of error, we dispatch error
    showError(e.message);
    dispatch({type: GET_ARTICLES_LIST_ERROR, payload: e});
  }

}

const getMyArticlesList = (page = 1) => async(dispatch, getState) => {

  //saying we're loading
  dispatch({type: GET_ARTICLES_LIST_LOADING});

  const token = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token;

  //error handling
  try {
    const response = await axios.get(`${config.apiBaseUrl}/user/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //returning data to redux
    dispatch({type: GET_ARTICLES_LIST, payload: response.data.data});

    //saying it's loaded
    dispatch({type: GET_ARTICLES_LIST_LOADED});
  } catch (e) { // in case of error, we dispatch error
    showError(e.message);
    dispatch({type: GET_ARTICLES_LIST_ERROR, payload: e});
  }

}



const getArticlesListByCategory = (id, page = 1) => async(dispatch, getState) => {

  //core repetition, but payload is different saying we're loading
  dispatch({type: GET_ARTICLES_LIST_LOADING});

  //error handling
  try {
    const data = await axios.get(`${config.apiBaseUrl}/articles/category/${id}?page=${page}`);

    //returning data to redux
    dispatch({type: GET_ARTICLES_LIST, payload: data.data.data.articles}); //ahahahaha, data.data.data :D dat api is amazing!

    //saying it's loaded
    dispatch({type: GET_ARTICLES_LIST_LOADED});
  } catch (e) { // in case of error, we dispatch error
    showError(e.message
      ? e.message
      : e);
    dispatch({type: GET_ARTICLES_LIST_ERROR, payload: e});
  }

}

const deleteArticle = (id) => async(dispatch, getState) => {
  try {
    let token = localStorage.getItem('user') && JSON
      .parse(localStorage.getItem('user'))
      .token;

    dispatch({type: DELETE_ARTICLE_LOADING});

    await axios.delete(`${config.apiBaseUrl}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    //we update article list
    dispatch({type: DELETE_ARTICLE_LOADED});

  } catch (e) {
    showError(e.response.data.message);
    dispatch({type: DELETE_ARTICLE_ERROR, payload: e.response? e.repsponse : e});
  }
}

//--------------- REDUCER

export const articlesReducer = (state = {
  data: []
}, action) => {
  switch (action.type) {
    case GET_ARTICLES_LIST:
      return {
        ...state, //loading state should be kept
        data: action.payload
      }
    case GET_ARTICLES_LIST_LOADED:
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_ARTICLES_LIST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ARTICLES_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case DELETE_ARTICLE_LOADING:
      return {
        ...state,
        delete_loading: true
      }
    case DELETE_ARTICLE_LOADED:
      return {
        ...state,
        delete_loading: false,
        delete_error: false
      }
    case DELETE_ARTICLE_ERROR:
      return {
        ...state,
        delete_error: false,
        delete_loading: false
      }
    default:
      return state;
  }
}

//--------------- mapStateToProps and mapDispatchToProps

export const mapStateToProps = state => ({articles: state.articles.data, loading: state.articles.loading, error: state.articles.error, delete_loading: state.articles.delete_loading, delete_error: state.articles.delete_error});

export const mapDispatchToProps = dispatch => ({
  getArticlesList: (page) => {
    dispatch(getArticlesList(page))
  },
  getMyArticlesList: (page) => {
    dispatch(getMyArticlesList(page))
  },
  deleteArticle: (id) => {
    dispatch(deleteArticle(id))
  },
  getArticlesListByCategory: (id, page) => {
    dispatch(getArticlesListByCategory(id, page))
  }
});