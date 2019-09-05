import React from 'react'

import SingleArticle from '../../components/SingleArticle';

const Article = (props) => {
  return (
    <div>
      <SingleArticle {...props}/>
    </div>
  );
};

export default Article;
