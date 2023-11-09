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
        <h2>{title}</h2>
        <p className="info">
          <p className="author">{author.username}</p>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
        <Link to={`/post/${_id}`}>
          Detail
        </Link>
      </div>
    </div>
  );
}
