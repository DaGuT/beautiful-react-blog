import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './global-redux';

import config from "./config/config";

//components
import Sidemenu from './components/Sidemenu';
import StaticBg from './components/StaticBg';
import ErrorBlock from './components/ErrorBlock';

//pages
import Index from './routes/Index-route.js';
import Category from './routes/Articles/Category';
import Article from './routes/Article/';
import CreateArticle from './routes/CreateArticle';

//background image
import niceBgImage from './assets/imgs/cityBg.jpg';
import LoginRegister from './routes/LoginRegister/LoginRegister';

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Route
      component={(props) => <Sidemenu
      {...props}
      links={config.sidemenuLinks}
      ignoredLinks={[{
        path: ['/register', '/login']
      }
    ]}/>}/> {/* fancy sidemenu */}
    <Route
      component={(props) => <StaticBg
      {...props}
      bg={niceBgImage}
      text={config.staticBgText}
      ignoredLinks={[{
        path: ['/createArticle', '/article/:id', '/register', '/login']
      }
    ]}/>}/> {/* component to show "site info" on the left side*/}

    <Switch>
      <Route exact path={['/login','/register']} component={LoginRegister} />
      <Route
        path={process.env.PUBLIC_URL + "/article/:id"}
        component={(props) => <Article {...props}/>}/> {/* single article page */}
      <Route exact path={[process.env.PUBLIC_URL + "/"]} component={Index}/> {/* index page with articles list */}
      <Route
        exact
        path={[
        process.env.PUBLIC_URL + "/articles/page=:page",
        process.env.PUBLIC_URL + "/articles"
      ]}
        component={Index}/>
      <Route
        exact
        path={[
        process.env.PUBLIC_URL + "/articles/category/:id",
        process.env.PUBLIC_URL + "/articles/category/:id/page=:page"
      ]}
        component={Category}/> {/* index page with articles list */}
      <Route
        path={process.env.PUBLIC_URL + "/createarticle"}
        component={CreateArticle}/>
      <Route component={(props) => <ErrorBlock error="404"/>}/>
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));

serviceWorker.register();
