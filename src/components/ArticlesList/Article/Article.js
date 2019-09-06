import React, { Component } from 'react'

import {Link} from 'react-router-dom';


//subcomponents for articles
import Postinfo from '../PostInfo';

//declared on place components
const RemoveButton = () => (
  <button className="remove-button" title="Remove this article">
    <i className="glyphicon glyphicon-remove"></i>
  </button>
);

export default class Article extends Component {
    render() {
        return (
            <article id="post-21">
            <RemoveButton/>
            <h2>
              <Link to={process.env.PUBLIC_URL + "/article/123"}>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</Link>
            </h2>
            <p className="post-short">{("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor" +
                  "emque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis" +
                  " et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptat" +
                  "em quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni " +
                  "dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui" +
                  " dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non nu" +
                  "mquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat volu" +
                  "ptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis sus" +
                  "cipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum " +
                  "iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequat" +
                  "ur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?").slice(0, 300) + "..."}</p>
            <Postinfo />
          </article>
        )
    }
}
