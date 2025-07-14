import React from 'react';

function CommentCell({ comment }) {
  return (
    <div className="comment-cell">
      <div className="comment-author">{comment.authorName}</div>
      <div className="comment-text">{comment.text}</div>
      <div className="comment-date">{comment.publishedTimeText}</div>
      <hr />
    </div>
  );
}

export default CommentCell;