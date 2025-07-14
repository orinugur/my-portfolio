# Coupang Clone (React CRA)

쿠팡 메인 페이지 클론 프로젝트입니다.  
React 함수형 컴포넌트, useState/useEffect, CSS 파일 기반으로 구현되었습니다.  
CRA(react-scripts) 구조를 따르며, 폴더별로 컴포넌트와 스타일을 분리하였습니다.

## 주요 기술 및 구조
- React 18 (함수형 컴포넌트, useState, useEffect)
- CRA(react-scripts) 기반 프로젝트 구조
- CSS 파일로 스타일링(CSS-in-JS, styled-components 미사용)
- 폴더별 컴포넌트/스타일 분리
- 목업 데이터 기반 상품 리스트

## 폴더 구조
```
public/
  index.html
src/
  index.js
  App.js
  components/
    Header.js
    SearchBar.js
    CategoryNav.js
    Banner.js
    ProductList.js
    Footer.js
  styles/
    global.css
    App.css
    Header.css
    SearchBar.css
    CategoryNav.css
    Banner.css
    ProductList.css
    Footer.css
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
3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## Q&A

Q: https://www.coupang.com/ 해당사이트처럼만들어줘  
A: CRA(react-scripts) 기반으로 쿠팡 메인 페이지 클론을 React 함수형 컴포넌트와 useState/useEffect, CSS 파일로 구현.  
   Header, SearchBar, CategoryNav, Banner, ProductList, Footer 등 주요 영역을 컴포넌트로 분리하고, 각 컴포넌트별 CSS 파일로 스타일링.  
   목업 상품 데이터로 리스트 구현, 전체 폴더 구조 및 실행법, Q&A를 README에 정리함.