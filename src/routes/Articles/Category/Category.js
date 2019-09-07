import React from 'react';

//list of articles
import ArticlesList from '../../../components/ArticlesList/ArticlesList';

const Index = (props) => {
  return (
      <div>
        <ArticlesList {...props} category={props.match.params.id}/>
        </div>
  );
}

export default Index;