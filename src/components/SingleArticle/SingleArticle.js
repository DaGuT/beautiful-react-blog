import React, { Component } from 'react';

import StaticBg from '../StaticBg';
import SingleArticleView from './SingleArticle-view';
import './SingleArticle.scss';

export default class SingleArticle extends Component {
    render() {
        return (
            <div className="single-article">
                <StaticBg {...this.props} bg="https://picsum.photos/600/1000" text={{bigText:"This is article"}} showOnMobile={true} />
                <SingleArticleView />
            </div>
        )
    }
}
