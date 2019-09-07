import config from '../../config/config';


import {error as showError} from '../../utils/notification.js';
import axios from 'axios';

//----------------ACTIONS

export const GET_SINGLE_ARTICLE = "GET_SINGLE_ARTICLE";
export const GET_SINGLE_ARTICLE_LOADING = "GET_SINGLE_ARTICLE_LOADING";
export const GET_SINGLE_ARTICLE_LOADED = "GET_SINGLE_ARTICLE_LOADED";
export const GET_SINGLE_ARTICLE_ERROR = "GET_SINGLE_ARTICLE_ERROR";

export const getSingleArticle = (id) => async(dispatch) => {
  try {
    dispatch({type: GET_SINGLE_ARTICLE_LOADING});

    const data = await axios.get(`${config.apiBaseUrl}/article/${id}`);

    dispatch({type: GET_SINGLE_ARTICLE, payload: data.data});

    dispatch({type: GET_SINGLE_ARTICLE_LOADED})
  } catch (e) {
    showError(e.response ? e.response.message : e.message);
    dispatch({type: GET_SINGLE_ARTICLE_ERROR, payload: true})
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