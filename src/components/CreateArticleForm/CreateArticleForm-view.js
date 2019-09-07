import React, {Component} from 'react';

import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Loading from '../Loading';

const CreateArticleFormView = ({
  errors,
  handleInputChange,
  title,
  categories,
  handleSubmit,
  updateArticle,
  editing ,
  category,
  content,
  handleEditorState,
  loading
}) => {
  return (
    <div >
      <main className="main-content">
        <section className="section">
          <div className="container">
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
                        {loading && <Loading />}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CreateArticleFormView;
