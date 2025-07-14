import React, { useEffect, useState } from 'react';
import CommentCell from './CommentCell';
import { fetchComments } from '../utils/api';

function CommentBoard({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!videoId) return;
    setLoading(true);
    setError('');
    fetchComments(videoId)
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('댓글을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [videoId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!comments.length) return <div>댓글이 없습니다.</div>;

  return (
    <div className="comment-board">
      <h2>댓글 목록</h2>
      {comments.map((comment) => (
        <CommentCell key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
}

export default CommentBoard;