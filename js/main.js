document.documentElement.classList.add('js');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

// 모바일 메뉴
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','메뉴 열기')};
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
  });
  nav.addEventListener('click',e=>{if(e.target.closest('a'))close()});
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape'||!nav.classList.contains('open'))return;
    const inside=nav.contains(document.activeElement);
    close();
    if(inside)toggle.focus(); // 닫힌 메뉴 안에 포커스가 남지 않도록 버튼으로 되돌림
  });
}

// 헤더: 맨 위에서 벗어나면 아래 선을 보여 줌
const header=document.querySelector('.site-header');
if(header){
  const mark=()=>header.classList.toggle('scrolled',scrollY>8);
  mark();addEventListener('scroll',mark,{passive:true});
}

// 프로젝트 목록: 누른 줄의 대표 화면에 전환 이름(cover)을 붙여 상세 페이지 첫 이미지로 이어지게 함
const list=document.querySelector('.work-list');
if(list){
  const clear=()=>list.querySelectorAll('.work-thumb').forEach(t=>t.style.viewTransitionName='');
  list.addEventListener('click',e=>{const row=e.target.closest('.work-row');if(!row)return;clear();row.querySelector('.work-thumb').style.viewTransitionName='cover'});
  addEventListener('pageshow',clear); // 뒤로 오면(bfcache) 지움
}

// 첫 화면 길찾기 그림: 동작 줄이기 설정이면 완성된 상태로 바로 보여줌
const pathfind=document.querySelector('.pathfind');
if(pathfind&&reduceMotion&&pathfind.setCurrentTime){pathfind.setCurrentTime(10);pathfind.pauseAnimations()}

// PDF 저장: 인쇄 창을 열고, 파일 이름이 되는 문서 제목을 잠시 바꿈
const printPage=title=>{
  const original=document.title;
  if(title)document.title=title;
  window.addEventListener('afterprint',()=>{document.title=original},{once:true});
  window.print();
};
document.querySelectorAll('[data-print]').forEach(btn=>btn.addEventListener('click',()=>printPage(btn.dataset.printTitle)));

// 포트폴리오 PDF 페이지: 프로젝트 상세 페이지를 불러와 한 문서로 합침
const pdfRoot=document.getElementById('pdf-projects');
if(pdfRoot){
  const btn=document.querySelector('.pdf-toolbar [data-print]');
  const status=document.querySelector('.pdf-status');
  const sources=pdfRoot.dataset.sources.split(',');
  Promise.all(sources.map(url=>fetch(url).then(r=>{if(!r.ok)throw new Error(url);return r.text()})))
    .then(pages=>{
      pages.forEach(html=>{
        const main=new DOMParser().parseFromString(html,'text/html').querySelector('main');
        main.querySelectorAll('.back').forEach(el=>el.remove());
        main.querySelectorAll('img').forEach(img=>img.loading='eager');
        const article=document.createElement('article');
        article.className='pdf-project';
        article.append(...main.childNodes);
        pdfRoot.append(article);
      });
      return Promise.all([...pdfRoot.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));
    })
    .then(()=>{
      status.remove();
      btn.disabled=false;
      btn.textContent='PDF로 저장';
      if(new URLSearchParams(location.search).has('print'))printPage(btn.dataset.printTitle);
    })
    .catch(()=>{status.textContent='프로젝트를 불러오지 못했습니다. 페이지를 새로고침해 주세요.';btn.textContent='불러오기 실패'});
}

// 이력서 페이지를 ?print=1로 열면(메인의 '이력서 PDF 저장') 폰트가 준비된 뒤 바로 인쇄 창을 엶
if(!pdfRoot&&new URLSearchParams(location.search).has('print')){
  const btn=document.querySelector('[data-print]');
  if(btn)window.addEventListener('load',()=>document.fonts.ready.then(()=>printPage(btn.dataset.printTitle)),{once:true});
}
