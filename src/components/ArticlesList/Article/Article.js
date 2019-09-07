import React from 'react'

import {Link} from 'react-router-dom';

//subcomponents for articles
import Postinfo from '../PostInfo';

//declared on place components
const RemoveButton = ({handleRemove,postid}) => (
  <button onClick={handleRemove} className="remove-button" title="Remove this article">
    <i className="glyphicon glyphicon-remove" postid={postid}></i>
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
const Article = ({article, handleRemove, userID}) => {
  //just a content variable. It is here so that I can strip html only once and then print, slice and get its length easily
  let content = stripHtml((article.content));
  return(
  <article id={`post-${article.id}`}>
    { userID===JSON.parse(localStorage.getItem('user')).user.id && <RemoveButton handleRemove={handleRemove} postid={article.id} />}
    <h2>
      <Link to={`${process.env.PUBLIC_URL}/article/${article.id}`}>{article.title}</Link>
    </h2>
    <p className="post-short">{content.length > 300 ? content.slice(0, 300)+"..." : content}</p>
    <Postinfo category={article.category} date={article.created_at} author={article.user.name}/>
  </article>
)};

export default Article;