# SHJ-PORTFOLIO

신혁진의 게임·인터랙티브 클라이언트 개발자(Unreal/Unity) 포트폴리오 사이트.
순수 HTML/CSS/JS, 빌드 도구·프레임워크 없음. Cloudflare Workers 정적 에셋으로 배포(`wrangler.jsonc`, 업로드 제외 목록은 `.assetsignore`). npm은 배포 도구 wrangler에만 쓴다.
배포 주소: https://portfolio.shjj.workers.dev/

## 구조
- `index.html`: 메인(프로젝트 목록 `#work`, `.work-list` > `.work-row` 한 줄에 연도·제목·설명·태그·대표 화면)
- `projects/*.html`: 프로젝트 상세 페이지 (파일명 = kebab-case 슬러그). 4개: vdigm-tih, puhahaworld(개인, 저장소 비공개라 GitHub 링크 없음), its-my-first-love, the-kyungil
- `resume/index.html`: 이력서
- `404.html`: 404 페이지 (`not_found_handling: "404-page"`)
- `portfolio-pdf.html`: 프로젝트 상세 페이지 4개를 불러와 한 문서로 합친 뒤 인쇄(PDF 저장). 프로젝트를 추가하면 `data-sources`와 목차도 고친다.
- 인쇄/PDF 스타일은 `css/style.css` 끝의 `@media print`에 있다. 폰트는 Wanted Sans(jsDelivr CDN).
- 디자인 원칙(2026-11-06 개편, PRODUCT.md 참고): 정석 개발자 포트폴리오를 Linear·Vercel·Rauno 수준으로. 흰 바탕 + 잉크(--ink) + 강조색 하나(--accent는 그래픽·포커스·선택, 글자는 --accent-ink). 카드·판 대신 얇은 선(--line)으로 나누고, 작업물(스크린샷)이 주인공. 둥글기 --r 14 / --r-sm 9, 알약 모양은 작은 버튼만. 대문자 라벨·제목 위 꼬리표(eyebrow)·번호 장식 금지.
- 모션 원칙: 이징은 --ease-out / --ease-io 두 개만. UI 반응 160~240ms, 누르면 scale(.97), hover는 @media (hover:hover) and (pointer:fine) 안에서만. 정해진 순간은 셋뿐: 첫 화면 등장(.rise, --i로 순서), 길찾기 SVG, 목록 이미지 → 상세 첫 이미지 페이지 전환(@view-transition + view-transition-name:cover, JS가 누른 줄의 .work-thumb에 붙임). 섹션마다 등장 애니메이션 넣지 않음. prefers-reduced-motion이면 이동 없이 투명도만.
- 기술 설명용 요소(2026-11-08): `.status`(개발 중 표시), `.log`(업데이트 기록·메인 "최근 작업"), `.diagram`(토큰 색만 쓰는 인라인 SVG 구조도), `.data`(측정 표, 숫자는 `td.n` 오른쪽 정렬·바뀐 값 `td.d`), `.code`(파일 경로 머리 + 실제 코드 몇 줄), `.facts-row`(날짜 붙은 수치 4칸). 푸하하월드는 개발 중이라 업데이트할 때마다 상세 페이지 `#log`·정보표 날짜·수치, 메인 "최근 작업" 3줄, 이력서 항목을 같이 고친다. 수치에는 기준 날짜를 붙인다.
- `css/style.css`(공통), `css/responsive.css`(반응형), `js/main.js`(메뉴 토글, PDF 저장 버튼, 포트폴리오 PDF 합치기)
- `assets/images/`: 이미지 (`<프로젝트>-<내용>.webp|png|jpg` 명명)

## 로컬 확인
저장소 폴더에서 `npx wrangler dev` → http://localhost:8787/
배포: `npx wrangler deploy`
(index.html을 파일로 직접 열면 절대경로가 깨지므로 반드시 서버로 확인)

## 반드시 지킬 규칙
- 내부 링크·리소스 경로는 항상 `/`로 시작하는 루트 절대경로(`/assets/...`, `/projects/...`)로 쓴다.
  이유: 프로젝트 상세·이력서 등 하위 폴더 페이지에서 상대경로가 깨짐.
- `css/*.css`를 수정하면 모든 HTML(8개)의 `?v=` 숫자를 1 올린다. (현재 style.css?v=12, responsive.css?v=8)
  이유: 브라우저 캐시 때문에 변경이 반영되지 않음.
- 헤더(`.site-header`)·네비·푸터(`.footer`)는 모든 페이지에 복사되어 있다.
  하나를 고치면 index, 404, resume, portfolio-pdf, projects/* 전부 동일하게 고친다.
- HTML/CSS는 한 줄로 압축된 형식이다. 수정할 때 파일 전체를 다시 포맷하지 말고 필요한 부분만 바꾼다.
- 새 페이지는 기존 `projects/` 파일을 복제해서 만들고, `<title>`, `meta description`, `og:title`, `og:description`, `og:url`, `canonical`을 그 페이지에 맞게 모두 바꾼다.
- 페이지에는 webp를 쓴다. PNG/JPG 원본은 그대로 두고 같은 이름의 `.webp` 사본을 만들어 연결한다(스크린샷 품질 80, 코드 캡처 90). `sitemap.xml`에 새 페이지를 추가한다.
- `<img>`에는 한국어 `alt`, `width`/`height`, `decoding="async"`를 넣고, 첫 화면 밖 이미지는 `loading="lazy"`.
- 접근성 요소(`.skip` 링크, `aria-label`, `aria-expanded`, `:focus-visible`)는 지우지 않는다.
- 색상·폭은 `:root` CSS 변수(`--ink`, `--blue`, `--paper` 등)를 쓴다. 새 색상 하드코딩 금지.

## 하지 말 것
- 프레임워크, 빌드 도구, (wrangler 외) npm 패키지, 외부 JS 라이브러리 추가 (필요하면 먼저 물어보기)
- `assets/images/` 원본 이미지 삭제·덮어쓰기
- 이력서·프로젝트 내용(경력, 날짜, 수치) 임의로 지어내기. 모르면 물어보기

## 작업 방식
- 답변과 사이트 문구는 한국어.
- 여러 파일을 바꾸는 작업은 계획을 먼저 보여주고 확인받기.
- 수정 후 데스크톱과 모바일(375px) 레이아웃을 모두 고려.
- 커밋 메시지는 영어 명령형 한 줄 (예: `Add KVERSE gameplay screenshots`).
