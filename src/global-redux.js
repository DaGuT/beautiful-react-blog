//this is the place of all the reducers in one place store part

//--------------STORE IMPORTS

//async redux requets
import thunk from 'redux-thunk';
//for store and middleware (redux devtool and thunk)
import {createStore, compose, applyMiddleware} from 'redux';

//reducer imports

//to combine all reducers in 1
import {combineReducers} from 'redux'
//to control form
import {reducer as formReducer} from 'redux-form'
//ArticlesList reducer
import {articlesReducer} from './components/ArticlesList/ArticlesList-redux';
import {singleArticleReducer} from './components/SingleArticle/SingleArticle-redux';




//----------------- ACTUAL CODE (reducer and store initialisation)

// to combine reduxdevtool + thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//reducers combination
const reducer = combineReducers({
  form: formReducer,
  articles: articlesReducer,
  article: singleArticleReducer
});

//store creation
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


//and exports
export default store;
export {reducer};