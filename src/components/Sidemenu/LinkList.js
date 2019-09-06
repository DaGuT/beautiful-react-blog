import React from 'react';
import {Link} from 'react-router-dom';

const LinkList = ({links,location}) => {
  return (
    <ul className="nav navbar-nav">
      {links.map((link, i) => <li
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
      </li>)}
    </ul>
  );
}

export default LinkList;