import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`검색: ${keyword}`);
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="찾고 싶은 상품을 검색해보세요!"
        value={keyword}
        onChange={handleChange}
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default SearchBar;