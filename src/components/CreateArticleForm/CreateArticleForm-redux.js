import config from '../../config/config';

import {error as showError, success} from '../../utils/notification.js';

import axios from 'axios';

import {EditorState, convertFromHTML, ContentState} from 'draft-js';

import formatErrors from '../../utils/formatErrors.js';

//default editor state
const defaultState = {
  title: '',
  image: null,
  content: EditorState.createEmpty(),
  category: null,
  errors: [],
  categories: [],
  editing: false,
  article: null,
  redirect: false
};

//--------------- ACTIONS

const GET_ARTICLE_CATEGORIES = "GET_ARTICLE_CATEGORIES";
const GET_ARTICLE_CATEGORIES_LOADING = "GET_ARTICLE_CATEGORIES_LOADING";
const GET_ARTICLE_CATEGORIES_LOADED = "GET_ARTICLE_CATEGORIES_LOADED";
const GET_ARTICLE_CATEGORIES_ERROR = "GET_ARTICLE_CATEGORIES_ERROR";

const CREATE_ARTICLE = "CREATE_ARTICLE";
const CREATE_ARTICLE_LOADING = "CREATE_ARTICLE_LOADING";
const CREATE_ARTICLE_LOADED = "CREATE_ARTICLE_LOADED";
const CREATE_ARTICLE_ERROR = "CREATE_ARTICLE_ERROR";

const UPDATE_EDITOR_STATE = "UPDATE_EDITOR_STATE";

const CHANGE_INPUT = "CHANGE_INPUT";

const DROP_STATE = "DROP_STATE";
const DROP_EDITING_STATE = "DROP_EDITING_STATE";//it's easeir to have just 1, than universal, as I need only 1

const GET_ARTICLE = "GET_ARTICLE";
const GET_ARTICLE_LOADING = "GET_ARTICLE_LOADING";
const GET_ARTICLE_LOADED = "GET_SARTICLE_LOADED";
const GET_ARTICLE_ERROR = "GET_ARTICLE_ERROR";


const uploadToCloudinary = async(image) => {
  const form = new FormData();
  form.append('file', image);
  form.append('upload_preset', 'g5ziunzg');

  let response;
  try {
    response = await axios.post('https://api.cloudinary.com/v1_1/bahdcoder/image/upload', form);
  } catch (e) {
    showError('Error uploading image');
  }
  return response.data;
}

const getArticleCategories = () => async(dispatch, getstate) => {
  try {

    dispatch({type: GET_ARTICLE_CATEGORIES_LOADING});

    const response = await axios.get(`${config.apiBaseUrl}/categories`);
    const data = response.data.categories;

    dispatch({type: GET_ARTICLE_CATEGORIES, payload: data});

    dispatch({type: GET_ARTICLE_CATEGORIES_LOADED});
  } catch (e) {
    showError("Could not load categories!");
    dispatch({type: GET_ARTICLE_CATEGORIES_ERROR});
  }

}

