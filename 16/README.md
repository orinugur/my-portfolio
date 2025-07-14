# YouTube 댓글 크롤러

React와 Node.js(Express)를 사용하여 특정 YouTube 영상의 댓글을 크롤링하고 확인할 수 있는 웹사이트입니다.

## 주요 기능
- YouTube 영상 ID 입력 시 해당 영상의 댓글을 크롤링하여 표시
- React 함수형 컴포넌트 및 useState, useEffect 훅 사용
- CSS 파일로 스타일링
- Node.js(Express) 기반 댓글 크롤링 API 서버

## 폴더 구조
```
/
├── package.json
├── server/
│   └── index.js
└── src/
    ├── App.js
    ├── App.css
    ├── components/
    │   ├── CommentBoard.js
    │   └── CommentCell.js
    └── utils/
        └── api.js
```

## 실행 방법
1. 의존성 설치  
   ```
   npm install
   ```
2. 백엔드 서버 실행  
   ```
   npm run server
   ```
3. 프론트엔드 실행  
   ```
   npm start
   ```

---
Q: npm install, npm start 등 실행 시 오류가 발생했어. (youtube-comment-scraper 설치 불가, index.html/index.js 누락 등)

A: youtube-comment-scraper 패키지 미지원으로 youtubei.js로 대체하고, CRA 필수 파일(public/index.html, src/index.js) 누락을 추가 생성하여 정상적으로 서버와 프론트엔드가 실행되도록 수정했습니다.

Q: 댓글을 불러오는 중 오류가 발생했습니다. (youtubei.js 사용)

A: youtubei.js의 getComments({ videoId }) 최신 사용법에 맞게 서버 코드를 수정하고, 반환 구조에 따라 댓글 추출 로직을 유연하게 개선했습니다. 서버를 재시작하여 변경사항을 반영했습니다.
## Q&A
Q: API가 실제로 동작하는지, 영상 ID(vixYMoSJZfE)로도 댓글이 조회되지 않음

A: youtubei.js의 getInfo(videoId)로 영상 정보만 받아오는 임시 라우트(/api/info)를 추가하여, API가 실제로 동작하는지 확인할 수 있도록 했습니다. info가 정상적으로 조회되면 youtubei.js와 네트워크 환경에는 문제가 없고, 댓글 API만 구조상 문제일 가능성이 높습니다.

Q: 로컬호스트 3000에서 새로고침하면 더이상 댓글이 안나와요

A: App.js에서 videoId, submittedId 상태를 localStorage와 동기화하여, 새로고침 시에도 마지막으로 입력한 영상 ID와 댓글 조회 결과가 자동으로 복원되도록 개선했습니다.
Q: JS와 React를 사용하여 특정 youtube의 댓글을 크롤링 한뒤 확인 할 수있는 웹사이트를 만들꺼야
Q: youtubei.js가 계속 오류가 나서 puppeteer로 바꿔달라고 요청했어요

A: puppeteer 기반으로 유튜브 댓글을 실제 브라우저에서 크롤링하는 방식으로 서버 코드를 전면 교체했습니다. 서버를 재실행하여 정상적으로 동작하도록 했습니다.

Q: 입력창에 영상 ID만 넣어야 하나요, 아니면 전체 URL도 되나요?

A: 영상 ID(예: BzZes5jWWvc)와 전체 URL(https://youtu.be/BzZes5jWWvc, https://www.youtube.com/watch?v=BzZes5jWWvc) 모두 입력할 수 있도록 개선했습니다. 어떤 형식이든 입력하면 자동으로 영상 ID를 추출해 댓글을 조회합니다.
A: CRA(react-scripts 기반) 구조로 React 프론트엔드와 Node.js(Express) 기반 댓글 크롤링 API를 구현했습니다. useState, useEffect 훅을 사용해 상태와 흐름을 관리하고, CSS 파일로 스타일링했습니다. axios로 API를 연동하여 댓글을 불러옵니다.
Q: npm run dev로 서버와 클라이언트가 동시에 실행되게 해주세요

A: package.json에 concurrently 의존성과 dev 스크립트를 추가하여, "npm run dev" 명령어로 서버(Express+Puppeteer)와 클라이언트(React)가 동시에 실행되도록 개선했습니다.
Q: puppeteer 댓글 크롤링 오류: page.waitForTimeout is not a function

A: puppeteer 최신 버전(v22)에서는 page.waitForTimeout 함수가 지원되지 않아, await new Promise(resolve => setTimeout(resolve, 2000)); 방식으로 대체하여 크롤링이 정상 동작하도록 수정했습니다.
Q: 댓글이 없습니다만 나와요

A: 유튜브 댓글 영역이 동적으로 로딩되는 문제를 해결하기 위해, puppeteer에서 댓글 영역이 나타날 때까지 스크롤 및 waitForSelector로 반복 대기하는 로직을 적용했습니다. 이제 댓글이 정상적으로 추출되어야 합니다.
Q: puppeteer로는 댓글 일부만 크롤링되는데, 원래처럼 API로 모든 댓글을 크롤링하는 건 힘든가요?

A: 공식 YouTube Data API를 사용하면 인증 및 쿼터 제한 하에 모든 댓글을 페이징 방식으로 가져올 수 있지만, API 키 발급, OAuth 인증, 쿼터 관리 등 추가 작업이 필요합니다.  
비공식 API(youtubei.js 등)는 최근 YouTube 구조 변경으로 거의 동작하지 않으며, puppeteer로 모든 댓글을 크롤링하려면 반복적으로 스크롤/대기/추출을 해야 하므로 속도와 안정성, 차단 위험이 있습니다.  
실제 서비스에서는 공식 API 사용을 권장하며, puppeteer 방식은 소규모/테스트용에 적합합니다.



