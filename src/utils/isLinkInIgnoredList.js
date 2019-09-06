//this function checks if current location is in ignored list or not

import { matchPath } from "react-router";
import PropTypes from 'prop-types';


function isLinkInIgnoredList(links, location) {
    //we check if we have any link. If we dont, link is surely not ignored
    //then we check every link
    return (links.length > 0 && links.some(link => {

        return matchPath(location.pathname,link);

    }));
}

const ignoredListPropType = {
    ignoredLinks: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.oneOfType([PropTypes.string,PropTypes.arrayOf(PropTypes.string)]).isRequired, //can be applied as with slug etc from router
        exact: PropTypes.bool,//default - false
        strict: PropTypes.bool//default - false
      }))
}


export default isLinkInIgnoredList;
export {ignoredListPropType};