import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author
}) {

  return (
    <div className="post">
      <figure className="post__image">
        <img src={'http://localhost:4000/'+cover} alt=""/>
      </figure>

      <div className="post__content">
        <div className="post__box">
          <h2 className="post__heading">{title.slice(0, 180)}</h2>
          <p className="post__summary">{summary.slice(0, 240)}</p>
          <Link className="post__detail" to={`/post/${_id}`}>Detail</Link>
        </div>

        <div className="post__info">
          <span>{author.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </div>
      </div>
    </div>
  );
}
