import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

/* just array to li transformator */
const LinkListView = ({links, location}) => (
  <Fragment>
    {links.map((link, i) => {
      //special link treatment
      const isAuth = localStorage.getItem('user');
      if ((isAuth && link.hideFor==="authUser") || (!isAuth && link.hideFor==="notAuthUser")) return;

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

const linksPropType = PropTypes.arrayOf(PropTypes.shape({
  to: PropTypes.string.isRequired, //link where it should link
  desc: PropTypes.string, //link subscription
  name: PropTypes.string.isRequired, //link name
  icon: PropTypes.string, //glyphicon icon name (after dash)
  hideFor: PropTypes.oneOf(['authUser','notAuthUser'])
}));

LinkList.propTypes = {
  links: linksPropType
};

export {linksPropType};
export default LinkList;