//this function is also responsible for news update
const createArticle = (data, postID, type = "create") => async(dispatch, getState) => {
  
  try {

    dispatch({type: CREATE_ARTICLE_LOADING});

    const token = localStorage.getItem('user') && JSON
      .parse(localStorage.getItem('user'))
      .token;

    const image = await uploadToCloudinary(data.image);

    //placeholder for function that will be executed put - update post - create
    let func;
    if (type === "create") 
      func = axios.post;
    if (type === "update") 
      func = axios.put;
    
    const response = await func(`${config.apiBaseUrl}/articles/`+(type==="update" ? postID : ''), { //we also have to add postID in case of updating
      title: data.title,
      content: data.content,
      category_id: data.category,
      imageUrl: image.secure_url
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({type: CREATE_ARTICLE, payload: response});

    dispatch({type: CREATE_ARTICLE_LOADED});

    success('Success!');

    dispatch({type:DROP_STATE});
  } catch (e) {
    //nice popup
    showError("Error while creating topic");

    //formated errors is an object, we convert it to array
    const formattedErrors = formatErrors(e);
    let errors = [];

    for (let key in formattedErrors) 
      errors.push(formattedErrors[key]);
    
    dispatch({
      type: CREATE_ARTICLE_ERROR,
      payload: (errors || e.message || [])
    });
  }
}

export const getArticle = (id) => async(dispatch) => {
  try {
    dispatch({type: GET_ARTICLE_LOADING});

    const data = await axios.get(`${config.apiBaseUrl}/article/${id}`);

    dispatch({type: GET_ARTICLE, payload: data.data});

    dispatch({type: GET_ARTICLE_LOADED})
  } catch (e) {
    showError(e.response ? e.response.message : e.message);
    dispatch({type: GET_ARTICLE_ERROR, payload: true})
  }
}

const dropState = () => async(dispatch, getState) => {

  dispatch({type: DROP_STATE});

}
const dropEditingState = () => async(dispatch, getState) => {
  dispatch({type: DROP_EDITING_STATE});
}

const updateEditorState = (newState) => async(dispatch, getState) => {
  dispatch({type: UPDATE_EDITOR_STATE, payload: newState})
}

const changeInput = (event) => async(dispatch, getState) => {
  dispatch({type: CHANGE_INPUT, payload: event});
}

//--------------- REDUCER

export const newArticleReducer = (state = {
  ...defaultState
}, action) => {
  switch (action.type) {
    case GET_ARTICLE_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_ARTICLE_CATEGORIES_LOADED:
      return {
        ...state,
        loading: false,
        errors: []
      }
    case GET_ARTICLE_CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
        errors: []
      }
    case GET_ARTICLE_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        errors: ['Articles could not be fetched']
      }
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        content: action.payload
      }
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.type === 'file'
          ? action.payload.target.files[0]
          : action.payload.target.value
      }
    case CREATE_ARTICLE:
      return {
        ...state,
        article: action.payload
      }
    case CREATE_ARTICLE_LOADING:
      return {
        ...state,
        loading: true,
        errors: []
      }
    case CREATE_ARTICLE_LOADED:
      return {
        ...state,
        loading: false,
        errors: []
      }
    case CREATE_ARTICLE_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false
      }
    case GET_ARTICLE:
      // we should not let give false hopes when editing some1 else's news, so we
      // prevent loading such news
      if (action.payload.data.user_id !== (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user.id)) {
        showError("You can not edit other's news");

        return {
          ...state,
          redirect: true
        }
      } else {
        //here we convert our html text into format that is readable by editor
        const blocksFromHTML = convertFromHTML(action.payload.data.content);
        const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);

        return {
          ...state,
          article: action.payload,
          title: action.payload.data.title,
          category: action.payload.data.category_id,
          content: EditorState.createWithContent(content),
          editing: true
        }
      }
    case GET_ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ARTICLE_LOADED:
      return {
        ...state,
        loading: false,
        error: false
      }
    case GET_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DROP_STATE:
      return {
        ...state,
        ...defaultState
      }
    case DROP_EDITING_STATE:
      return {
        ...state,
        editing:false
      }
    default:
      return state;
  }
}

//--------------- mapStateToProps and mapDispatchToProps

export const mapStateToProps = state => ({
  title: state.newArticle.title,
  image: state.newArticle.image,
  content: state.newArticle.content,
  category: state.newArticle.category,
  categories: state.newArticle.categories,
  article: state.newArticle.article,
  editing: state.newArticle.editing,
  loading: state.newArticle.loading,
  errors: state.newArticle.errors,
  redirect: state.newArticle.redirect
});

export const mapDispatchToProps = dispatch => ({
  getArticleCategories: () => {
    dispatch(getArticleCategories());
  },
  createArticle: (data) => {
    dispatch(createArticle(data));
  },
  updateArticle: (data, postID) => {
    dispatch(createArticle(data, postID, "update"));
  },
  updateEditorState: (newState) => {
    dispatch(updateEditorState(newState));
  },
  changeInput: (event) => {
    dispatch(changeInput(event));
  },
  getArticle: (id) => {
    dispatch(getArticle(id));
  },
  dropState: () => {
    dispatch(dropState());
  },
  dropEditingState: () => {
    dispatch(dropEditingState());
  }
});