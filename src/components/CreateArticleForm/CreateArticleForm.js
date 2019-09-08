import React, {Component} from 'react'
import PropTypes from 'prop-types'


import './CreateArticleForm.scss'
import CreateArticleFormView from './CreateArticleForm-view.js'
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from './CreateArticleForm-redux';

import draftToHtml from 'draftjs-to-html';
import {convertToRaw} from 'draft-js';

import {error as showError} from '../../utils/notification.js';

class CreateArticleForm extends Component {

  constructor() {
    super();

    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleInputChange = this
      .handleInputChange
      .bind(this);
    this.handleEditorState = this
      .handleEditorState
      .bind(this);
    this.updateArticle = this
      .updateArticle
      .bind(this);
  }

  componentDidMount() {
    this
      .props
      .getArticleCategories();

    if (this.props.editArticleID) {
      this.props.getArticle(this.props.editArticleID);
    } else {
      this.props.dropState();
    }
  }

  updateArticle(event) {

    event.preventDefault();

    this.props.updateArticle({
      title: this.props.title,
      content: draftToHtml(convertToRaw(this.props.content.getCurrentContent())),
      category: this.props.category,
      image: this.props.image
    },this.props.editArticleID);
  }

  handleInputChange(event) {
    this
      .props
      .changeInput(event);
  }

  handleEditorState(editorState) {
    this.props.updateEditorState(editorState)
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.props.image) {showError('Image is required'); return;}

    this
      .props
      .createArticle({
        title: this.props.title,
        content: draftToHtml(convertToRaw(this.props.content.getCurrentContent())),
        category: this.props.category,
        image: this.props.image
      });

  }
  render() {
    return (<CreateArticleFormView
      {...this.props}
      handleInputChange={this.handleInputChange}
      handleSubmit={this.handleSubmit}
      updateArticle={this.updateArticle}
      handleEditorState={this.handleEditorState}
      content={this.props.content}/>)
  }
}

CreateArticleForm.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  updateArticle: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }).isRequired,
  }).isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  }))
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticleForm)