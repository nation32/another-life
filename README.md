# 타인의 삶 (Another Life) · 데모 v0.4

남의 연봉 말고, 남의 하루를 웹툰처럼 살아보는 앱의 데모입니다.
직업: 대기업 5년차 대리(그림 포함), 강남 피부과 개원의(그림 생성 대기 중).

## 실행

빌드 과정이 없는 정적 웹페이지입니다.

- 가장 간단한 방법: `index.html`을 브라우저로 엽니다.
- 로컬 서버로 열기 (폰에서도 같은 와이파이로 확인 가능):

```bash
cd another-life
python3 -m http.server 8000
```

그다음 브라우저에서 `http://localhost:8000` 을 엽니다.

## 폴더 구조

```
another-life/
├── index.html   화면, 시나리오 데이터, 게임 엔진이 모두 들어 있는 한 파일
├── img/         장면·선택 결과 웹툰 그림 (Figma AI로 생성, 720px JPEG)
└── README.md
```

## 코드에서 고칠 곳

`index.html` 안의 `<script>`에서 찾으면 됩니다.

| 무엇 | 어디 |
|---|---|
| 직업 목록 | `const JOBS` |
| 대리 시나리오 | `const SCENES_DAERI` |
| 원장 시나리오 | `const SCENES_DERMA` |
| 장면 그림 연결 | `const IMG`, `IMG_DERMA` (장면 id → `img/` 파일 이름) |
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
