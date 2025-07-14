# 1x1 블럭 포함 테트리스 (React)

## 소개
- React(CRA) 기반의 테트리스 게임입니다.
- 기존 테트리스 블럭 외에 1x1 블럭도 등장합니다.
- 상태 관리는 useState, useEffect 훅을 사용합니다.
- CSS-in-JS 미사용, 일반 CSS 파일로 스타일링합니다.

## 실행 방법
1. `npm install`
2. `npm start`
3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 배포 방법
- `npm run build` 실행 시 build 폴더의 정적 파일이 root로 복사됩니다.
- github pages 주소: https://orinugur.github.io/my-portfolio123/onuri/

## 폴더 구조
```
/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.js
    ├── App.css
    ├── Board.js
    ├── Board.css
    ├── Cell.js
    ├── Cell.css
    └── utils.js
```

---

## Q&A
### Q: 테트리스를 만들어줘. 그런데 이제 1x1 블럭같은 것도 있는 버전으로
A: React(CRA) 구조로 1x1 블럭이 포함된 테트리스 프로젝트를 설계하고, CRA 구조에 맞게 파일을 분리해 작성합니다. index.html은 root에 위치하며, CSS-in-JS는 사용하지 않고 일반 CSS 파일로 스타일링합니다. README.md 하단에 Q&A를 누적 관리합니다.

---

### Q: 실제 구현 방식과 주요 구조는?
A:
- CRA(react-scripts) 기반 구조로 App.js, Board.js, Cell.js, utils.js, 각 CSS 파일로 분리
- 1x1 블럭(D) 포함 모든 테트리스 블럭을 utils.js에 정의, 랜덤 등장
- Board.js에서 useState, useEffect로 게임 상태/흐름 관리(블럭 생성, 이동, 회전, 고정, 줄 삭제, 게임오버, 점수, 다음블럭, 하드드롭, 키입력 등)
- Cell.js는 셀 단위 렌더링, value에 따라 색상 구분
- Board.css, Cell.css 등에서 레이아웃 및 시각 효과 적용
- CRA 구조 및 배포 스크립트(postbuild, homepage) 적용
