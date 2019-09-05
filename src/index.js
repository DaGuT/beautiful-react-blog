import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'; 

import config from "./config/config";

//components
import Sidemenu from './components/Sidemenu';
import StaticBg from './components/StaticBg';

//pages
import Index from './routes/index.js';

//background image
import niceBgImage from './assets/imgs/cityBg.jpg';


ReactDOM.render(
<BrowserRouter> 
    <Route component={(props) => <Sidemenu {...props} links={config.sidemenuLinks} ignoredLinks={['/testLink']}/>} />
    <Route component={(props) => <StaticBg {...props} bg={niceBgImage} text={config.staticBgText} ignoredLinks={['/testLink2']} />} /> {/* technically, you can spawn mulpiple StaticBg for different pages with different bg and texts, but in my case I will stay with 1 only atm */}
    <Route exact path="/" component={Index} />
</BrowserRouter>
, document.getElementById('root'));

serviceWorker.register();
