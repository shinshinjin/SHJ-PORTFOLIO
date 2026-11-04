# SHJ-PORTFOLIO

신혁진의 게임·인터랙티브 클라이언트 개발자(Unreal/Unity) 포트폴리오 사이트.
순수 HTML/CSS/JS, 빌드 도구·프레임워크·npm 없음. GitHub Pages(`main` 브랜치 루트)로 배포.
배포 주소: https://shinshinjin.github.io/SHJ-PORTFOLIO/

## 구조
- `index.html`: 메인(프로젝트 목록 `#work`)
- `projects/*.html`: 프로젝트 상세 페이지 (파일명 = kebab-case 슬러그)
- `resume/index.html`: 이력서
- `404.html`: GitHub Pages 404 페이지
- `portfolio-pdf.html`: 프로젝트 상세 페이지 3개를 불러와 한 문서로 합친 뒤 인쇄(PDF 저장). 프로젝트를 추가하면 `data-sources`와 목차도 고친다.
- 인쇄/PDF 스타일은 `css/style.css` 끝의 `@media print`에 있다. 폰트는 Wanted Sans(jsDelivr CDN).
- 디자인 원칙: 대문자 라벨·번호 장식·섹션마다 등장 애니메이션을 쓰지 않는다. 움직임은 첫 화면 길찾기 SVG 하나만.
- `css/style.css`(공통), `css/responsive.css`(반응형), `js/main.js`(메뉴 토글, PDF 저장 버튼, 포트폴리오 PDF 합치기)
- `assets/images/`: 이미지 (`<프로젝트>-<내용>.webp|png|jpg` 명명)

## 로컬 확인
저장소 상위 폴더에서 `python -m http.server 8000` → http://localhost:8000/SHJ-PORTFOLIO/
(index.html을 파일로 직접 열면 절대경로가 깨지므로 반드시 서버로 확인)

## 반드시 지킬 규칙
- 내부 링크·리소스 경로는 항상 `/SHJ-PORTFOLIO/...` 절대경로로 쓴다.
  이유: GitHub Pages 하위 경로에서 서비스됨. 상대경로나 `/assets/...`는 배포 후 깨짐.
- `css/*.css`를 수정하면 모든 HTML(7개)의 `?v=` 숫자를 1 올린다. (현재 style.css?v=6, responsive.css?v=3)
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
- 프레임워크, 빌드 도구, npm 패키지, 외부 JS 라이브러리 추가 (필요하면 먼저 물어보기)
- `assets/images/` 원본 이미지 삭제·덮어쓰기
- 이력서·프로젝트 내용(경력, 날짜, 수치) 임의로 지어내기. 모르면 물어보기

## 작업 방식
- 답변과 사이트 문구는 한국어.
- 여러 파일을 바꾸는 작업은 계획을 먼저 보여주고 확인받기.
- 수정 후 데스크톱과 모바일(375px) 레이아웃을 모두 고려.
- 커밋 메시지는 영어 명령형 한 줄 (예: `Add KVERSE gameplay screenshots`).
