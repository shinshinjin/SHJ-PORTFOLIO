# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
국내 게임 회사의 채용 담당자와 클라이언트 팀 리드(Unreal / Unity 클라이언트 개발 포지션). 지원서·이력서 링크로 들어와 짧은 시간 안에 "출시해 본 경험이 있는지, 어떤 문제를 직접 풀었는지"를 확인한다. 데스크톱이 주, 모바일로 링크를 여는 경우도 있다.

## Product Purpose
신혁진(Unreal / Unity 클라이언트 개발자)의 프로젝트·경력·이력서를 보여 주고, 서류 단계에서 면접으로 이어지게 하는 개인 포트폴리오 사이트. 성공 = 방문자가 프로젝트 상세를 열어 본인이 맡은 부분과 해결한 문제를 이해하고, 이력서/포트폴리오 PDF를 저장하거나 메일로 연락한다.

## Positioning
- 회사에서 실제로 출시한 Unreal 앱(브이다임 VDIGM-TIH, Google Play 출시, AI 음성 립싱크 문제 해결)이 있다.
- Unity AR 게임의 실시간 길찾기·미니맵, 공포게임의 맵·조명·동선·적 AI 이동처럼 "공간과 움직임"을 다루는 클라이언트 작업이 많다.
- 실내건축 전공(SketchUp으로 공간을 만드는 데 익숙함)을 맵·동선 설계로 이어 온 배경.
- 개인 프로젝트 푸하하월드: 서버 권한 구조의 실시간 멀티플레이 웹게임(Cloudflare Workers + Durable Objects + WebSocket, Three.js), 테스트·CI 자동 배포까지 직접 운영.

## Operating Context
- 지원서·이력서에 링크로 첨부. 방문자는 첫 화면과 프로젝트 목록에서 몇십 초 안에 판단한다.
- 사이트에서 이력서 PDF, 프로젝트 3개를 합친 포트폴리오 PDF를 저장할 수 있다(`portfolio-pdf.html`, 인쇄 스타일).
- Cloudflare Workers 정적 에셋으로 배포 (https://portfolio.shjj.workers.dev/).

## Capabilities and Constraints
- 순수 HTML/CSS/JS. 빌드 도구·프레임워크·npm·외부 JS 라이브러리 없음(2026-11-06 다시 확인: 모션도 CSS + 순수 JS로).
- 내부 경로는 `/`로 시작하는 루트 절대경로, CSS를 바꾸면 모든 HTML의 `?v=`를 올림, 헤더·푸터는 모든 페이지에 복사돼 있음(저장소 CLAUDE.md).
- 이미지는 webp(원본 PNG/JPG 유지), 한국어 alt·크기·lazy.
- 인쇄/PDF 저장이 깨지면 안 됨.
- 폰트: Wanted Sans(jsDelivr CDN).

## Brand Commitments
- 이름 표기: 신혁진 (Shin Hyukjin). 사이트 문구는 한국어.
- 직함: Unreal / Unity 클라이언트 개발자.
- 문장은 짧고 담백하게, 맡은 일과 결과를 사실대로(과장·수식어 없이). 기존 사이트 문구가 이 톤이다.
- 디자인 방향(2026-11-06 사용자 선택): 카테고리 표준인 "정석 개발자 포트폴리오"를 제대로 한다. 기준 완성도 = Linear · Vercel · Rauno Freiberg 사이트(정밀한 타이포그래피, 작업물이 주인공, 짧고 매끄러운 모션). 이 결과에 장난스러운 장식이나 콘셉트 의상을 몰래 섞지 않는다.

## Evidence on Hand
- 프로젝트 상세 3개: `projects/vdigm-tih.html`(브이다임, 2023–2026), `projects/its-my-first-love.html`(Unity AR, 2022, 8인 팀), `projects/the-kyungil.html`(Unity 공포게임, 2022, 2인 팀).
- 경력: 브이다임 2023.09–2026.05(Unreal 클라이언트, AI 캐릭터 앱 Google Play 출시), 이디홀딩스 2023.04–08(Unity 메타버스 프로토타입).
- 스크린샷: `assets/images/*`(webp + 원본).
- 푸하하월드: 배포 주소 https://puhahaworld.shjj.workers.dev, 저장소 https://github.com/shinshinjin/puhahaworld, 개발 기록 `docs/devlog/`. 수치는 기록된 것만 쓴다(예: 테스트 개수는 시점마다 다름).
- 없는 것(지어내지 말 것): 추천사, 수상, 다운로드 수·매출 같은 지표, 회사 로고 사용 허가.

## Product Principles
1. 30초 안에 "출시 경험 + 직접 푼 문제"가 보여야 한다.
2. 작업물이 주인공이다. 장식보다 실제 화면·영상·코드가 먼저.
3. 맡은 범위를 정확히(팀 크기, 내 역할, 함께 한 부분).
4. 공간·움직임을 다루는 개발자라는 점이 사이트 경험 자체로도 느껴지게.

## Accessibility & Inclusion
- 키보드 탐색(`.skip` 링크, `:focus-visible`, 메뉴 `aria-expanded`) 유지.
- `prefers-reduced-motion`이면 움직임을 줄인다.
- 모바일 375px에서 레이아웃이 무너지지 않게.
