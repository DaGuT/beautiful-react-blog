import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


//function to make data in site style
function processDate(date) {
  let stringed = new Date(Date.parse(date)).toString().split(' ');
  return `${stringed[1]} ${stringed[2]}, ${stringed[3]}`;
}


const Postinfo = ({date,author,category}) => (
  <div className="post-info">
    <div className="float-left">
      <Link className="post-date" to="#">{processDate(date)}</Link>
      &nbsp;BY&nbsp;
      <Link className="post-author" to="#">{author}</Link>
    </div>
    {category && <div className="float-right">
      <Link
        to={`${process.env.PUBLIC_URL}/articles/category/${category.id}`}
        className="post-category"
        title={`Show posts from ${category.name} category`}>{category.name}</Link>
    </div>
    }
  </div>
);

Postinfo.propTypes = {
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.object
}

export default Postinfo;