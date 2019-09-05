import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './StaticBg.scss';

import isLinkInIgnoredList from '../../utils/isLinkInIgnoredList';

import Description from './Description';

// I could do this without this component, but I'd like to sepaarte it as I want
// to keep code clean in other places

const StaticBg = ({
  bg,
  style,
  location,
  ignoredLinks,
  text,
  showOnMobile
}) => {

  // I really dont like that code repetition as with sidemenu, but let's keep it.
  // Potential TODO: rewrite with a shared (propotype or whatever it's called)
  // class with the same preparation, but different render as a prop. This way we
  // will solve that code repetition calculation if bg should be drawn
  let isBgDrawn = !isLinkInIgnoredList(ignoredLinks, location);

  // same as sidebar, but different class if we draw that block, then we need to
  // add margin to main content or remove it, if we do not draw
  if (isBgDrawn) {
    document
      .getElementById('root')
      .classList
      .add('with-static-bg');
  } else {
    document
      .getElementById('root')
      .classList
      .remove('with-static-bg')
  }

  return (
    <Fragment>
      {/* we only draw bg if we are not in ingnored link*/
      isBgDrawn && <div
        className={`static-bg ${showOnMobile
        ? 'static-bg-mobile'
        : ''}`}
        style={{
        backgroundImage: `url(${bg})`,
        ...style || ''
      }}><Description text={text}/></div>}
    </Fragment>
  );
}

StaticBg.propTypes = {
  bg: PropTypes.string.isRequired,
  ignoredLinks: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string, //link path
    matchType: PropTypes.oneOf(['exact', 'part'])
  })), //each element is path where sidemenu should not be displayed
  text: PropTypes.shape({ //text to be displayed on that static bg
    bigText: PropTypes.string,
    smallText: PropTypes.string
  }),
  showOnMobile: PropTypes.bool
};

StaticBg.defaultProps = {
  showOnMobile: false,
  text: {},
  ignoredLinks: []
}

export default StaticBg;