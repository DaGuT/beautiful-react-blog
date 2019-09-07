import React, { Component } from 'react'

import loadingSvg from '../../assets/imgs/loading.svg'

import './Loading.scss'

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-svg">
                <img src={loadingSvg} alt="loading" />
            </div>
        )
    }
}
