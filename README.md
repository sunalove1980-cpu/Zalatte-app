# 김자라 박라떼 · Zalatte-app

개발 소스와 현재 GitHub Pages 배포본을 한 저장소에서 관리합니다.
서비스 주소: https://sunalove1980-cpu.github.io/Zalatte-app/

## 개발·검증·배포

Node 버전은 `.nvmrc`를 사용합니다. 새로 내려받은 뒤:

```sh
npm ci
npm run setup
npx playwright install --with-deps chromium
npm run dev
```

개발 주소는 `http://localhost:3000/Zalatte-app/`입니다.
`frontend/src/`를 수정하고 다음을 실행합니다:

```sh
npm run check
git add frontend scripts tests .github package.json package-lock.json index.html assets icons firebase-messaging-sw.js manifest*.webmanifest release.json .nojekyll
# 변경 파일과 민감정보 검사를 확인한 후 커밋
git commit -m "Describe the app change"
git push origin HEAD:main
```

`npm run check`는 타입 검사, 빌드, 배포 산출물·PWA 경로 검사와 모바일/데스크톱 로그인 전 UI 테스트를 실행합니다. 기존 `lint`는 TypeScript 검사이며 별도 ESLint 구성은 없습니다. UI 테스트는 실제 로그인·가입을 제출하지 않고 사용자 데이터 API를 차단합니다. 로그인 후 일기·사진·일정·푸시 수신은 실제 계정으로 검증하지 않습니다.

## 배포 구조

- `frontend/`: React/TypeScript/Vite/Tailwind 소스, 고정된 lockfile, 공개 정적 리소스.
- 저장소 루트의 `index.html`, `assets/`, `icons/`, manifest, 서비스워커: 자동 생성되어 커밋하는 Pages 배포본. 직접 수정하지 마세요.
- `npm run build`: `/Zalatte-app/` base로 빌드하고 결과를 루트에 복사합니다. 이전 해시 청크는 이미 열린 화면의 지연 로딩을 위해 유지합니다.
- Pages는 기존 **main / root** 브랜치 배포를 유지합니다. 설정 변경이나 별도 배포 토큰이 필요하지 않습니다.
- `.github/workflows/verify.yml`: 소스 재빌드 일치, 로그인 전 UI, 정확한 main 커밋의 Pages 완료, 실제 URL의 모든 생성 파일 해시를 확인합니다. 배포는 GitHub의 기존 `pages build and deployment`가 담당합니다.
- 브랜치 배포는 push 즉시 시작하므로 **push 전에 반드시 `npm run check`를 실행**하세요. 검증 워크플로가 배포를 사전에 차단하는 구조는 아닙니다.
- `release.json`은 frontend 소스의 SHA-256으로 배포와 소스의 대응을 확인합니다.

## 데이터·PWA 보존 범위

Firebase 클라이언트 프로젝트와 `(default)` Firestore, 인증 코드, 데이터 접근 코드, 알림 서비스워커는 기존과 같습니다. Firebase 웹 앱 설정은 기존 번들에 공개된 클라이언트 식별정보입니다. 관리자 비밀키가 아닙니다. 비밀키나 서비스계정은 추가하지 마세요.

PWA의 기존 manifest ID·scope·start URL·아이콘·서비스워커 URL을 유지합니다. 서비스워커는 FCM 알림용이며 오프라인 앱 셸 캐시는 구현되어 있지 않습니다. 오프라인 동작을 보장하지 않습니다. 새 배포가 사용자 DB나 브라우저 저장 데이터를 지우지 않습니다.

원본 비공개 Zalatte 저장소는 보존되어 있습니다. 비공개 Git 이력, 환경파일, 서버 함수, Firebase 관리 설정·규칙, 사용자 데이터는 이 저장소로 가져오지 않았습니다. 기존 서버 함수의 named Firestore와 프런트엔드 `(default)` 차이는 별도 확인 사항이며 이 통합에서 수정하거나 함수 배포하지 않습니다.

## 복구

통합 전 공개 배포 커밋은 `64cef842455344a005c09eb9504dbd1c1538136f`입니다. 문제가 생기면 해당 변경 커밋을 `git revert`하여 main으로 push하고 Pages 완료와 실제 URL을 확인하세요. 원본 전체 백업을 이 공개 저장소에 복사하면 안 됩니다. 소스 수정은 앞으로 Zalatte-app의 `frontend/`에서 합니다.
