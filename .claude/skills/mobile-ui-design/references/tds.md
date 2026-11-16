# TDS Mobile 사용법 (앱인토스)

SKILL.md 대응표의 컴포넌트를 실제로 쓸 때 읽는 파일이다. 아래 내용은 2026-11-07에 공식 문서에서 확인한 것만 옮겼다.
여기에 없는 props나 컴포넌트는 추측하지 말고 해당 문서의 `llm.txt`를 읽는다.

- 컴포넌트 목록(LLM용): https://tossmini-docs.toss.im/tds-mobile/llms.txt
- 각 컴포넌트: `https://tossmini-docs.toss.im/tds-mobile/<경로>/llm.txt` (경로는 목록에 있음)
- 사람이 보는 문서: https://tossmini-docs.toss.im/tds-mobile/

## 1. 설치와 설정

> ⚠️ 이 프로젝트 상태 (2026-11-07): TDS가 아직 설치되어 있지 않다. 화면은 Tailwind로 만들어져 있고 React는 **19.2.8**이다.
> 문서의 설치 명령은 `react@^18`을 요구하므로, 설치 전에 React 19 호환 여부를 문서·커뮤니티에서 확인하고 사용자에게 먼저 물어본다.

```sh
npm install @toss/tds-mobile @toss/tds-mobile-ait @emotion/react@^11 react@^18 react-dom@^18
```

앱 최상위를 `TDSMobileAITProvider`로 감싼다.

```jsx
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';

function App({ Component, pageProps }) {
  return (
    <TDSMobileAITProvider>
      <Component {...pageProps} />
    </TDSMobileAITProvider>
  );
}
```

컴포넌트는 `@toss/tds-mobile`에서 가져온다.

```js
import { Button } from '@toss/tds-mobile';
```

## 2. 색상과 글자 (TDS에 없는 요소를 직접 만들 때만)

**색상**: `@toss/tds-colors`의 `colors` 객체를 쓴다. hex를 직접 적지 않는다.

```jsx
import { colors } from '@toss/tds-colors';

<div style={{ backgroundColor: colors.blue500 }} />
```

