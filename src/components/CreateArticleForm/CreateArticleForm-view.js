import React, {Component} from 'react';
import PropTypes from 'prop-types'


import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {Redirect} from "react-router-dom";

import Loading from '../Loading';

const CreateArticleFormView = ({
  errors,
  handleInputChange,
  title,
  categories,
  handleSubmit,
  updateArticle,
  editing,
  category,
  content,
  handleEditorState,
  loading,
  redirect
}) => {
  return (
    <div >
      <main className="main-content">
        <section className="section">
          <div className="container my-container-fix">
            <div className="row">
              <div className="col-12 col-lg-12">
                <ul className="list-group">
                  {errors.map(error => <li key={error} className="list-group-item text-danger">{error}</li>)}
                </ul>
                <form
                  className="p-30 rdw-form bg-gray rounded"
                  onSubmit={editing
                  ? updateArticle
                  : handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md-12 my-5">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleInputChange}
                        name="image"/>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <select
                        name="category"
                        onChange={handleInputChange}
                        value={category || ''}
                        className="form-control form-control-lg">
                        <option value>Select category</option>
                        {categories.map(categoryInArray => (
                          <option key={categoryInArray.id} value={categoryInArray.id}>
                            {categoryInArray.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <Editor editorState={content} onEditorStateChange={handleEditorState}/>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-lg btn-primary" type="submit">{editing
                        ? 'Update Article'
                        : 'Create Article'}</button>
                    {loading && <Loading/>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* redirect if we're trying to edit other's article */redirect && <Redirect to={process.env.PUBLIC_URL + '/createarticle'}/>}
    </div>
  );
}

CreateArticleFormView.propTypes  = {
  handleInputChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
  })).isRequired,
  editing: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  category: PropTypes.number,
  updateArticle: PropTypes.func.isRequired,
  redirect: PropTypes.bool,
  loading: PropTypes.bool,
  handleEditorState: PropTypes.func
};

export default CreateArticleFormView;
