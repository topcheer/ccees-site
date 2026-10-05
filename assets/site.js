/* CCEES interactions */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

/* nav scroll state + progress */
addEventListener('scroll',()=>{
  const y=scrollY;
  $('.nav')?.classList.toggle('sc',y>40);
  const p=$('.prog');if(p){const h=document.documentElement.scrollHeight-innerHeight;p.style.width=(h>0?(y/h*100):0)+'%'}
},{passive:true});

/* burger */
$$('.burger').forEach(b=>b.addEventListener('click',()=>{
  b.classList.toggle('x');$('.menu')?.classList.toggle('open');
}));

/* close menu on nav (mobile) */
$$('.menu a').forEach(a=>a.addEventListener('click',()=>{
  $('.burger')?.classList.remove('x');$('.menu')?.classList.remove('open');
}));

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}
}),{threshold:0,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach(el=>io.observe(el));

/* counters */
const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;cio.unobserve(e.target);
  const el=e.target,end=+el.dataset.n,suf=el.dataset.suf||'';
  const t0=performance.now(),D=1600;
  (function f(t){const k=Math.min((t-t0)/D,1),ease=1-Math.pow(1-k,3);
    el.textContent=Math.round(end*ease)+suf;
    if(k<1)requestAnimationFrame(f)})(t0);
}),{threshold:.5});
$$('[data-n]').forEach(el=>cio.observe(el));
