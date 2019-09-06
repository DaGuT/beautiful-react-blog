import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Postinfo extends Component {
    render() {
        return (
            <div className="post-info">
            <div className="float-left">
              <a className="post-date" href="#">17 JUN, 2019</a>
              &nbsp;BY&nbsp;
              <a className="post-author" href="#">DaGuT</a>
            </div>
            <div className="float-right">
              <a href="#" className="post-category" title="Show posts from category">Cats</a>
              <a href="#" className="post-category" title="Show posts from category">Racoons</a>
            </div>
          </div>
        )
    }
}

Postinfo.propTypes = {

}
