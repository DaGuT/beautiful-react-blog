import React, { Component } from 'react'

import ArticlesList from '../../components/ArticlesList';

export default class Articles extends Component {
    render() {
        return (
            <div>
                <ArticlesList {...this.props} myArticles={true} />
            </div>
        )
    }
}