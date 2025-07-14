# React Tetris

간단한 React 기반 테트리스 게임입니다.

## 주요 특징

- React 함수형 컴포넌트 및 Hooks(`useState`, `useEffect`) 사용
- 키보드 방향키로 블록 조작
- 한 줄 완성 시 자동 삭제 및 점수 증가
- 게임 오버 및 다시 시작 기능
- CSS 파일 분리(Styled-components, CSS-in-JS 미사용)
- 외부 테트리스 라이브러리 미사용, 순수 구현

## 실행 방법

1. 패키지 설치  
   ```
   npm install
   ```

2. 개발 서버 실행  
   ```
   npm start
   ```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 폴더 구조

```
.
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── Board.js
│   ├── Board.css
│   ├── Cell.js
│   ├── Cell.css
│   ├── utils.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 조작법

- **←, →** : 블록 좌우 이동
- **↓** : 블록 빠르게 내리기
- **↑** : 블록 회전
- **스페이스바** : 하드드롭(즉시 바닥까지)

## 참고

- 본 프로젝트는 CRA(Create React App) 없이 직접 구조를 생성하였으며, 모든 코드는 순수 React로 작성되었습니다.


요청한 프롬프트 
React를 사용해서 테트리스 게임이 실행 가능한 웹사이트를 만들어줘.
요구 사항은 다음과 같아:
- React 함수형 컴포넌트 기반으로 작성해줘
- useState, useEffect 훅을 활용해 블록 상태 및 게임 흐름을 제어해줘
- 키보드 방향키로 블록을 조작할 수 있게 해줘
- 한 줄이 완성되면 자동으로 사라지게 해줘
- 점수와 게임 오버 화면도 포함해줘
- CSS-in-JS 스타일 또는 styled-components는 사용하지 말고, 일반 CSS 모듈이나 파일을 사용해줘
- 전체 코드는 간단한 CRA 구조로 나눠서 작성해줘 (예: App.js, Board.js, Cell.js, utils 등)

단, 외부 테트리스 라이브러리는 사용하지 말고 순수하게 구현해줘.
- 현재프로젝트에 리액트등이 설치되어있지않기때문에 package.json 파일부터 수정한뒤 인스톨을 실행하고 모든 파일 작성이끝나면 npm start나 npm run dev를 통해서 서버실행까지부탁해