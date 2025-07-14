# React 블로그형 웹페이지

이 프로젝트는 CRA(react-scripts) 기반의 React 함수형 컴포넌트로 구현된 간단한 블로그형 웹페이지입니다. useState, useEffect 훅을 사용하며, CSS 파일로 스타일링합니다.

## 주요 특징
- React 함수형 컴포넌트 구조
- useState, useEffect로 상태 및 흐름 관리
- CSS 파일 분리 스타일링 (styled-components, CSS-in-JS 미사용)
- CRA(react-scripts) 기반 폴더 구조
- 더미 데이터 기반 글 목록 렌더링

## 폴더 구조
```
public/
  └─ index.html
src/
  ├─ index.js
  ├─ App.js
  ├─ components/
  │    ├─ PostList.js
  │    └─ Post.js
  ├─ utils/
  │    └─ dummyData.js
  └─ styles/
       ├─ App.css
       ├─ PostList.css
       └─ Post.css
package.json
README.md
```

## 실행 방법

1. 의존성 설치  
   ```
   npm install
   ```

2. 개발 서버 실행  
   ```
   npm start
   ```
   또는  
   ```
   npm run dev
   ```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## Q&A

Q: 블로그형식의 웹페이지를 만들어줘  
A: CRA(react-scripts) 기반 React 프로젝트 구조로, 함수형 컴포넌트와 useState, useEffect를 활용해 블로그형 웹페이지를 구현. CSS 파일로 스타일 분리, 더미 데이터로 글 목록 렌더링, 폴더별로 코드 분리. README에 구조/실행법/Q&A 작성.