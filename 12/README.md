# DOOM FPS React

> 참고: [id Software DOOM 공식 오픈소스 깃허브](https://github.com/id-Software/DOOM)  
> 본 프로젝트는 오리지널 DOOM의 오픈소스 엔진 구조와 맵 데이터를 참고하여, 웹/React 환경에서 간이 FPS로 구현한 예제입니다.

웹에서 실행 가능한 고전 DOOM 스타일의 1인칭 슈팅(FPS) 게임입니다.  
React 함수형 컴포넌트와 useState, useEffect 훅을 활용해 게임 상태와 흐름을 관리하며, 레이캐스팅 기반 3D 렌더링을 직접 구현했습니다.

---

## 🕹️ 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   ```
2. **개발 서버 실행**
   ```bash
   npm start
   ```
3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 또는 [http://localhost:3001](http://localhost:3001) 접속

---

## 🏗️ 폴더/파일 구조

- `public/index.html` : CRA 기본 HTML
- `src/index.js` : ReactDOM 렌더링 엔트리
- `src/App.js` : 메인 컨테이너, Board 컴포넌트 포함
- `src/components/Board.js` : FPS 게임 엔진(캔버스, 이동, 시점, 미니맵, 적, 총, 총알)
- `src/components/Board.css` : Board 스타일
- `src/utils/raycast.js` : 레이캐스팅(3D 벽 렌더링)
- `src/index.css`, `src/App.css` : 전체/메인 스타일

---

## 🎮 조작법

- **WASD** : 이동
- **마우스** : 시점 회전(캔버스 클릭 후 조작)
- **마우스 클릭/스페이스바** : 총 발사(총알 발사)
- **ESC** : 포인터 락 해제

---

## ⚙️ 구현 방법 요약

- React 함수형 컴포넌트, useState/useEffect로 상태 관리
- canvas를 활용한 3D 레이캐스팅(고전 DOOM 방식)
- 벽 충돌, 미니맵, 시점 회전, 이동 등 직접 구현
- **적(Enemy) 상태 및 간단한 AI(플레이어 추적)**
- **총(화면 중앙) 및 총알 상태, 총알-적 충돌 판정**
- CSS-in-JS/styled-components 미사용, 일반 CSS 파일만 사용

---

## ❓ Q&A

### Q. DOOM 게임만들어줘, FPS 같은게임인데 JS로 웹에서실행할거야
A. React 함수형 컴포넌트와 useState/useEffect, canvas, 레이캐스팅을 활용해 고전 DOOM 스타일 FPS 게임을 CRA 구조로 구현했습니다.  
폴더별로 코드 분리, CSS 파일 사용, README에 구현 방법/사용법/Q&A를 정리했습니다.

### Q. 적이랑 플레이어가 발사가능한 총같은것도 추가해ㅜ저
A. 적(Enemy) 상태와 간단한 AI(플레이어 추적), 총(화면 중앙) 및 총알 상태, 총알-적 충돌 판정, 마우스 클릭/스페이스바로 총 발사 기능을 추가했습니다.  
적은 파란색 타원으로, 총알은 노란색 원으로, 총은 화면 하단 중앙에 그려집니다. 적이 총알에 맞으면 사라집니다.

### Q. https://github.com/id-Software/DOOM 이게 둠의 오픈소스 깃허브야
A. 네, 오리지널 DOOM의 공식 오픈소스 엔진(https://github.com/id-Software/DOOM)을 참고하면 맵 구조, 적 AI, 무기, 효과음 등 다양한 고증 및 확장 구현에 도움이 됩니다. 본 프로젝트는 JS/React 기반의 간이 FPS 예제이며, 오리지널 엔진 구조와는 다르지만, 향후 맵 데이터/AI/무기/사운드 등 고증 확장에 참고할 수 있습니다.

---

이후 질문이 있을 때마다 Q&A를 README 하단에 계속 업데이트합니다.