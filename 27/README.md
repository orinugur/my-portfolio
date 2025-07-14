# 카카오톡 클론 메신저

이 프로젝트는 웹 기반의 카카오톡 스타일 메신저 어플리케이션입니다.  
React(프론트엔드)와 Node.js/Express, WebSocket(백엔드)로 구성되어 있습니다.

## 주요 기능
- 회원가입 및 로그인
- 친구 목록 관리
- 1:1 실시간 채팅
- 대화방 UI

## 폴더 구조
```
/client         # 프론트엔드(React)
/server         # 백엔드(Node.js, Express, WebSocket)
README.md
```

---

Q. "카카오톡 같은 어플리케이션 만들어줘" 요청  
A. React(프론트엔드)와 Node.js/Express/WebSocket(백엔드) 기반의 기본 구조 및 실행 파일을 생성함.
Q. "모바일어플리케이션 생성후 실행까지해줘" 요청  
A. React Native(Expo) 기반 모바일앱 프로젝트를 생성하고, 의존성 설치 및 `npx expo start --port 8082` 명령어로 앱을 자동 실행함. 포트 충돌 시 명령어에 `--port` 옵션을 지정하면 프롬프트 없이 바로 실행 가능함.
Q. "카카오톡 어플 만들고 실행해줘" 요청  
A. 모바일앱에 로그인, 친구목록, 채팅방, 실시간 메시지 UI/로직을 추가하여 MVP 카카오톡 클론을 구현하고, Expo로 바로 실행 가능하도록 반영함.
Q. "Expo이 뭐야?"  
A. Expo는 React Native 기반 모바일앱을 쉽고 빠르게 개발·실행·배포할 수 있게 해주는 오픈소스 프레임워크 및 플랫폼입니다. 별도의 네이티브 개발 환경 없이도 앱을 만들고, QR코드로 바로 실행하거나 앱스토어에 배포할 수 있습니다.
Q. "아까는 자동으로 Android Emulator 로실행해서 앱 띄워주던데"  
A. Expo 실행 중 터미널에 `a` 키를 입력하면 Android 에뮬레이터가 자동으로 실행되어 앱이 바로 뜹니다. 자동화가 필요할 경우 `echo a | npx expo start` 명령을 시도할 수 있으나, 가장 확실한 방법은 실행 중인 터미널에서 직접 `a`를 입력하는 것입니다.
Q. "echo a | npx expo start"로 Android 에뮬레이터 자동 실행이 안 돼요  
A. Expo CLI는 대화형(Interactive) 터미널에서만 키 입력(`a` 등)을 인식합니다. `echo a | npx expo start`처럼 파이프/자동화 방식은 "non-interactive terminal"로 간주되어 키 입력이 무시되고, 에뮬레이터가 자동 실행되지 않습니다. 반드시 실행 중인 터미널에서 직접 `a`를 입력해야 Android 에뮬레이터가 자동으로 실행됩니다.
Q. "a를 눌러도 뭐가안되는데"  
A.  
Q. "명령어로 Android 에뮬레이터를 자동 실행하려는데 emulator 명령이 안 먹혀요"  
A. 시스템 환경변수(PATH)에 Android SDK의 emulator.exe 경로가 등록되어 있지 않으면 명령어로 에뮬레이터를 실행할 수 없습니다.  
- 해결 방법: Android Studio에서 AVD Manager로 직접 에뮬레이터를 실행하거나,  
  SDK 경로(C:\Users\사용자명\AppData\Local\Android\Sdk\emulator 등)를 환경변수에 추가해야 합니다.
- Android Studio가 설치되어 있지 않거나, ANDROID_HOME 환경변수가 설정되지 않은 경우  
- Android 에뮬레이터(AVD)가 생성되어 있지 않은 경우  
- Expo 실행 터미널이 진짜 대화형이 아닌 경우  
- 에뮬레이터가 이미 실행 중이거나, 권한 문제가 있는 경우  
이럴 때는 Android Studio에서 AVD Manager로 에뮬레이터를 직접 실행한 뒤, Expo 터미널에서 `a`를 누르면 앱이 자동으로 실행됩니다.
## Q&A
---
## Q&A

- Q: 카카오톡 같은 apk 만들어줘  
  A: 카카오톡 스타일의 채팅앱 UI/기본 기능을 React Native로 구현하고, Android 빌드 준비를 자동화함.
- Q: 앱이 Reloading..에서 멈추고 실행이 안됨  
  A: Metro 번들러 서버(8081 포트) 중복 실행으로 인한 문제였으며, 포트 점유 프로세스 종료 및 Metro 서버 재실행 후 정상적으로 앱이 빌드/실행됨.
- Q: 해당 프로젝트에서 apk를 만들거나 한 환경을 기본값으로 설정하기 위한 프롬프트를 만들어달라  
  A: package.json에 빌드/실행/초기화 스크립트와 KakaoChatApp/README.md에 한글 프롬프트 안내문을 추가해, 누구나 명령어 한 줄로 APK 빌드 및 실행 환경을 자동화할 수 있도록 개선함.