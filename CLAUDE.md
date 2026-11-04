# SHJ-PORTFOLIO

신혁진의 게임·인터랙티브 클라이언트 개발자(Unreal/Unity) 포트폴리오 사이트.
순수 HTML/CSS/JS, 빌드 도구·프레임워크 없음. Cloudflare Workers 정적 에셋으로 배포(`wrangler.jsonc`, 업로드 제외 목록은 `.assetsignore`). npm은 배포 도구 wrangler에만 쓴다.
배포 주소: https://portfolio.shjj.workers.dev/

## 구조
- `index.html`: 메인(프로젝트 목록 `#work`)
- `projects/*.html`: 프로젝트 상세 페이지 (파일명 = kebab-case 슬러그)
- `resume/index.html`: 이력서
- `404.html`: 404 페이지 (`not_found_handling: "404-page"`)
- `portfolio-pdf.html`: 프로젝트 상세 페이지 3개를 불러와 한 문서로 합친 뒤 인쇄(PDF 저장). 프로젝트를 추가하면 `data-sources`와 목차도 고친다.
- 인쇄/PDF 스타일은 `css/style.css` 끝의 `@media print`에 있다. 폰트는 Wanted Sans(jsDelivr CDN).
- 디자인 원칙: 토스식 정돈(연회색 바탕 #f2f4f6 + 흰 판, 파랑 하나) + 게임 에디터 구조(첫 화면 NavMesh 뷰포트, 프로젝트 상세의 인스펙터 패널 `.inspector`). 둥글기는 위계별 변수(`--r-sheet` 28, `--r-card` 20, `--r-btn` 14). 흰 글자 버튼 배경은 대비 때문에 `--blue-ink`, `--blue`는 그래픽·포커스용. 대문자 라벨·번호 장식·섹션 등장 애니메이션 금지, 자동 움직임은 첫 화면 길찾기 SVG 하나만. 모바일 첫 화면 버튼은 세로로 쌓는다(폰트 교체 시 줄바꿈으로 레이아웃이 밀리는 것 방지).
- `css/style.css`(공통), `css/responsive.css`(반응형), `js/main.js`(메뉴 토글, PDF 저장 버튼, 포트폴리오 PDF 합치기)
- `assets/images/`: 이미지 (`<프로젝트>-<내용>.webp|png|jpg` 명명)

## 로컬 확인
저장소 폴더에서 `npx wrangler dev` → http://localhost:8787/
배포: `npx wrangler deploy`
(index.html을 파일로 직접 열면 절대경로가 깨지므로 반드시 서버로 확인)

## 반드시 지킬 규칙
- 내부 링크·리소스 경로는 항상 `/`로 시작하는 루트 절대경로(`/assets/...`, `/projects/...`)로 쓴다.
  이유: 프로젝트 상세·이력서 등 하위 폴더 페이지에서 상대경로가 깨짐.
- `css/*.css`를 수정하면 모든 HTML(7개)의 `?v=` 숫자를 1 올린다. (현재 style.css?v=8, responsive.css?v=4)
  이유: 브라우저 캐시 때문에 변경이 반영되지 않음.
- 헤더(`.site-header`)·네비·푸터(`.footer`)는 모든 페이지에 복사되어 있다.
  하나를 고치면 index, 404, resume, projects/* 전부 동일하게 고친다.
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
