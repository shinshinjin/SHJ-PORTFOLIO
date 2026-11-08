# Design

정석 개발자 포트폴리오를 Linear · Vercel · Rauno 수준으로(PRODUCT.md의 브랜드 결정). 작업물이 주인공이고, 화면의 구조는 카드가 아니라 얇은 선과 타이포그래피가 만든다.

## Tokens (`css/style.css` `:root`)
| 역할 | 토큰 | 값 |
|---|---|---|
| 바탕 | `--paper` | #fff |
| 움푹한 바탕(그림 자리·코드) | `--sunk` | #f5f6f7 |
| 잉크 / 보조 잉크 | `--ink` / `--ink-2` | #0d0f12 / #30343b |
| 보조 글자 (4.5:1 이상) | `--muted` | #5d636c |
| 큰 글자·구분점만 | `--faint` | #8b919a |
| 선 / 진한 선 | `--line` / `--line-2` | #e9eaed / #d8dbe0 |
| 강조 (그래픽·포커스·선택) | `--accent` | #3a5bff |
| 강조 글자 | `--accent-ink` | #2843d4 |
| 둥글기 | `--r` / `--r-sm` | 8px / 5px (알약 999px 없음, 모든 모서리는 이 둘) |
| 이징 | `--ease-out` / `--ease-io` | cubic-bezier(.23,1,.32,1) / (.77,0,.175,1) |
| 글꼴 | `--font` | Wanted Sans Variable (CDN) |

## Type
- 제목 h1 96px까지(clamp), 굵기 700, 자간 -0.04em / h2 38px, 650, -0.035em / 본문 17px, 1.72.
- 숫자(연도·기간)는 `tabular-nums`. 제목은 `text-wrap: balance`, 문단은 `pretty`.
- 대문자 라벨, 제목 위 꼬리표, 번호 장식 없음.

## Structure
- 섹션은 선으로 나눈다: 목록의 시작은 `--ink` 1px, 항목 사이는 `--line`.
- 첫 화면: 왼쪽에 이름 + 한 줄 소개 + 행동(검은 버튼 1개, 나머지는 밑줄 링크), 오른쪽 아래에 사실 3줄 정보표(`.hero-facts`, 상세의 `.inspector`와 같은 모양). 그림 없음. 첫 화면 안에 프로젝트 첫 줄의 대표 화면이 들어오게 여백을 잡는다.
- 프로젝트 목록 `.work-row`: 연도 · 제목(44px) · 설명 · 태그(· 구분) · 대표 화면(16:10). 모바일은 대표 화면이 위.
- 상세: 제목 + 정보표(`.inspector`, 위 선 잉크) → 대표 화면(`.project-cover`) → 섹션(왼쪽 sticky 제목, 오른쪽 본문 740px).
- 버튼: `.btn` 검은 바탕 / `.btn.ghost` 테두리. 연락은 `--r-sm` 모서리의 테두리 링크(첫 번째가 검은색).

## Motion
- UI 반응 160–240ms, 누르면 `scale(.97)`, hover 효과는 `(hover:hover) and (pointer:fine)`에서만.
- 정해진 순간 둘: 첫 화면 등장(`.rise`, `--i` × 60ms, 위로 8px → 0, 600ms, 블러 없음), 목록 이미지 → 상세 대표 화면 페이지 전환(`@view-transition`, 이름 `cover`, 460ms `--ease-io`).
- 목록 hover(포인터 기기만): 이미지 1.02배, 다른 줄 55% 투명. 제목은 움직이지 않는다.
- `prefers-reduced-motion`: 페이지 전환 끔, 이동 없이 투명도만.

## Browser surfaces
선택 색(강조 20%), 포커스 링 2px 강조, 얇은 스크롤바(`--line-2`), 밑줄 간격 0.22em, 캐럿 강조색.

## Print
`@media print`: 헤더·푸터·버튼 숨김, 카드·배경 없음, 링크 주소 표시. 이력서·포트폴리오 PDF는 이 스타일로 저장.
