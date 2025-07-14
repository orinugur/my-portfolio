import React from 'react';
import '../styles/CategoryNav.css';

const categories = [
  '패션의류', '패션잡화', '뷰티', '출산/유아동', '식품', '주방용품', '생활용품', '홈인테리어', '가전디지털', '스포츠/레저', '자동차용품', '도서/음반/DVD'
];

function CategoryNav() {
  return (
    <nav className="category-nav">
      <ul>
        {categories.map((cat, idx) => (
          <li key={idx}>{cat}</li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryNav;