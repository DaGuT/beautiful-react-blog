import React, {Component} from 'react'

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
      this.props.getSingleArticle(this.props.editArticleID);
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateArticleForm)