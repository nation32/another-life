---
name: mobile-ui-design
description: 앱인토스 미니앱 화면을 새로 만들거나 고칠 때 반드시 사용하는 디자인 스킬. 화면, 페이지, 컴포넌트, 선택 화면, 온보딩, 폼, 리스트, 버튼 배치, 문구 등 사용자가 눈으로 보게 될 UI를 만드는 모든 작업에서 사용한다. 토스 디자인 시스템(TDS)을 기준으로 한다. 사용자가 "디자인"이라는 말을 쓰지 않아도 화면을 만든다면 이 스킬을 먼저 읽는다.
---

# 모바일 UI 디자인 (앱인토스 · TDS 기준)

목표: "작동하는 화면"이 아니라 "한눈에 뭘 눌러야 할지 보이는 화면"을 만든다.
코드가 맞아도 눈에 안 들어오면 실패다.

## 최우선 규칙: 직접 스타일링하지 말고 TDS 컴포넌트를 쓴다

- 버튼, 리스트, 검색창, 상단 제목, 하단 고정 버튼, 토스트 같은 화면 요소는 **TDS 컴포넌트로 만든다.** 색·글자 크기·여백을 직접 정해서 비슷하게 흉내 내지 않는다.
- 색은 TDS 색상(`@toss/tds-colors`), 글자는 TDS 글자 스타일(`typography` 토큰)만 쓴다. 숫자(px, hex)를 직접 적지 않는다.
- TDS 컴포넌트는 기본 여백이 들어 있어서 gap 없이 붙여도 자연스럽다. 간격을 따로 더 주기 전에 컴포넌트의 여백 옵션(예: `ListRow`의 `verticalPadding`)부터 쓴다.
- 카드처럼 보이는 UI가 필요하면 먼저 `ListRow`로 만들 수 있는지 본다. (앱인토스 디자인 도구 문서의 권장)

### TDS에 없는 요소가 필요할 때

