import React from 'react';
import './Description.scss';


const Description = ({text}) => {
    return (
        <div className="static-bg-description">
            {/* Conditional rendering here. If we dont have some property, then we do not display it */}
            {text.bigText && <h1 className="big-description-text">{text.bigText}</h1>}
            {text.smallText && <p className="small-description-text">{text.smallText}</p>}
        </div>
    );
}

export default Description;