문서 예제에는 `adaptive.grey800`, `adaptive.blue500` 같은 `adaptive` 색도 나온다. 어느 패키지에서 가져오는지는 이 문서들에서 확인하지 못했으니, 쓰기 전에 [Colors 문서](https://tossmini-docs.toss.im/tds-mobile/foundation/colors/llm.txt)나 사람이 보는 문서에서 확인한다.

**글자**: `typography` 토큰을 쓴다 (문서 예제에 `t4`, `t5`, `t6`, `t7`이 나옴). 전체 토큰 표는 [Typography 문서](https://tossmini-docs.toss.im/tds-mobile/foundation/typography/llm.txt)에 있다.
- 글자 크기·줄 높이를 **px로 하드코딩하지 않는다.** 사용자가 기기에서 "더 큰 텍스트"를 켜면 토큰 값이 비율대로 바뀌어야 하기 때문이다.
- 폰트는 토스 앱 안에서 Toss Product Sans가 자동으로 적용된다. 따로 설치하지 않는다.
- 다크 모드는 아직 지원 예정이라 라이트 모드 기준으로 만든다.

## 3. 컴포넌트별 사용법

### Top (화면 맨 위 제목 영역)
```tsx
<Top
  title={<Top.TitleParagraph size={28}>동해물과 백두산이</Top.TitleParagraph>}
  right={<Top.RightButton>선택하기</Top.RightButton>}
/>
<Top
  title={<Top.TitleParagraph>동해물과 백두산이</Top.TitleParagraph>}
  lower={<Top.LowerButton>왜 사용할 수 없나요?</Top.LowerButton>}
/>
```
- `upperGap`, `lowerGap`: 상하 여백
- `title`: `Top.TitleParagraph`(정보만), `Top.TitleTextButton`(눌리는 제목), `Top.TitleSelector`(화살표가 있는 선택형 제목)
- `subtitleTop` / `subtitleBottom`: `Top.SubtitleParagraph`
- `upper` / `right`의 에셋은 `Top.UpperAssetContent` / `Top.RightAssetContent`로 감싼다
- 하단 버튼 2개: `Top.LowerCTA` + `Top.LowerCTAButton` (`display="block"`)

### Button
```tsx
<Button size="large" color="primary" variant="fill">확인</Button>
<Button color="dark" variant="weak">나중에 하기</Button>
<Button display="full" loading>저장 중</Button>
```
- `size`: `small` | `medium` | `large` | `xlarge`
- `variant`: `fill`(주요 행동) | `weak`(보조 행동)
- `color`: `primary` | `dark` | `danger` | `light`
- `display`: `inline` | `block` | `full`
- `loading`, `disabled`

### FixedBottomCTA / BottomCTA (화면 아래 버튼)
- `FixedBottomCTA` = `fixed`가 켜진 `BottomCTA.Single`. 버튼 2개는 `FixedBottomCTA.Double`.
```tsx
<BottomCTA.Single topAccessory={<div>topAccessory</div>} bottomAccessory={<div>bottomAccessory</div>}>
  여기는 설명이 들어갑니다
</BottomCTA.Single>
<BottomCTA.Double
  leftButton={<CTAButton color="dark" variant="weak">버튼 둘</CTAButton>}
  rightButton={<CTAButton>버튼 하나</CTAButton>}
/>
```
- `fixedAboveKeyboard`: 키보드 위에 붙이기 (Single만)
- `showAfterDelay={{ animation: 'fade' | 'scale' | 'slide', delay: 1 }}`: 늦게 나타나기 (초 단위)
- `hideOnScroll`, `hideOnScrollDistanceThreshold`: 스크롤할 때 숨기기
- `background="none"`: 배경 없애기
- `hasSafeAreaPadding`: 하단 안전 영역만큼 여백 (`--toss-safe-area-bottom` 사용)

### TextButton / IconButton
```tsx
<TextButton size="medium" variant="arrow">텍스트 버튼</TextButton>
```
- `TextButton` `size`: `xsmall` ~ `xxlarge`, `variant`: `arrow` | `underline` | `clear`(기본)
- `IconButton`: 아이콘만 있는 버튼. `variant`로 형태 변경 ([문서](https://tossmini-docs.toss.im/tds-mobile/components/icon-button/llm.txt))

### ListRow (리스트 한 줄, 선택 항목, 카드 대신)
- 영역: `left`, `contents`, `right`
- `contents`에는 주로 `ListRow.Texts` (`type`으로 줄 수와 스타일 선택)
  - 왼쪽 정렬: `1RowTypeA`~`1RowTypeC`, `2RowTypeA`~`2RowTypeF`, `3RowTypeA`~`3RowTypeF`
  - 오른쪽 정렬(날짜·가격·상태): `Right1RowTypeA`~`Right1RowTypeE` 등
- `left`에는 `ListRow.AssetIcon`, `ListRow.AssetImage`, `ListRow.AssetText`, `ListRow.AssetLottie`
- `right`에는 `ListRow.Texts`, `ListRow.IconButton`, 또는 `Switch`, `Badge`, `Button` 조합
- 주요 props: `border`(`indented` | `none`), `verticalPadding`(`small` | `medium` | `large` | `xlarge`), `horizontalPadding`(`small` | `medium`), `disabled`, `disabledStyle`, `withArrow`, `withTouchEffect`, `onClick`(있으면 터치 효과가 자동으로 생김)
- 불러오는 중: `ListRow.Loader`
- 문서 예제는 여러 `ListRow`를 `<List>`로 감싼다.
- 자세한 영역 구성: [ListRow 영역 구성하기](https://tossmini-docs.toss.im/tds-mobile/components/ListRow/list-row-components/llm.txt)

### ListHeader (리스트 묶음 제목)
```tsx
<ListHeader
  title={<ListHeader.TitleParagraph typography="t7" fontWeight="bold">제목</ListHeader.TitleParagraph>}
  right={<ListHeader.RightArrow typography="t6">더 보기</ListHeader.RightArrow>}
  description={<ListHeader.DescriptionParagraph>보조설명 내용</ListHeader.DescriptionParagraph>}
/>
```
- 제목: `ListHeader.TitleParagraph` | `ListHeader.TitleTextButton` | `ListHeader.TitleSelector`
- 오른쪽: `ListHeader.RightText`, `ListHeader.RightArrow`
- `descriptionPosition="bottom"`: 설명을 제목 아래로

### SearchField (검색창)
```tsx
<SearchField placeholder="시·군 이름 검색" onDeleteClick={() => {}} />
```
- `fixed`: 상단 고정, `takeSpace`(기본 true): 고정될 때 자리 유지
- 지우기 버튼이 기본으로 있고, `onDeleteClick`으로 지울 때 동작 추가

### TextField / TextArea (입력)
- `label`, `placeholder`, `help`(안내 문구)
- 변형: `TextField.Clearable`, `TextField.Password`, `TextField.Button`
- 여러 줄: `TextArea`, 칸 나눠 입력: `SplitTextField`

### SegmentedControl / Checkbox / Switch / Menu / Tab (선택)
```tsx
<SegmentedControl value={value} onChange={setValue}>
  <SegmentedControl.Item value="fade">fade</SegmentedControl.Item>
  <SegmentedControl.Item value="scale">scale</SegmentedControl.Item>
</SegmentedControl>
```
- `SegmentedControl`: 하나만 고르기 (Radio와 같은 역할)
- `Checkbox`: 여러 개 고르기 (`Checkbox.Circle` 등)
- `Switch`: 켜기/끄기 (`checked`)
- `Menu`: 드롭다운 (`Menu.Trigger`, `Menu.Dropdown`, `Menu.DropdownItem`, `Menu.DropdownCheckItem`, `Menu.Header`)
- `Tab`: 콘텐츠 전환 (`Tab.Item`)

### 토스트 / 바텀시트 / 다이얼로그 (훅으로 쓰기)
```tsx
const toast = useToast();
toast.openToast('메시지를 전송했어요');

const { open, close } = useBottomSheet();
open({ header: '기본 바텀시트예요', children: <Text>내용</Text>, onClose: () => close() });
// 버튼이 있는 시트: openOneButtonSheet, openTwoButtonSheet

const { openAlert, openConfirm } = useDialog();
openAlert({ title: '알려드릴게요', description: '작업이 완료됐어요.', alertButton: '확인하기' });
openConfirm({ title: '삭제할까요?', description: '이 작업은 되돌릴 수 없어요.', confirmButton: '삭제하기', cancelButton: '닫기' });
```
- `Toast` 컴포넌트를 직접 쓸 수도 있지만 문서는 overlay-extension(훅)을 권장한다. 위치는 `position`(`top` | `bottom`).
- ⚠️ 문서 예제는 `cancelButton: '취소'`이지만, 앱인토스 UX 라이팅 가이드에 따라 다이얼로그 왼쪽 버튼은 **`닫기`**로 쓴다.
- ⚠️ 앱 진입 직후나 뒤로 가기 때 바텀시트를 띄우면 다크패턴으로 반려된다.
- 훅 공통 개념: [Overlay Extension 이해하기](https://tossmini-docs.toss.im/tds-mobile/hooks/OverlayExtension/check-first/llm.txt)

### Badge
```tsx
<Badge size="small" color="blue" variant="weak">여유</Badge>
```
- `size`: `xsmall` | `small` | `medium` | `large`
- `variant`: `fill` | `weak`
- `color`: `blue` | `teal` | `green` | `red` | `yellow` | `elephant`

### Paragraph (본문 글)
```tsx
<Paragraph typography="t5">
  <Paragraph.Text>첫 줄</Paragraph.Text>
  <Paragraph.Badge color="blue" variant="fill">뱃지</Paragraph.Badge>
  <Paragraph.Link as="a" href="https://toss.im" type="underline">링크</Paragraph.Link>
</Paragraph>
```
- 하위 요소: `Paragraph.Text`, `Paragraph.Icon`, `Paragraph.Badge`, `Paragraph.Link`(`type`: `underline` | `none`)

### 그 밖의 컴포넌트 (문서 링크)
| 컴포넌트 | 쓰임 | 문서 |
|---|---|---|
| `Border` | 구분선 | components/border |
| `Loader`, `Skeleton` | 불러오는 중 | components/loader, components/skeleton |
| `Result` (`Result.Button`) | 완료·오류 결과 화면 | components/result |
| `ProgressBar`, `ProgressStepper`, `Stepper` | 진행 단계 | components/progress-bar 등 |
| `BoardRow` | 접었다 펴는 Q&A | components/board-row |
| `TableRow` | 왼쪽 이름·오른쪽 값 | components/table-row |
| `BottomInfo` | 화면 아래 안내·주의 문구 | components/bottom-info |
| `Tooltip` | 말풍선 도움말 | components/tooltip |
| `ListFooter` | 리스트 끝 더 보기 | components/list-footer |
| `GridList` | 그리드 배치 | components/grid-list |
| `NumericSpinner`, `Slider` | 숫자 고르기 | components/numeric-spinner, components/slider |
| `AgreementV4` | 동의 화면 (V3는 쓰지 않음) | components/Agreement/v4 |
| `Asset` (`Frame` 기반) | 아이콘·이미지·로티 | components/Asset/check-first |

문서 주소: `https://tossmini-docs.toss.im/tds-mobile/<위 경로>/llm.txt`

## 4. 앱인토스 디자인 기준 (디자인 도구 문서에서)

- 모든 화면 최상단에는 내비게이션 컴포넌트를 쓴다.
- 화면은 가로 375px 기준으로 만든다. (Keypad처럼 반응형이 아닌 컴포넌트가 있음)
- 화면 위는 `Top`, 그 아래는 `ListRow`로 대부분의 화면을 구성할 수 있다.
- 대부분의 TDS 컴포넌트에는 기본 여백이 있어 gap 없이 붙여도 된다.
- 컴포넌트를 깨서 일부만 쓰는 건 신중하게. 깨면 코드를 따로 써야 한다.
- 원하는 컴포넌트가 없으면 [개발자 커뮤니티](https://techchat-apps-in-toss.toss.im/)에 요청할 수 있다. 직접 만들 때는 다른 TDS 컴포넌트와 어울리게.
