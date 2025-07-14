# React 테트리스 게임

## 소개
이 프로젝트는 **React 함수형 컴포넌트**와 **useState, useEffect** 훅을 활용하여 구현한 테트리스 게임입니다.  
CRA(react-scripts 기반) 구조로 폴더별로 나누어 작성되었으며, CSS-in-JS가 아닌 **일반 CSS 파일**로 스타일링하였습니다.

## 실행 방법

1. 의존성 설치  
   ```
   npm install
   ```

2. 개발 서버 실행  
   ```
   npm start
   ```
   - 기본적으로 http://localhost:3000 에서 실행되며, 이미 사용 중일 경우 http://localhost:3001 등 다른 포트로 자동 실행됩니다.

3. 브라우저에서 접속하여 테트리스 게임을 플레이할 수 있습니다.

## 폴더/파일 구조

```
public/
  └─ index.html
src/
  ├─ App.js
  ├─ App.css
  ├─ Board.js
  ├─ Board.css
  ├─ Cell.js
  ├─ Cell.css
  ├─ utils.js
  ├─ index.js
  └─ index.css
package.json
README.md
```

## 주요 구현 방법

- **React 함수형 컴포넌트**로 모든 UI 구성
- **useState, useEffect**로 블록 상태 및 게임 흐름 관리
- **utils.js**에 테트리스 로직(블록 생성, 충돌 체크, 병합, 줄 삭제 등) 분리
- **Board/Cell 컴포넌트**로 게임판과 셀 분리
- **일반 CSS 파일**로 스타일링

## 사용법

- **게임 시작/다시 시작**: "게임 시작" 또는 "다시 시작" 버튼 클릭
- **조작키**
  - ←, → : 블록 좌우 이동
  - ↓ : 블록 빠르게 내리기
  - ↑ : 블록 회전
  - Space : 하드드롭(즉시 바닥까지 내리기)
- **점수**: 한 줄을 지울 때마다 100점씩 증가
- **게임 오버**: 블록이 더 이상 쌓일 공간이 없을 때

---

## Q&A

### Q. 테트리스 게임을 React로 만들어줘  
A. CRA(react-scripts) 기반 구조로, 함수형 컴포넌트와 useState/useEffect 훅을 사용해 테트리스 게임을 구현했습니다.  
CSS-in-JS가 아닌 일반 CSS 파일로 스타일링하였고, Board/Cell/Utils 등으로 폴더별로 분리하였습니다.  
package.json에 필요한 의존성을 추가하고, npm install 및 npm start로 실행할 수 있습니다.

---