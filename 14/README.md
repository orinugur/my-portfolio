# Counter-Strike Web Game (React)

## 프로젝트 소개
React(CRA) 기반의 Counter-Strike 스타일 웹 게임입니다.  
플레이어는 이동, 점프, 사격이 가능하며, 적도 총을 쏩니다.  
사방이 막힌 월드와 체력/총알 HUD가 구현되어 있습니다.

---

## Q&A

Q: 카운터 스트라이크 게임을 웹으로 만들어줘.  
필수적으로 들어가야하는건 사격,점프,이동이 가능한플레이어, 총을쏘는 적, 사방이 막혀있고 플레이어가 뚫을 수 없는 월드 , 체력과 총알을 표기하는 HUD등이 필요해

A: CRA(react-scripts) 기반으로 프로젝트를 생성하고, React/ReactDOM/classnames 등 필수 패키지를 package.json에 추가 후 npm install로 설치했습니다.  
게임 구조는 App.js, Board.js, Player.js, Enemy.js, HUD.js 등으로 분리하여 작성할 예정입니다.  
요구사항(이동/점프/사격/적/월드/체력/총알 HUD)을 모두 반영할 계획입니다.