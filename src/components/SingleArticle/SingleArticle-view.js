import React from 'react';
import renderHtml from 'react-render-html';


const SingleArticleView = ({data}) => {
  return (
    <div className="article-text">
      {renderHtml(data.data.content)}
    </div>
  );
}

export default SingleArticleView;