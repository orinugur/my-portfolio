# Apple.com 클론 React 프로젝트

이 프로젝트는 [apple.com](https://www.apple.com/kr/)의 메인 페이지를 React(CRA 기반)로 클론한 학습용 프로젝트입니다.

## 주요 기술 및 구조
- React 함수형 컴포넌트, useState/useEffect 활용
- CRA(react-scripts) 기반 폴더 구조
- CSS-in-JS 미사용, 일반 CSS 파일로 스타일링
- 주요 컴포넌트: Header, MainSection, Footer

## 폴더 구조
```
/public
  └─ index.html
/src
  ├─ index.js
  ├─ App.js
  ├─ App.css
  ├─ index.css
  └─ components
      ├─ Header.js / Header.css
      ├─ MainSection.js / MainSection.css
      └─ Footer.js / Footer.css
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

---

## Q&A

Q: https://www.apple.com/  해당사이트처럼만들어줘

A: CRA(react-scripts) 기반으로 apple.com 메인 페이지 레이아웃을 React 함수형 컴포넌트와 일반 CSS 파일로 구현. Header, MainSection, Footer로 분리하고, 폴더 구조 및 실행 방법을 README에 정리함.