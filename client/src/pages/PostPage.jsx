import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';

export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1 className="post-page__heading">{postInfo.title}</h1>

      <div className="post-page__box-info">
        <time className="post-page__time">{formatISO9075(new Date(postInfo.createdAt))}</time>
        <span className="post-page__author">by @{postInfo.author.username}</span>
      </div>

      {userInfo.id === postInfo.author._id && (
        <div className="post-page__edit">
          <Link className="post-page__edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>Edit post</span>
          </Link>
        </div>
      )}

      <div className="post-page__image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
      </div>
      <p className="post-page__summary">{postInfo.summary}</p>

      <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
}