1. 아래 대응표와 [TDS Mobile 문서 목록](https://tossmini-docs.toss.im/tds-mobile/llms.txt)을 **다시 찾아본다.** 이름이 달라서 못 찾는 경우가 많다.
2. 그래도 없으면 그때만 직접 만든다. 이때도 **TDS 색상과 글자 스타일만** 쓰고, 다른 TDS 컴포넌트와 어울리게 만든다.
3. 직접 만든 곳은 사용자에게 "TDS에 없어서 직접 만들었어요"라고 알린다.

## 자주 쓰는 UI → TDS 컴포넌트 대응표

문서에서 이름을 확인한 것만 적었다. 사용법(props·예제)이 필요하면 `references/tds.md`를 읽는다.

| 만들려는 것 | TDS 컴포넌트 |
|---|---|
| 화면 맨 위 큰 제목·설명 | `Top` (`Top.TitleParagraph`, `Top.SubtitleParagraph`, `Top.RightButton`, `Top.LowerButton`) |
| 상단 내비게이션 바 | 앱인토스가 제공하는 내비게이션 바 (TDS Mobile 목록에는 없음 → [UI/UX 가이드](https://developers-apps-in-toss.toss.im/design/consumer-ux-guide.md)의 내비게이션 바 항목 확인) |
| 일반 버튼 | `Button` (`variant` fill·weak, `color` primary·dark·danger·light, `size`, `display`) |
| 화면 아래 고정 버튼 | `FixedBottomCTA` (버튼 2개: `FixedBottomCTA.Double`), 고정 안 할 때 `BottomCTA.Single` / `BottomCTA.Double` |
| 글자만 있는 버튼·링크 | `TextButton` (`variant` arrow·underline) |
| 아이콘만 있는 버튼 | `IconButton` |
| 리스트 한 줄, 선택 항목, 카드 | `ListRow` (+ `ListRow.Texts`, `ListRow.AssetIcon`, `ListRow.AssetImage`, `ListRow.AssetText`, `ListRow.IconButton`, `withArrow`) |
| 리스트 묶음 제목 | `ListHeader` (`ListHeader.TitleParagraph`, `ListHeader.RightArrow`, `ListHeader.DescriptionParagraph`) |
| 리스트 끝 "더 보기" | `ListFooter` |
| 검색창 | `SearchField` |
| 글자 입력 칸 | `TextField` (`TextField.Clearable`, `TextField.Password`, `TextField.Button`), 여러 줄은 `TextArea` |
| 여러 개 중 하나 고르기 (짧은 선택지) | `SegmentedControl` (`SegmentedControl.Item`) |
| 여러 개 고르기 | `Checkbox` (`Checkbox.Circle`) |
| 켜기/끄기 | `Switch` |
| 드롭다운 메뉴 | `Menu` (`Menu.Dropdown`, `Menu.DropdownItem`) |
| 탭 전환 | `Tab` (`Tab.Item`) |
| 토스트 (잠깐 뜨는 알림) | `useToast` 훅 (`Toast`는 overlay-extension으로 쓰는 걸 권장) |
| 바텀시트 | `useBottomSheet` 훅 / `BottomSheet` |
| 확인창·알림창 | `useDialog` 훅 (`openAlert`, `openConfirm`), `AlertDialog`, `ConfirmDialog` |
| 상태 표시 라벨 | `Badge` (`variant` fill·weak, `color` blue·teal·green·red·yellow·elephant) |
| 본문 글 | `Paragraph` (`Paragraph.Text`, `typography="t5"` 같은 토큰) |
| 구분선 | `Border` |
| 불러오는 중 | `Loader`, `Skeleton`, 리스트는 `ListRow.Loader` |
| 완료·오류 결과 화면 | `Result` (`Result.Button`) |
| 단계 진행 표시 | `ProgressBar`, `ProgressStepper`, `Stepper` |
| 접었다 펴는 Q&A | `BoardRow` |
| 왼쪽 이름·오른쪽 값 정보 | `TableRow` |
| 화면 아래 안내·주의 문구 | `BottomInfo` |
| 말풍선 도움말 | `Tooltip` |

## references/tds.md 를 읽을 때

- TDS를 처음 설치하거나 Provider를 설정할 때
- 대응표의 컴포넌트를 처음 쓰거나, props 이름·값이 기억나지 않을 때
- 색상·글자 스타일을 직접 써야 할 때 (TDS에 없는 요소)
- 그 파일에도 없으면 [TDS Mobile llms.txt](https://tossmini-docs.toss.im/tds-mobile/llms.txt)에서 해당 컴포넌트의 `llm.txt`를 읽는다. 추측해서 props를 쓰지 않는다.

## references/ux-principles.md 를 읽을 때

- 로그인·알림 동의 요청, 전면·리워드·배너 광고, 푸시 메시지 문구가 들어가는 화면을 만들 때
- 출시나 추천 미니앱 심사 전에 화면을 점검할 때
- 아래 체크리스트 항목의 원문과 출처를 확인해야 할 때

## 작업 순서 (매번 지킨다)

1. **화면의 할 일을 한 문장으로 쓴다.** 예: "사용자가 3초 안에 자기 지역을 누른다."
2. **주인공을 정한다.** 이 화면에서 가장 많이 눌릴 것 1개, 그다음 것 2~3개, 나머지. 이 세 단계가 크기·색·위치로 확실히 달라야 한다. (TDS에서는 `Button`의 fill/weak, `FixedBottomCTA`, `ListRow` 크기 등으로 구분한다)
3. **코드를 작성한다.** 위 대응표의 TDS 컴포넌트로 만든다. 직접 만든 스타일은 TDS에 정말 없을 때만.
4. **직접 눈으로 본다.** Playwright 등으로 스크린샷을 찍고 이미지를 열어 확인한다. 화면은 가로 375~390px 기준으로 본다.
   ```bash
   npx playwright screenshot --viewport-size=390,844 http://localhost:3000 shot.png
   ```
   스크린샷 도구를 쓸 수 없으면 사용자에게 스크린샷을 요청한다. 보지 않고 "완성했습니다"라고 말하지 않는다.
5. **아래 체크리스트로 스스로 비평한다.** 실패 항목을 고치고 4번부터 다시. 최소 1회는 반복한다.
6. 사용자에게 보여줄 때는 무엇을 왜 그렇게 정했는지 한두 줄로 설명한다.

## 핵심 원칙

**똑같이 생긴 버튼을 6개 넘게 나열하지 않는다.** 전부 같은 무게면 아무것도 눈에 안 들어온다. 자주 쓰는 순서로 정렬하고, 상위 항목은 더 크게 만들거나, 아이콘·짧은 설명 줄로 구별할 단서를 준다.

**선택지가 많으면 검색을 위로.** 선택지가 10개를 넘으면 `SearchField`를 목록 위에 둔다. 맨 아래에 두면 스크롤해야 발견된다.

**터치 영역은 충분히 크게.** TDS 컴포넌트 기본 크기를 줄이지 않는다. 주요 선택지는 `ListRow`나 큰 `Button`으로.

**눌렀을 때 반응이 보여야 한다.** `ListRow`는 `onClick`이 있으면 터치 효과가 생긴다. 직접 만든 요소에도 눌림 상태를 준다.

**빈 공간을 방치하지 않는다.** 화면 아래 절반이 비어 있으면 콘텐츠를 키우거나 배치를 바꾼다.

**화면에 개발용 텍스트를 남기지 않는다.** "⓪ ~먼저: ~고르기" 같은 단계 메모, 내부 용어, 영어 변수명이 보이면 지운다.

**앱인토스 다크패턴을 만들지 않는다.** (어기면 검수 반려)
- 들어오자마자, 또는 뒤로 가기를 눌렀을 때 화면을 막는 바텀시트(알림 동의 요청 포함)를 띄우지 않는다.
- 사용자가 거절하거나 나갈 수 있는 선택지를 항상 둔다.
- 예상하지 못한 순간에 전면 광고를 띄우지 않는다.
- CTA 버튼만 보고 다음에 무슨 일이 일어나는지 알 수 있게 쓴다. 화면 설명을 버튼에 그대로 반복하지 않는다.

**그래픽은 하나만, 의미 있게.** 아이콘은 24~40px, 아이콘·이모지를 두 개 이상 나란히 붙이지 않는다. 파티클·과한 그라데이션 같은 장식 효과는 쓰지 않는다.

## UX 라이팅 (앱인토스 UI/UX 가이드 요약)

- **해요체**로 쓴다. 모든 문구에.
- **능동형**으로 쓴다. `됐어요` → `했어요`. (서비스 종료·기간 만료, 사용자에게 미치는 영향, 정보 수집 안내처럼 안심시킬 때는 수동형 가능)
- **긍정형**으로 쓴다. `안 돼요, 없어요` → `~하면 할 수 있어요`. (정책상 쓸 수 없거나 일부 기능만 못 쓸 때는 부정형으로 분명하게, 이유와 함께)
- **과한 경어를 빼고 캐주얼하게.** `~시겠어요?`, `계시다`, `여쭈다`, `~께` 대신 `있다`, `확인하다`, `~에게`. (사용자 상황을 추정하거나 설문처럼 선의가 필요할 때는 `~시나요?` 가능)
- **명사+명사 나열을 풀어 쓴다.** 한자어는 동사로 풀어 쓴다.
- `되어요` → **`돼요`**로 통일한다.
- 다이얼로그 왼쪽 버튼은 **[닫기]**로 통일한다. `취소`는 하던 작업이 취소된다고 오해할 수 있어 쓰지 않는다.

## 자기 비평 체크리스트 (앱인토스 공개 기준)

스크린샷을 보고 하나씩 답한다. 하나라도 "아니오"면 고친다. 항목은 앱인토스 공개 문서에서 옮겼고, 원문과 출처 링크는 `references/ux-principles.md`에 있다.

**TDS** ([디자인 도구](https://developers-apps-in-toss.toss.im/design/prepare/design.md))
- [ ] TDS 컴포넌트를 쓸 수 있는데 직접 만든 곳은 없는가?
- [ ] 색·글자 크기를 숫자로 직접 적은 곳은 없는가? (TDS 색상·글자 스타일만 썼는가?)

**① 로그인·알림 동의** ([노출 기준](https://developers-apps-in-toss.toss.im/guide/exposure.md))
- [ ] 로그인하지 않은 상태로도 주요 기능을 써볼 수 있는가?
- [ ] 로그인·알림 동의창은 관련 기능을 선택한 뒤에 나오는가?
- [ ] 요청 화면만 보고 왜 필요한지 알 수 있는가?

**② 전면광고**
- [ ] 전면광고가 나오기 전에 명확한 광고 안내 표시(문구·아이콘)가 있는가?
- [ ] 광고를 한 번 본 뒤에는 추가 광고 없이 결과를 확인할 수 있는가?
- [ ] 추가 광고는 더 자세한 정보나 보상을 원할 때만 선택해서 볼 수 있는가?

**③ 화면 구성**
- [ ] 제목·설명·결과가 각각 어디에 있는지 바로 알아볼 수 있는가?
- [ ] 같은 기능의 버튼과 카드가 다른 화면에서도 같은 색과 모양인가?
- [ ] 샘플 문구나 임시 이미지가 남아 있지 않은가?
- [ ] 제목이나 결과보다 배경색과 장식이 먼저 눈에 띄지 않는가?
- [ ] 다른 앱의 구성과 디자인을 그대로 쓰지 않았는가?

**④ 할 일의 순서**
- [ ] 앱을 열자마자 뭘 해야 할지 바로 알 수 있는가?
- [ ] 각 화면에서 다음에 누를 버튼이나 입력할 곳이 바로 보이는가?
- [ ] 같은 형식의 정보를 여러 번 입력해야 하면 한 번에 입력하거나 불러올 수 있는가?
- [ ] 마지막 작업이 끝나면 완료됐다는 문구나 화면이 나오는가?

**⑤ 결과의 의미** (결과 화면이 있는 경우)
- [ ] 앱 이름·소개에 적힌 내용을 결과 화면에서 확인할 수 있는가?
- [ ] 결과가 무슨 뜻인지 알 수 있는가?
- [ ] 보여줄 내용이 없는 화면에서도 왜 비어 있는지 알 수 있는가?

**출시 검수 · 다크패턴** ([비게임 출시 가이드](https://developers-apps-in-toss.toss.im/checklist/app-nongame.md), [UI/UX 가이드](https://developers-apps-in-toss.toss.im/design/consumer-ux-guide.md))
- [ ] 진입하자마자, 또는 뒤로 가기·화면 전환 때 바텀시트(로그인·알림 동의 등)가 자동으로 뜨지 않는가?
- [ ] 모든 화면에서 나갈 수 있는 방법이 명확한가? (유도한 CTA 외의 선택지가 있는가?)
- [ ] CTA 버튼만 보고 다음에 무슨 일이 일어날지 예측할 수 있는가?
- [ ] 사용자가 예상할 수 없는 순간에 전면 광고가 뜨지 않는가? 광고를 콘텐츠처럼 위장하거나 버튼 바로 옆에 두지 않았는가?
- [ ] 앱인토스 내비게이션 바를 쓰고, 자체 뒤로가기 버튼과 겹쳐 보이지 않는가? 뒤로가기·닫기 버튼이 모든 화면에서 정상 동작하는가?
- [ ] 라이트 모드인가? 권한을 거절해도 나머지 기능이 정상 작동하는가?
- [ ] 문구가 해요체·능동형·긍정형이고, 다이얼로그 왼쪽 버튼은 [닫기]인가? 비속어·은어·과도한 유행어가 없는가?

## 예시: 지역 선택 화면

나쁜 예: 흰 배경에 연한 테두리 버튼 9개를 3×3으로 똑같이 나열, 검색창은 맨 아래, 아래 절반은 비어 있음, 버튼을 div와 직접 만든 CSS로 흉내 냄.

좋은 예 (TDS):
- `Top`으로 큰 제목 + 한 줄 설명 (`Top.TitleParagraph`, `Top.SubtitleParagraph`)
- 바로 아래 `SearchField` ("시·군 이름 검색")
- `ListHeader`로 "많이 찾는 지역" 묶음 제목
- 수도권은 맨 위 `ListRow` (`ListRow.Texts`로 "수도권 / 서울·경기·인천" 두 줄, `withArrow`), 나머지 주요 도시도 `ListRow`로 나열
- 위치 권한이 있다면 "현재 위치로 찾기"를 최상단에 제공
- 누르면 `ListRow` 터치 효과로 즉시 반응하고, 선택 후 다음 화면으로 자연스럽게 이동

## 문서 링크

- 앱인토스 문서 목록: https://developers-apps-in-toss.toss.im/llms.txt
- TDS 소개와 핵심 컴포넌트: https://developers-apps-in-toss.toss.im/design/components.md
- 디자인 도구(피그마 작업 기준): https://developers-apps-in-toss.toss.im/design/prepare/design.md
- UI/UX 가이드(브랜딩·다크패턴·UX 라이팅·그래픽): https://developers-apps-in-toss.toss.im/design/consumer-ux-guide.md
- TDS Mobile 문서: https://tossmini-docs.toss.im/tds-mobile/ (LLM용 목록: https://tossmini-docs.toss.im/tds-mobile/llms.txt)
- 추천 미니앱 UX 원칙(노출 기준): https://developers-apps-in-toss.toss.im/guide/exposure.md
- 비게임 출시 가이드(검수 체크리스트): https://developers-apps-in-toss.toss.im/checklist/app-nongame.md
- 인앱 광고(광고 유형·운영 정책): https://developers-apps-in-toss.toss.im/guide/monetization/in-app-ad.md
- 푸시알림(기능성 메시지 규칙): https://developers-apps-in-toss.toss.im/guide/marketing/smart-message.md
