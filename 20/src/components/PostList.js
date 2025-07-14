import React from 'react';
import Post from './Post';
import '../styles/PostList.css';

function PostList({ posts }) {
  return (
    <section className="post-list">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}

export default PostList;