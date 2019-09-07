import React, {Fragment} from 'react'

import {Link} from 'react-router-dom';

//subcomponents for articles
import Postinfo from '../PostInfo';

//declared on place components
const RemoveButton = ({handleRemove,postid}) => (
  <button onClick={handleRemove} className="my-action-button remove-button" title="Remove this article">
    <i className="glyphicon glyphicon-remove" postid={postid}></i>
  </button>
);
const EditButton = ({handleEdit,postid}) => (
  <button onClick={handleEdit} className="my-action-button edit-button" title="Edit this article">
    <i className="glyphicon glyphicon-edit" postid={postid}></i>
  </button>
);

//strip html tags for preview
function stripHtml(html)
{
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

//and fnially, component
const Article = ({article, handleRemove, userID, handleEdit}) => {
  //just a content variable. It is here so that I can strip html only once and then print, slice and get its length easily
  let content = stripHtml((article.content));
  return(
  <article id={`post-${article.id}`}>
    { userID===(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user.id) &&  <Fragment><EditButton handleEdit={handleEdit} postid={article.id} /><RemoveButton handleRemove={handleRemove} postid={article.id} /></Fragment>}
    <h2>
      <Link to={`${process.env.PUBLIC_URL}/article/${article.id}`}>{article.title}</Link>
    </h2>
    <p className="post-short">{content.length > 300 ? content.slice(0, 300)+"..." : content}</p>
    <Postinfo category={article.category} date={article.created_at} author={article.user.name}/>
  </article>
)};

export default Article;