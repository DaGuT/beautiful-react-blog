import React, {Fragment} from 'react'

import Article from './Article';

import ErrorBlock from '../ErrorBlock';

import ReactPaginate from 'react-paginate';

import Loading from '../Loading';

const ArticlesListView = ({loading: isLoading, error, articles: data, handleRemove, handlePageChange, page,pageCount, handleEdit}) => {
  const articles = data.data || [];
  return (
    <div className="articles-list">
      {!isLoading && !error && <Fragment>{articles.map(article => <Article userID={article.user.id} handleEdit={handleEdit} handleRemove={handleRemove} key={article.id} article={article}/>)}
        <div className="text-center my-5">
          <ReactPaginate
            containerClassName="pagination"
            activeClassName="active"
            onPageChange={handlePageChange}
            initialPage={page-1}
            pageCount={pageCount}
            />
        </div>
      </Fragment>}
      {isLoading && <Loading />}
      {error && <ErrorBlock error="something went wrong"/>}
    </div>
  )
}

export default ArticlesListView;