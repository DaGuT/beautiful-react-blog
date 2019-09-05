import React from 'react';

//list of articles
import ArticlesList from '../components/ArticlesList/ArticlesList';

const Index = (props) => {
  return (
      <div>
        <ArticlesList {...props}/>
        </div>
  );
}

export default Index;