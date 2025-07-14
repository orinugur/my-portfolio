import React, { useState, useEffect } from 'react';
import CommentBoard from './components/CommentBoard';
import './App.css';

function App() {
  // localStorage에서 videoId, submittedId 복원
  const [videoId, setVideoId] = useState(() => localStorage.getItem('videoId') || '');
  const [submittedId, setSubmittedId] = useState(() => localStorage.getItem('submittedId') || '');

  useEffect(() => {
    localStorage.setItem('videoId', videoId);
  }, [videoId]);

  useEffect(() => {
    localStorage.setItem('submittedId', submittedId);
  }, [submittedId]);

  // 입력값에서 videoId 추출 (ID 또는 URL 모두 지원)
  function extractVideoId(input) {
    // https://youtu.be/xxxx, https://www.youtube.com/watch?v=xxxx 등에서 추출
    const urlMatch = input.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
    if (urlMatch) return urlMatch[1];
    // 11자리 ID만 입력된 경우
    if (/^[0-9A-Za-z_-]{11}$/.test(input)) return input;
    return '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractVideoId(videoId.trim());
    setSubmittedId(id);
  };

  return (
    <div className="App">
      <h1>YouTube 댓글 크롤러</h1>
      <form onSubmit={handleSubmit} className="video-form">
        <input
          type="text"
          placeholder="YouTube 영상 ID 입력 (예: dQw4w9WgXcQ)"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button type="submit">댓글 가져오기</button>
      </form>
      {submittedId && <CommentBoard videoId={submittedId} />}
    </div>
  );
}

export default App;