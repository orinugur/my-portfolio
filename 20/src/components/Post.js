import React from 'react';
import '../styles/Post.css';

function Post({ post }) {
  return (
    <article className="post">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-meta">
        <span>작성자: {post.author}</span>
        <span> | </span>
        <span>{post.date}</span>
      </div>
      <p className="post-content">{post.content}</p>
    </article>
  );
}

export default Post;