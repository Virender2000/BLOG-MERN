import React from 'react'
import { Link } from "react-router-dom";

export const Post = (props) => {
  console.log(props);
  return (
    <div className="post" id={props.key}>
      <div className="image">
        <Link to={`/post/${props.data._id}`}>
          <img src={'http://localhost:4000/' + props.data.cover} alt="react-image" />
          </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${props.data._id}`}>
          <h2>{props.data.title}</h2>
          </Link >
          <p className="info">
            <a className="author">
              {props.data.username}
            </a>
            <time>
              {props.data.createdAt}
            </time>
          </p>
          <p className="summary">
            {props.data.summary}
          </p>
      </div>
    </div>
  )
}

export default Post;