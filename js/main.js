document.documentElement.classList.add('js');
document.querySelectorAll('img[data-remote-image]').forEach(img=>{
  const hide=()=>{img.hidden=true};
  img.addEventListener('error',hide,{once:true});
  if(img.complete&&img.naturalWidth===0)hide();
});
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
  });
  nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
}
const targets=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
  targets.forEach(el=>observer.observe(el));
}else targets.forEach(el=>el.classList.add('in-view'));
