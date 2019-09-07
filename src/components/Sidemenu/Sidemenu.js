import '../../utils/jquery-global';
import 'bootstrap3/dist/css/bootstrap.min.css';
import 'bootstrap3/dist/js/bootstrap.min.js';

import './Sidemenu.scss';

import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import isLinkInIgnoredList, {ignoredListPropType} from '../../utils/isLinkInIgnoredList';

import LinkList from './LinkList';

//just a button for bootstrap menu toggling
const ToggleButton = () => {
  return (
    <button
      type="button"
      className="navbar-toggle"
      data-toggle="collapse"
      data-target="#bs-sidebar-navbar-collapse-1">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
      <span className="icon-bar"/>
    </button>
  );
}

const Sidemenu = ({location, links, ignoredLinks}) => {
  // settings default ingoredLinks to be emtpy array I dont want to do it via
  // deafultprops, this is way faster to do here with just 1 line
  ignoredLinks = ignoredLinks || [];

  //calculation if sidebar should be drawn
  let isSidebarDrawn = !isLinkInIgnoredList(ignoredLinks, location);

  useEffect(() => {
    if (!isSidebarDrawn) 
      document.getElementById('root').classList.remove('main');
    }
  );

  if (isSidebarDrawn) {
    document
      .getElementById('root')
      .classList
      .add('main');
  } else {
    document
      .getElementById('root')
      .classList
      .remove('main')
  }

  return (
    <Fragment>
      {/*we dont show navbar if we're in one of the ignored links*/
      isSidebarDrawn && <nav
        className="navbar navbar-inverse sidebar hide-scrollbars"
        role="navigation">
        <div className="collapsed-overlay"></div>
        <div className="container-fluid">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <ToggleButton/>
            <Link className="navbar-brand" to={process.env.PUBLIC_URL + "/"}>Happy DaGuT corp</Link>
            <p className="navbar-brand-desc">This is lovely blog written with React</p>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
            <LinkList {...{location,links}}/>
          </div>
        </div>
        <div className="navbar-footer">
          <p>
            <Link to="https://dagut.ru" target="_blank">©DaGuT 2019</Link>
          </p>
        </div>
      </nav>
    } 
    </Fragment>
  );
}

Sidemenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string.isRequired, //link where it should link
    desc: PropTypes.string, //link subscription
    name: PropTypes.string.isRequired, //link name
    icon: PropTypes.string //glyphicon icon name (after dash)
  })),
  ...ignoredListPropType //each element is path where sidemenu should not be displayed
}

export default Sidemenu;
