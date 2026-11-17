# 타인의 삶 (Another Life) — 작업 안내

남의 직업 하루를 웹툰 컷과 선택지로 살아보고, 오늘 번 돈 ÷ 일한 시간을 보여주는 앱인토스(토스 미니앱) WebView 앱.

## 구조
- `index.html`: 화면·시나리오·엔진이 모두 들어 있는 한 파일 (토스 앱용 버전이 기준)
  - 직업 목록 `JOBS`, 시나리오 `SCENES_DAERI`(대기업 대리) · `SCENES_DERMA`(강남 피부과 원장)
  - 장면 그림 `IMG`/`IMG_DERMA`, 선택 결과 그림 `RIMG_DAERI`/`RIMG_DERMA`, 직업 프로필·세후 일급 `PROFILES`
  - 그림이 없는 선택지는 '내레이션 컷'(흐린 그림 + 가운데 문장)으로 보임
- `public/img/`: 웹툰 그림 (Figma AI, gemini-3.1-flash-lite-image, 720px JPEG)
- `src/ait-share.js`: 친구에게 공유하기 (getTossShareLink + share)
- `apps-in-toss.config.ts`: appName `another-life`

## 빌드
- `npm install` → `npm run build` → `another-life.ait` (앱인토스 콘솔에 업로드)
- 로컬 확인: `npm run dev` 후 http://localhost:3000

## 지켜야 할 것
- 화면을 만들거나 고치면 `.claude/skills/mobile-ui-design` 기준을 따르고, 끝나기 전 390px 스크린샷으로 체크리스트를 점검한다 (ui-self-check 스킬).
- TDS(React)로 전환하지 않는다. 대신 TDS 색상(@toss/tds-colors 값)과 글자 크기(30·26·22·20·17·15·13px)로 맞춘다.
- 토스 출시 가이드: 라이트 모드 고정, 확대 제스처 끔, 자체 뒤로가기 버튼 숨김(토스 내비게이션 바·history 연결), 외부 링크 금지, 해요체.
- 그림 위에 대사를 올리지 않는다(주인공 얼굴·표정을 가리지 않게). 대사는 그림 아래 대사 상자에.
- 글과 그림이 일치해야 하고, 선택하면 화면이 반드시 바뀌어야 한다.
- 서 원장 세후 순소득 월 약 2,300만 원은 사용자가 정한 값(통계보다 높음). 바꾸지 않는다.

## 진행 중
- 남은 선택 결과 그림(원장 약 18장, 대리 약 33장)을 Figma 무료 크레딧(하루 약 25장)으로 매일 생성 중.
