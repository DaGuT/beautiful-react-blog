import React, { Component } from 'react'

import CreateArticleForm from '../../components/CreateArticleForm';

export default class CreateArticle extends Component {
    render() {
        return (
            <div>
                <CreateArticleForm {...this.props} editArticleID={this.props.match.params.id} />
            </div>
        )
    }
}
