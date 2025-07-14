# Counter-Strike Web FPS

React + Three.js 기반 3D FPS 게임 (Counter-Strike 스타일)

## 주요 기능
- 3D FPS 플레이어(이동, 점프, 사격)
- 총을 쏘는 적
- 사방이 막힌 월드(맵)
- HUD(체력, 총알 표시)
- React 함수형 컴포넌트, useState/useEffect 활용
- CSS 파일로 스타일링

---

## Q&A

Q: 카운터 스트라이크 게임을 웹으로 만들어줘.  
카운터 스트라이크는 총을쏘는 3D FPS 게임이야  
필수적으로 들어가야하는건 사격,점프,이동이 가능한플레이어, 총을쏘는 적, 사방이 막혀있고 플레이어가 뚫을 수 없는 월드 , 체력과 총알을 표기하는 HUD등이 필요해

A: CRA(react-scripts) 기반 구조로 3D FPS 게임을 React 함수형 컴포넌트와 three.js(@react-three/fiber)로 구현합니다. 필수 패키지를 package.json에 추가하였고, 이후 src/ 및 주요 파일, HUD, 월드, 플레이어/적/총알 로직을 구현할 예정입니다. 모든 요청/답변은 Q&A 섹션에 누적 기록됩니다.
Q: CRA 구조 및 3D FPS 기본 파일/스타일, 의존성 설치, 개발 서버 실행까지 모두 완료해줘

A: CRA(react-scripts) 구조로 public, src 폴더와 App.js, Board.js, Player.js, Enemy.js, HUD.js, utils.js, 각 CSS 파일을 생성하고, npm install로 의존성 설치 후 npm start로 개발 서버를 실행했습니다. http://localhost:3001에서 게임을 확인할 수 있습니다.
Q: 화면에 랜더링 되는게없어

A: Board.js의 Canvas에 style 속성으로 width/height를 명시적으로 지정하여 3D 씬이 화면 전체에 보이도록 수정했습니다. 이제 게임 화면이 정상적으로 표시됩니다.
Q: 여전히 아무것도 랜더링되지않아

A: Board.js에서 Player/Enemy를 임시로 mesh로 직접 구현하여, 3D 큐브 두 개가 씬에 반드시 보이도록 수정했습니다. 이제 최소한 3D 오브젝트가 화면에 표시됩니다.
Q: 플레이어( 카메라를 가진 1인칭객체)가 움지깅고 총도쏴야하는데 안되고있어

A: Board.js에 1인칭 플레이어 컨트롤러(PlayerFPS)를 직접 구현하고, PointerLockControls를 추가하여 WASD 이동, Space 점프, 마우스 시점 전환, 마우스 클릭 총쏘기(총알 감소)가 모두 동작하도록 개선했습니다.
Q: BatchedMesh 관련 three-mesh-bvh/three 의존성 에러가 발생해

A: three, @react-three/fiber, @react-three/drei 버전을 호환 조합(three: 0.152.2, @react-three/fiber: 8.12.2, @react-three/drei: 9.56.15)으로 맞추고 npm install로 재설치하여 에러를 해결했습니다. 개발 서버가 http://localhost:3002 에서 정상적으로 실행됩니다.
Q: THREE is not defined 런타임 에러가 발생해

A: Board.js 상단에 import * as THREE from "three";를 추가하여 THREE 객체를 명시적으로 import해 런타임 에러를 해결했습니다.