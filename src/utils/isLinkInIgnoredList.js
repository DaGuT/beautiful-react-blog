//this function checks if current location is in ignored list or not

//It's written step-by step for easier understanding

function isLinkInIgnoredList(links, location) {
    //we check if we have any link. If we dont, link is surely not ignored
    //then we check every link in links with matchType specified
    return (links.length > 0 && links.some(link => {

        console.log(link.path,location.pathname);
        
        if (link.matchType==="exact") {
            return (link.path === location.pathname);
        }

        if (link.matchType==="part") {
            //if we found substring in our current location, we return that we're in ignored link
            return (location.pathname.indexOf(link.path)>=0);
        }

        //otherwise we return false (not ignored link)
        return false;

    }));
}

export default isLinkInIgnoredList;