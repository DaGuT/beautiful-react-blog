import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'; 

import config from "./config/config";

//components
import Sidemenu from './components/Sidemenu';
import StaticBg from './components/StaticBg';

//pages
import Index from './routes/Index-route.js';
import Article from './routes/Article/';
import CreateArticle from './routes/CreateArticle';

//background image
import niceBgImage from './assets/imgs/cityBg.jpg';


ReactDOM.render(
<BrowserRouter> 
    <Route component={(props) => <Sidemenu {...props} links={config.sidemenuLinks}/>} /> {/* fancy sidemenu */}
    <Route component={(props) => <StaticBg {...props} bg={niceBgImage} text={config.staticBgText} ignoredLinks={[{path:['/createArticle','/article/:slug']}]} />} /> {/* component to show "site info" on the left side*/}
    <Route path={process.env.PUBLIC_URL +"/article/:slug"} component={(props) => <Article {...props} />} /> {/* single article page */}
    <Route exact path={process.env.PUBLIC_URL +"/"} component={Index} /> {/* index page with articles list */}
    <Route path={process.env.PUBLIC_URL +"/createarticle"} component={CreateArticle} />
</BrowserRouter>
, document.getElementById('root'));

serviceWorker.register();
