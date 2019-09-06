import React, {Component} from 'react';

import './ArticlesList.scss';

import Article from './Article';

export default class ArticlesList extends Component {
  render() {
    return (
      <div className="articles-list">
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    )
  }
}
