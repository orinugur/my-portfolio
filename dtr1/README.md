# React 주식 정보 사이트

## 소개
- 실시간 주식 시세(Apple, Google, Tesla 등)를 제공하는 SPA입니다.
- React 함수형 컴포넌트, CRA(react-scripts) 기반 구조, CSS 파일 분리 적용.
- stooq.com 공개 API를 활용하여 별도의 key 없이 주식 데이터를 가져옵니다.
- 네트워크 오류 시 fallback 데이터 제공, localStorage 캐싱 지원.

## 폴더/파일 구조
```
/index.html
/package.json
/src
  /index.js
  /App.js
  /components
    /StockList.js
    /StockDetail.js
  /utils
    /api.js
  /styles
    /App.css
/README.md
```

## 주요 구현 방법
- CRA(react-scripts) 기반 프로젝트로 폴더별 파일 분리.
- 상태 및 데이터 흐름 관리는 useState, useEffect 훅 사용.
- CSS-in-JS, styled-components 미사용. 일반 CSS 파일로 스타일링.
- stooq.com API fetch 시 localStorage에 5분간 캐싱, 네트워크 오류 시 더미 데이터 반환.
- package.json에 homepage, postbuild 등 자동 배포 스크립트 적용.

## 사용법
1. 의존성 설치  
   ```
   npm install
   ```
2. 개발 서버 실행  
   ```
   npm start
   ```
3. 정적 빌드 및 자동 복사  
   ```
   npm run build
   ```
   (build 폴더의 정적 파일이 root로 자동 복사됨)
4. GitHub Pages 배포  
   ```
   git add .
   git commit -m "deploy"
   git push
   ```
   - 배포 주소: https://orinugur.github.io/my-portfolio123/dtr/

## Q&A 누적 기록

Q: 주식사이트만들엊워  
A: CRA(react-scripts) 기반 React SPA로, stooq.com 공개 API를 활용해 실시간 주식 시세를 제공하는 사이트를 구현했습니다. 폴더별 파일 분리, useState/useEffect로 상태 관리, CSS 파일 분리, 네트워크 오류 시 fallback 데이터 및 localStorage 캐싱, 자동 배포 스크립트 등 요구사항을 모두 반영했습니다.
