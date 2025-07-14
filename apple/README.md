# Apple.com 클론 SPA (React)

## 소개
이 프로젝트는 React(CRA 구조)로 구현한 Apple 공식 홈페이지 클론 SPA입니다.  
포트폴리오 및 학습 목적이며, 실제 Apple과 무관합니다.

## 주요 기술 및 구조
- React 함수형 컴포넌트, useState/useEffect 사용
- CRA(react-scripts) 기반 구조(App.js, components/, styles/)
- CSS-in-JS, styled-components 미사용. 일반 CSS 파일로 스타일링
- index.html은 프로젝트 루트에 위치
- 정적 빌드 및 SPA 자동 배포 스크립트 포함

## 실행 방법
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
   (build 폴더의 정적 파일이 프로젝트 루트로 자동 복사됨)

4. GitHub Pages 배포  
   ```
   git add .
   git commit -m "deploy"
   git push
   ```
   - 배포 주소: https://orinugur.github.io/my-portfolio123/apple/

## 폴더 구조
```
/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.js
    ├── components/
    │   ├── Header.js
    │   ├── Hero.js
    │   ├── ProductSection.js
    │   └── Footer.js
    └── styles/
        └── common.css
```

## Q&A 누적 기록

Q: https://www.apple.com/ 같은 사이트 만들어줘  
A: CRA(react-scripts) 기반 구조로, React 함수형 컴포넌트와 일반 CSS 파일을 사용해 Apple.com 클론 SPA를 설계 및 구현. index.html은 루트에 위치, 주요 섹션(헤더, Hero, 제품, 푸터) 컴포넌트 분리, 배포 스크립트 및 Q&A 누적 관리 포함.

---

## Q&A 누적 기록

Q: https://www.apple.com/ 같은 사이트 만들어줘  
A: CRA(react-scripts) 기반 구조로, React 함수형 컴포넌트와 일반 CSS 파일을 사용해 Apple.com 클론 SPA를 설계 및 구현. index.html은 루트에 위치, 주요 섹션(헤더, Hero, 제품, 푸터) 컴포넌트 분리, 배포 스크립트 및 Q&A 누적 관리 포함.

Q: https://www.apple.com/store 해당사이트의 store페이지도구현해줘  
A: react-router-dom을 도입해 SPA 라우팅 구조를 적용하고, /store 경로에 StorePage 컴포넌트를 추가 구현. StorePage는 상단 배너, 카테고리, 추천제품, 프로모션 등 apple.com/store의 주요 섹션을 단순화하여 반영. Header의 "스토어" 메뉴 클릭 시 /store로 이동하도록 Link 처리, 관련 CSS도 common.css에 추가.
