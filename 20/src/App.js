import React, { useState } from 'react';
import PostList from './components/PostList';
import postsData from './utils/dummyData';
import './styles/App.css';

function App() {
  const [posts] = useState(postsData);

  return (
    <div className="app-container">
      <header>
        <h1>React 블로그</h1>
        <p>간단한 블로그형 웹페이지 예제입니다.</p>
      </header>
      <main>
        <PostList posts={posts} />
      </main>
      <footer>
        <small>© 2025 React Blog Example</small>
      </footer>
    </div>
  );
}

export default App;