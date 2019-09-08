import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

/* just array to li transformator */
const LinkListView = ({links, location}) => (
  <Fragment>
    {links.map((link, i) => {
      //special link treatment
      if (link.to===`/login` && localStorage.getItem('user')) return;
      if (link.to===`/logout` && !localStorage.getItem('user')) return;
      if (link.to===`/myarticles` && !localStorage.getItem('user')) return;
      if (link.to===`/createarticle` && !localStorage.getItem('user')) return;

      return <li
        key={i}
        className={location.pathname === link.to
        ? 'active'
        : ''}>
        <Link to={process.env.PUBLIC_URL + link.to}><span
          style={{
        fontSize: '16px'
      }}
          className={`pull-left hidden-xs showopacity ${link.icon
        ? 'glyphicon glyphicon-' + link.icon
        : ''}`}/>{link.name} {link.desc && <span className="menu-item-description">{link.desc}</span>}
        </Link>
      </li>
    })
}
  </Fragment>
);

/* component itself */
const LinkList = ({links, location}) => {
  return (
    <ul className="nav navbar-nav">
      <LinkListView links={links} location={location}/>
    </ul >
  );
}

export default LinkList;