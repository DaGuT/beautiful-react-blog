import React from 'react';

import img404 from '../../assets/imgs/404.png';
import somethingWentWrong from '../../assets/imgs/somethingWentWrong.png';

import "./ErrorBlock.scss";

const ErrorBlock = ({error}) => (
    
    <div className="not-found">
        {error==="404" && <img src={img404} alt="page not found" />}
        {error==="something went wrong" && <img src={somethingWentWrong} alt="something went wrong" />}
    </div>
);

export default ErrorBlock;