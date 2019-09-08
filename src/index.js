import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './global-redux';

import config from "./config/config";

//components
import Sidemenu from './components/Sidemenu';
import StaticBg from './components/StaticBg';
import Auth from './components/Auth'; //redirect if user is not authenticated
import RedirectIfAuth from './components/RedirectIfAuth'; //redirect if user is authenticated
import ErrorBlock from './components/ErrorBlock'; //404 and something went wrong errors are stored inside

//pages
import Index from './routes/Index-route.js';
import Category from './routes/Articles/Category';
import Article from './routes/Article/';
import CreateArticle from './routes/CreateArticle';
import EditArticle from './routes/EditArticle';
import MyArticles from './routes/MyArticles';
import LoginRegister from './routes/LoginRegister/LoginRegister';

//background image
import niceBgImage from './assets/imgs/cityBg.jpg';

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  {/* Sidemenu, links can be edited in config */}
    <Route
      component={(props) => <Sidemenu
      {...props}
      links={config.sidemenuLinks}
      ignoredLinks={[{
        path: [process.env.PUBLIC_URL +'/register', process.env.PUBLIC_URL +'/login']
      }
    ]}/>}/> {/* fancy sidemenu */}
    <Route
      component={(props) => <StaticBg
      {...props}
      bg={niceBgImage}
      text={config.staticBgText}
      ignoredLinks={[{
        path: [process.env.PUBLIC_URL +'/createArticle', process.env.PUBLIC_URL +'/article/:id', process.env.PUBLIC_URL +'/register', process.env.PUBLIC_URL +'/login',process.env.PUBLIC_URL + "/editarticle/:id"]
      }
    ]}/>}/> {/* component to show "site info" on the left side*/}

    {/* we just logout upon link click */}
    <Route
      exact
      path={[process.env.PUBLIC_URL +'/logout']}
      render={() => {
      if (localStorage.getItem('user')) 
        localStorage.removeItem('user');
      return (<Redirect to={process.env.PUBLIC_URL +"/"}/>);
    }}/>
    {/* routes above will allways be displayed, except for ignoreLinks cases, described in them */}

    {/* Switch to handle 404 errors */}
    <Switch>
      {/* Login and register are made within 1 component */}
      <RedirectIfAuth exact path={[process.env.PUBLIC_URL +'/login', process.env.PUBLIC_URL +'/register']} component={LoginRegister}/>
      {/* single article is displayed with this route */}
      <Route
        path={process.env.PUBLIC_URL + "/article/:id"}
        component={(props) => <Article {...props}/>}/> {/* single article page */}

      {/* index page (simply list of articles in page 1) */}
      <Route exact path={[process.env.PUBLIC_URL + "/"]} component={Index}/>
      {/* this route is used to show articles at page :page */}
      <Route
        exact
        path={[
        process.env.PUBLIC_URL + "/articles/page=:page",
        process.env.PUBLIC_URL + "/articles"
      ]}
        component={Index}/>
      {/* filtering articles by category, it's below articles at page because I have EXACT, so I dont need to worry switch will block filter */}
      <Route
        exact
        path={[
        process.env.PUBLIC_URL + "/articles/category/:id",
        process.env.PUBLIC_URL + "/articles/category/:id/page=:page"
      ]}
        component={Category}/>
      
      {/* Article creation and editing */}
      <Auth
        exact path={[process.env.PUBLIC_URL + "/createarticle"]}
        component={CreateArticle}/>
      <Auth
        exact path={[process.env.PUBLIC_URL + "/editarticle/:id"]}
        component={EditArticle}/>

      {/* list of articles that logged in used have */}
      <Auth exact path={process.env.PUBLIC_URL + '/myarticles'} component={MyArticles}/>

      {/* lovely 404 */}
      <Route component={(props) => <ErrorBlock error="404"/>}/>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));

serviceWorker.register();
