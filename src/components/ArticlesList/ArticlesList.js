import React, {Component} from 'react';

import './ArticlesList.scss';
import ArticlesListView from './ArticlesList-view';

import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from './ArticlesList-redux';

class ArticlesList extends Component {

  constructor() {
    super();

    this.handleRemove = this
      .handleRemove
      .bind(this);
    this.handlePageChange = this
      .handlePageChange
      .bind(this);
    this.handleEdit = this
      .handleEdit
      .bind(this);
  }

  getArticles() {
    //if we've passed category id, then we load category list
    if (this.props.category) {
      this
        .props
        .getArticlesListByCategory(this.props.category, this.props.match.params.page);
    } else if (this.props.myArticles) {
      this
        .props
        .getMyArticlesList(this.props.match.params.page);
    } else {
      this
        .props
        .getArticlesList(this.props.match.params.page);
    }
  }

  componentDidMount() {
    this.getArticles();
  }

  //we check if we have change page, and if yes, we get new articles
  componentDidUpdate(prevProps) {
    if (!this.props.removed && (prevProps.match.params.page === this.props.match.params.page)) 
      return;
    this.getArticles();
    this.props.resetRemoved();
  }

  //function to delete post
  handleRemove(el) {
    this
      .props
      .deleteArticle(el.target.getAttribute('postid'));
  }

  handleEdit(el) {
    this
      .props
      .history
      .push(`${process.env.PUBLIC_URL}/editarticle/${el.target.getAttribute('postid')}`);
  }

  handlePageChange({selected: page}) {
    page++;
    if (page ===+ this.props.match.params.page || (this.props.match.params.page === undefined && page === 1)) 
      return;
    if (this.props.category) {
      this
        .props
        .history
        .push(`${process.env.PUBLIC_URL}/articles/category/${this.props.match.params.id}/page=${page}`);
    } else {
      this
        .props
        .history
        .push(`${process.env.PUBLIC_URL}/articles/page=${page}`)
    }
  }

  countPages() {
    return Math.ceil(this.props.articles.total / this.props.articles.per_page);
  }

  render() {
    return (<ArticlesListView
      {...this.props}
      handleRemove={this.handleRemove}
      handlePageChange={this.handlePageChange}
      handleEdit={this.handleEdit}
      page={this.props.match.params.page || 1}
      pageCount={this.countPages()}/>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);