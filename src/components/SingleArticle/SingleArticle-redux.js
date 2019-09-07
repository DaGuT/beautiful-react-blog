import config from '../../config/config';

import {error as showError} from '../../utils/notification.js';

//----------------ACTIONS

const GET_SINGLE_ARTICLE = "GET_SINGLE_ARTICLE";
const GET_SINGLE_ARTICLE_LOADING = "GET_SINGLE_ARTICLE_LOADING";
const GET_SINGLE_ARTICLE_LOADED = "GET_SINGLE_ARTICLE_LOADED";
const GET_SINGLE_ARTICLE_ERROR = "GET_SINGLE_ARTICLE_ERROR";

const getSingleArticle = (id) => async(dispatch) => {
  try {
    dispatch({type: GET_SINGLE_ARTICLE_LOADING});

    const response = await fetch(`${config.apiBaseUrl}/article/${id}`);
    const data = await response.json();

    if (data.status !== "success") throw(new Error(data.message));

    dispatch({type: GET_SINGLE_ARTICLE, payload: data});

    dispatch({type: GET_SINGLE_ARTICLE_LOADED})
  } catch (e) {
    showError(e.message ? e.message : e);
    dispatch({type: GET_SINGLE_ARTICLE_ERROR, payload: e.message})
  }
}

//----------------REDUCER

export const singleArticleReducer = (state = {loading:true}, action) => {
  switch (action.type) {
    case GET_SINGLE_ARTICLE:
      return {
        ...state,
        data: action.payload
      }
    case GET_SINGLE_ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_SINGLE_ARTICLE_LOADED:
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_SINGLE_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

//---------------- mapStateToProps and mapDispatchToProps

export const mapStateToProps = state => ({data: state.article.data, loading: state.article.loading, error: state.article.error});

export const mapDispatchToProps = dispatch => ({
  getSingleArticle: (id) => dispatch(getSingleArticle(id))
});