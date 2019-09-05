import React, {Component} from 'react';

import './ArticlesList.scss';

export default class ArticlesList extends Component {
  render() {
    return (
      <div className="articles-list">
        <article id="post-21">
          <button className="remove-button" title="Remove this article">
            <i className="glyphicon glyphicon-remove"></i>
          </button>
          <h2>
            <a href="#">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</a>
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
        </article>
        <article id="post-22">
        <button className="remove-button" title="Remove this article">
            <i className="glyphicon glyphicon-remove"></i>
          </button>
          <h2>
            <a href="#">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</a>
          </h2>
          <p>{("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor" +
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
          <div className="post-info">
            <div className="float-left">
              <a className="post-date" href="#">17 JUN, 2019</a>
              &nbsp;BY&nbsp;
              <a href="post-author">DaGuT</a>
            </div>
            <div className="float-right">
              <a href="#" className="post-category">Cats</a>
              <a href="#" className="post-category">Racoons</a>
            </div>
          </div>
        </article>
        <article id="post-23">
          <h2>
            <a href="#">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</a>
          </h2>
          <p>{("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor" +
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
          <div className="post-info">
            <div className="float-left">
              <a className="post-date" href="#">17 JUN 2019</a>
              &nbsp;BY&nbsp;
              <a href="post-author">DaGuT</a>
            </div>
            <div className="float-right">
              <a href="#" className="post-category">Cats</a>
              <a href="#" className="post-category">Racoons</a>
            </div>
          </div>
        </article>
        <article id="post-24">
          <h2>
            <a href="#">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</a>
          </h2>
          <p>{("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolor" +
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
          <div className="post-info">
            <a className="post-date" href="#">17 JUN 2019</a>
            &nbsp;BY&nbsp;
            <a href="post-author">DaGuT</a>
          </div>
        </article>
      </div>
    )
  }
}
