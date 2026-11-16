# 타인의 삶 (Another Life) · 데모 v0.4

남의 연봉 말고, 남의 하루를 웹툰처럼 살아보는 앱의 데모입니다.
직업: 대기업 5년차 대리(그림 포함), 강남 피부과 개원의(그림 생성 대기 중).

## 실행

앱인토스(토스 미니앱) WebView 프로젝트입니다. Node 22 이상이 필요해요.

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 을 열면 오른쪽 아래 앱인토스 devtools와 함께 확인할 수 있어요.

## 앱 번들(.ait) 만들기

```bash
npm run build
```

`another-life.ait` 파일이 생겨요. 앱인토스 콘솔 → 앱 번들에 업로드하고 '토스앱 테스트'로 확인한 뒤 출시를 요청하세요.
`apps-in-toss.config.ts`의 `appName`은 콘솔에 등록한 앱 이름과 같아야 업로드돼요.

## 폴더 구조

```
another-life/
├── index.html              화면, 시나리오 데이터, 게임 엔진이 모두 들어 있는 한 파일
├── public/img/             장면·선택 결과 웹툰 그림 (Figma AI로 생성, 720px JPEG)
├── apps-in-toss.config.ts  앱인토스 설정 (appName, WebView 옵션)
├── vite.config.ts          빌드 설정
└── package.json
```

## 코드에서 고칠 곳

`index.html` 안의 `<script>`에서 찾으면 됩니다.

| 무엇 | 어디 |
|---|---|
| 직업 목록 (체험 가능 여부 `playable`) | `const JOBS` |
| 대리 시나리오 | `const SCENES_DAERI` |
| 원장 시나리오 | `const SCENES_DERMA` |
| 장면 그림 연결 | `const IMG`, `IMG_DERMA` (장면 id → `public/img/` 파일 이름) |
| 선택 결과 그림 | `RIMG_DAERI`, `RIMG_DERMA` (장면 id → 선택 순서별 파일 이름) |
| 직업 프로필, 세후 일급, 정산 문구 | `const PROFILES` |
| 엔딩 조건 | `endingDaeri()`, `endingDerma()` |
| 근거 자료 | `FACTS_DAERI`, `FACTS_DERMA` |

## 알아둘 점

- 정산 화면의 **감정 반응 공유 통계**는 claude.ai 아티팩트의 공유 저장소(`window.claude.use("db")`)를 씁니다.
  이 폴더를 그냥 열면 그 저장소가 없어서 반응은 내 브라우저에만 저장되고, 다른 사람 통계는 보이지 않습니다.
  실제 서비스에서는 Firebase, Supabase 같은 백엔드로 바꿔 연결하면 됩니다 (`paintRx`, `react` 함수).
- 수치(연봉, 매출, 대출 등)는 시나리오용 가정입니다.
- 그림은 Figma AI로 생성했습니다. 상업적으로 쓰기 전에 Figma AI 이용 약관을 확인하세요.

## 토스 출시 가이드에 맞춘 점

- 라이트 모드만 사용, 확대·축소 제스처 끔
- 자체 뒤로가기 버튼을 숨기고, 토스 내비게이션 바·안드로이드 뒤로가기를 화면 흐름(홈 ← 직업 상세 ← 체험)에 연결. 홈에서 뒤로가기를 누르면 미니앱이 닫혀요.
- 근거 기사는 외부 링크 없이 출처 이름만 표시
- 강남 피부과 원장은 장면 그림이 채워질 때까지 '준비 중'으로 잠금 (`JOBS`의 `playable`)
