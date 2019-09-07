import React, {Component, Fragment} from 'react';

import StaticBg from '../StaticBg';
import SingleArticleView from './SingleArticle-view';
import './SingleArticle.scss';

import ErrorBlock from '../ErrorBlock';

import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from './SingleArticle-redux';

import Loading from '../Loading';

class SingleArticle extends Component {

  componentDidMount() {
    let {getSingleArticle, match} = this.props;
    getSingleArticle(match.params.id);
  }

  render() {
    let {loading, error, data} = this.props;
    return (
      <div className="single-article">

        {!loading && !error && <Fragment>
          <StaticBg
            {...this.props}
            bg="https://picsum.photos/600/1000"
            text={{
            bigText: data.data.title
          }}
            showOnMobile={true}/>
          <SingleArticleView data={data}/>
        </Fragment>
} 
    {loading && <Loading />}
    {error && <ErrorBlock error="something went wrong"/>}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleArticle);