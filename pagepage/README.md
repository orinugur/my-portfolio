# 내부 사이트 뷰어 (site-viewer)

## 프로젝트 개요
- 이 프로젝트는 홈페이지 내부에서 다른 사이트(외부 SPA)를 iframe으로 볼 수 있는 React 기반 SPA입니다.
- 사용자는 버튼을 클릭해 아래 3개 사이트를 자유롭게 전환하여 볼 수 있습니다.
  - https://orinugur.github.io/my-portfolio123/ogu/
  - https://orinugur.github.io/my-portfolio123/2
  - https://orinugur.github.io/my-portfolio123/o/

## 폴더/파일 구조
```
index.html                // root에 위치, CRA public/index.html 역할
src/
  App.js                  // 메인 컴포넌트
  App.css                 // 전체 스타일
  index.js                // ReactDOM 렌더링
  components/
    SiteViewer.js         // 사이트 선택 및 iframe 렌더링
package.json              // CRA 기반, homepage/postbuild 포함
README.md                 // 프로젝트 설명 및 Q&A 누적
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
   브라우저에서 http://localhost:3000 접속

## 정적 빌드 및 자동 배포
- `package.json`의 `homepage`는  
  `https://orinugur.github.io/my-portfolio123/site-viewer`  
  로 반드시 지정되어 있습니다.
- 빌드 및 자동 복사  
  ```
  npm run build
  ```
  실행 시 build 폴더의 모든 정적 파일이 프로젝트 root로 자동 복사됩니다.
- git add, commit, push 후  
  `https://orinugur.github.io/my-portfolio123/site-viewer/`  
  에서 SPA가 정상 동작합니다.

## 주요 구현 방법
- React 함수형 컴포넌트, useState 사용
- CRA(react-scripts) 구조, CSS 파일로 스타일링
- iframe sandbox 미적용(외부 SPA 정상 표시 목적)
- index.html은 root에 위치

---

## Q&A 누적

### Q: 홈페이지 내부에서 다른 사이트를 볼 수 있는 홈페이지를 만들고싶거든?  
내부에 걸어놔야 하는 사이트는  
https://orinugur.github.io/my-portfolio123/ogu/  
https://orinugur.github.io/my-portfolio123/2  
https://orinugur.github.io/my-portfolio123/o/  
이렇게야

A: CRA(react-scripts) 기반으로, index.html을 root에 두고, App.js, SiteViewer.js, App.css 등으로 분리하여 React SPA를 구현했습니다.  
3개의 외부 사이트를 버튼으로 선택해 iframe으로 볼 수 있습니다.  
package.json에 homepage, postbuild 등 자동 배포 스크립트도 추가하였고, 모든 구현 및 Q&A 내역을 README.md에 누적 기록합니다.
