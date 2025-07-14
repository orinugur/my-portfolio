# Counter Strike FPS (React)

## 개요
- 이 프로젝트는 React 함수형 컴포넌트와 three.js를 활용해 구현한 1인칭 슈팅(FPS) 게임입니다.
- 카운터 스트라이크 스타일의 기본적인 FPS 플레이(플레이어 이동, 총 쏘기, 적 AI, 맵, HUD 등)를 웹에서 체험할 수 있습니다.

## 폴더 구조
```
counter-strike-fps/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameCanvas.js
│   │   ├── Player.js
│   │   ├── Enemy.js
│   │   ├── Gun.js
│   │   ├── HUD.js
│   │   └── Map.js
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   └── gameUtils.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 설치 및 실행 방법
1. 의존성 설치  
   ```
   npm install
   ```
2. 개발 서버 실행  
   ```
   npm start
   ```
3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 주요 구현 방식
- **React 함수형 컴포넌트**와 **useState, useEffect** 훅을 적극 활용해 게임 상태와 흐름을 관리합니다.
- **three.js**로 3D FPS 화면을 렌더링하며, Player/Enemy/Gun/Map 등은 three.js 내부에서 관리됩니다.
- **일반 CSS 파일**(`src/styles/App.css`)로 스타일링하며, CSS-in-JS나 styled-components는 사용하지 않습니다.
- 각 기능별로 컴포넌트와 유틸리티를 분리해 유지보수성을 높였습니다.

## Q&A 및 구현 상세 (업데이트용)
### Q. 카운터 스트라이크 FPS 게임을 CRA(react-scripts) 기반으로 React 함수형 컴포넌트로 구현해줘
A. CRA 구조로 프로젝트를 세팅하고, three.js를 활용해 3D FPS 게임의 기본 구조(플레이어, 적, 총, 맵, HUD 등)를 컴포넌트별로 분리해 구현했습니다. useState, useEffect 훅을 적극 활용하며, 스타일은 CSS 파일로 관리합니다.

---

### Q. 미니맵을 플레이어 기준으로, 구조물/적/플레이어 위치가 실시간으로 표시되게 해줘
A. 미니맵의 중심이 항상 플레이어 위치가 되도록, 모든 오브젝트/적/구조물의 좌표를 플레이어 기준 상대좌표로 변환해서 그리도록 개선했습니다.

### Q. 구조물(벽, 기둥, 박스 등)과 총알이 충돌하면 뚫지 못하게 해줘
A. 플레이어와 적의 총알이 벽, 기둥, 박스 등 구조물에 충돌하면 더 이상 뚫지 못하고 사라지도록 구현했습니다.

### Q. 플레이어가 점프해서 구조물 위에 올라가면 자유롭게 이동/점프가 가능해야 해
A. 점프, 중력, 구조물 위 착지 기능을 추가하고, 구조물 위에서도 이동/점프가 자연스럽게 동작하도록 충돌 처리를 개선했습니다.

### Q. R키로 재장전, 플레이어/적 총 mesh, 자동 적 배치, HUD, 미니맵 등 다양한 기능을 추가해줘
A. R키로 탄약이 0일 때 재장전, 플레이어/적 모두 3D 총 mesh를 들고, 적이 자동으로 맵에 배치되며, HUD와 미니맵이 실시간으로 표시됩니다.

---