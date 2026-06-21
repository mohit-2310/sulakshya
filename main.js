/* ===== CONFIG ===== */
/* To receive inquiries straight to your inbox, paste a free Web3Forms access key below
   (get one at web3forms.com — takes 30 seconds). Leave blank to use the email-app fallback. */
const WEB3FORMS_KEY = "f8284f25-7817-49d2-b06d-a1b4d061ec81";

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const yrEl=document.getElementById('yr'); if(yrEl) yrEl.textContent = new Date().getFullYear();

/* ===== loader ===== */
window.addEventListener('load', ()=>{
  const l = document.getElementById('loader');
  if(!l){ startHero(); return; }
  setTimeout(()=>l.classList.add('tealize'), 700);
  setTimeout(()=>{ l.classList.add('done'); startHero(); }, reduce?100:1700);
});

/* ===== smooth nav (no external nav) ===== */
function go(hash){
  const el = document.querySelector(hash);
  if(el) el.scrollIntoView({behavior: reduce?'auto':'smooth', block:'start'});
}
document.querySelectorAll('[data-link]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){ e.preventDefault(); go(href); document.getElementById('navLinks').classList.remove('open'); }
  });
});

/* ===== nav state + progress ===== */
const nav = document.getElementById('nav'), progress = document.getElementById('progress');
function onScroll(){
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y>40);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h>0? y/h*100:0)+'%';
}
window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

/* ===== mobile menu ===== */
const menuBtn = document.getElementById('menuBtn'), navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', ()=>navLinks.classList.toggle('open'));

/* ===== reveal + kinetic ===== */
const io = new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.16});
document.querySelectorAll('.reveal,.kin,.fade,.heritage,.ana-img').forEach(el=>io.observe(el));

/* ===== count up ===== */
function countUp(el){
  const target=parseFloat(el.dataset.count), suffix=el.dataset.suffix||'', dur=reduce?0:1300, start=performance.now();
  function tick(now){const p=Math.min((now-start)/dur,1);el.firstChild.nodeValue=Math.round((1-Math.pow(1-p,3))*target)+suffix;if(p<1)requestAnimationFrame(tick);}
  requestAnimationFrame(tick);
}
const cio=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){countUp(e.target);cio.unobserve(e.target);}})},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

/* ===== donut rings ===== */
const dio=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){const pct=+e.target.dataset.pct,c=+e.target.dataset.circ;e.target.style.strokeDasharray=(c*pct/100)+' '+c;dio.unobserve(e.target);}})},{threshold:.5});
document.querySelectorAll('.ring-fg').forEach(el=>dio.observe(el));

/* ===== anatomy chips ===== */
const parts=[['01','Fan'],['02','Cooler'],['03','Controller'],['04','Oil Filter'],['05','Seamless Pipe'],['06','Air Filter'],['07','Intake Valve'],['08','Compressor Air-End'],['09','Motor'],['10','Control Panel'],['11','VFD Drive']];
const anaList=document.getElementById('anaList');
if(anaList){parts.forEach(([n,t],i)=>{const c=document.createElement('div');c.className='ana-chip reveal d'+((i%4)+1);c.innerHTML=`<div class="n">${n}</div><div class="t">${t}</div>`;anaList.appendChild(c);io.observe(c);});}

/* ===== spec data ===== */
const specs=[
['SM SC 5','5','3.7',26,21,17,null,'62'],['SM SC 7','7.5','5.5',32,26,22,null,'62'],
['SM SC 10','10','7.5',45,39,33,28,'62'],['SM SC 15','15','11',67,61,54,47,'62'],
['SM SC 20','20','15',86,80,75,57,'62'],['SM SC 25','25','18.5',113,108,93,75,'68'],
['SM SC 30','30','22',134,128,114,99,'68'],['SM SC 40','40','30',186,178,159,134,'72'],
['SM SC 50','50','37',238,224,198,175,'72'],['SM SC 60','60','45',284,272,252,205,'72'],
['SM SC 75','75','55',372,360,318,300,'75'],['SM SC 100','100','75',480,459,410,354,'75'],
['SM SC 125','125','90',584,548,516,435,'75'],['SM SC 150','150','110',760,724,618,575,'78'],
['SM SC 175','175','132',928,884,778,725,'78'],['SM SC 200','200','160',1024,985,869,762,'79'],
];
const MAX=1024,bars={b7:3,b8:4,b10:5,b13:6},table=document.getElementById('specTable');
function renderRows(bar){
  table.querySelectorAll('.spec-row:not(.head)').forEach(r=>r.remove());
  const idx=bars[bar];
  specs.forEach(s=>{
    const v=s[idx],row=document.createElement('div');row.className='spec-row';
    const pct=v!=null?v/MAX*100:0;
    row.innerHTML=`<div class="model">${s[0]}</div><div class="cell">${s[1]}</div><div class="cell kw">${s[2]}</div><div class="flow-cell">${v!=null?`<div class="flow-bar"><i></i></div><div class="flow-val">${v}</div><div class="flow-unit">CFM</div>`:`<div class="flow-bar"></div><div class="flow-val" style="color:rgba(255,255,255,.35)">–</div><div class="flow-unit"></div>`}</div><div class="cell" style="text-align:right">${s[7]}±2</div>`;
    table.appendChild(row);
    if(v!=null){const f=row.querySelector('.flow-bar i');requestAnimationFrame(()=>setTimeout(()=>f.style.width=pct+'%',40));}
  });
}
if(table){renderRows('b7');
document.querySelectorAll('.spec-tab').forEach(t=>t.addEventListener('click',()=>{document.querySelector('.spec-tab.active').classList.remove('active');t.classList.add('active');renderRows(t.dataset.bar);}));}

/* ===== industries ===== */
const inds=[['Textile','assets/ind-textile.jpg'],['Power','assets/ind-power.jpg'],['Ceramic','assets/ind-ceramic.jpg'],['Paper','assets/ind-paper.jpg'],['Pharma','assets/ind-pharma.jpg'],['Water Treatment','assets/ind-water.jpg'],['Plastic','assets/ind-plastic.jpg'],['Chemical','assets/ind-chemical.jpg'],['Forging','assets/ind-forging.jpg'],['Sortex','assets/ind-sortex.jpg'],['Cement','assets/ind-cement.jpg'],['Food','assets/ind-food.jpg']];
const indGrid=document.getElementById('indGrid');
if(indGrid){inds.forEach(([name,src],i)=>{const d=(i%4)+1;const c=document.createElement('div');c.className='ind-card reveal d'+d;c.innerHTML=`<img src="${src}" alt="${name} industry" loading="lazy"><div class="name">${name}<span>Clean air supplied</span></div>`;indGrid.appendChild(c);io.observe(c);});}

/* ===== horizontal showcase ===== */
const showcase=document.querySelector('.showcase'),track=document.getElementById('track'),scRail=document.getElementById('scRail'),scCount=document.getElementById('scCount');
let panels=track?track.children.length:0, pinned=false;
function setupShowcase(){
  if(!showcase||!track) return;
  pinned = window.innerWidth>860 && !reduce;
  if(pinned){
    showcase.classList.remove('stacked');
    const overflow=(panels-1)*window.innerWidth;
    showcase.style.height=(window.innerHeight+overflow)+'px';
  }else{
    showcase.classList.add('stacked');
    showcase.style.height='auto';
    track.style.transform='none';
  }
}
function showcaseScroll(){
  if(!pinned||!showcase||!track) return;
  const rect=showcase.getBoundingClientRect();
  const total=showcase.offsetHeight-window.innerHeight;
  let p=Math.min(Math.max(-rect.top/total,0),1);
  const overflow=(panels-1)*window.innerWidth;
  track.style.transform=`translate3d(${-p*overflow}px,0,0)`;
  scRail.style.width=(p*100)+'%';
  scCount.textContent=String(Math.min(panels,Math.round(p*(panels-1))+1)).padStart(2,'0')+' / '+String(panels).padStart(2,'0');
}
setupShowcase();
window.addEventListener('resize',()=>{setupShowcase();showcaseScroll();});

/* ===== hero parallax ===== */
const heroUnit=document.getElementById('heroUnit');
function heroScroll(){
  if(reduce||!heroUnit) return;
  const y=window.scrollY;
  if(y<window.innerHeight){
    heroUnit.style.transform=`translateY(${y*0.18}px) scale(${1+y*0.00012})`;
    heroUnit.style.opacity=String(Math.max(1-y/(window.innerHeight*0.9),0));
  }
}

/* unified rAF scroll */
let ticking=false;
function frame(){ showcaseScroll(); heroScroll(); ticking=false; }
window.addEventListener('scroll',()=>{ if(!ticking){requestAnimationFrame(frame);ticking=true;} },{passive:true});
frame();

/* ===== magnetic CTA ===== */
const mag=document.getElementById('magnet');
if(mag && !reduce){
  mag.addEventListener('mousemove',e=>{const r=mag.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;mag.style.transform=`translate(${x*0.18}px,${y*0.3}px)`;});
  mag.addEventListener('mouseleave',()=>mag.style.transform='');
}

/* ===== hero airflow canvas ===== */
let heroStarted=false;
function startHero(){
  if(heroStarted||reduce) return; heroStarted=true;
  const c=document.getElementById('airflow'),ctx=c.getContext('2d');let w,h,ps,raf;
  const DPR=Math.min(devicePixelRatio||1,2);
  function size(){w=c.width=c.offsetWidth*DPR;h=c.height=c.offsetHeight*DPR;}
  function spawn(left){return{x:left?-20:Math.random()*w,y:Math.random()*h,vx:(.4+Math.random()*1.1)*DPR,vy:(Math.random()-.5)*.3*DPR,len:(20+Math.random()*72)*DPR,a:.08+Math.random()*.34,wob:Math.random()*6.28};}
  function init(){size();ps=Array.from({length:Math.min(90,Math.floor(w/24))},()=>spawn());}
  function fr(){ctx.clearRect(0,0,w,h);for(const p of ps){p.wob+=.02;p.x+=p.vx;p.y+=p.vy+Math.sin(p.wob)*.4*DPR;const g=ctx.createLinearGradient(p.x-p.len,p.y,p.x,p.y);g.addColorStop(0,'rgba(95,230,218,0)');g.addColorStop(1,`rgba(95,230,218,${p.a})`);ctx.strokeStyle=g;ctx.lineWidth=1.1*DPR;ctx.beginPath();ctx.moveTo(p.x-p.len,p.y);ctx.lineTo(p.x,p.y);ctx.stroke();if(p.x-p.len>w)Object.assign(p,spawn(true));}raf=requestAnimationFrame(fr);}
  init();fr();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);init();fr();});
}
if(reduce) startHero();

/* ===== form ===== */
const form=document.getElementById('inqForm'),success=document.getElementById('formSuccess');
function setErr(name,on){form.querySelector(`[name="${name}"]`).closest('.field').classList.toggle('err',on);}
if(form){
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const f=new FormData(form);
  let ok=true;
  if(!f.get('name').trim()){setErr('name',true);ok=false;}else setErr('name',false);
  if(!f.get('phone').trim()){setErr('phone',true);ok=false;}else setErr('phone',false);
  const em=f.get('email').trim();
  if(!em||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){setErr('email',true);ok=false;}else setErr('email',false);
  if(!ok){form.querySelector('.field.err input').focus();return;}

  const data={name:f.get('name'),company:f.get('company')||'-',phone:f.get('phone'),email:em,product:f.get('product'),pressure:f.get('pressure'),message:f.get('message')||'-'};
  const btn=form.querySelector('button[type=submit]');btn.textContent='Sending…';

  let delivered=false;
  if(WEB3FORMS_KEY){
    try{
      const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:WEB3FORMS_KEY,subject:`Quote request — ${data.product} (${data.name})`,from_name:'Sulakshya Website',...data})});
      delivered=(await r.json()).success;
    }catch(_){}
  }
  if(!delivered){
    const body=`New inquiry from the website\n----------------------------------------\nName: ${data.name}\nCompany: ${data.company}\nPhone: ${data.phone}\nEmail: ${data.email}\nProduct interest: ${data.product}\nWorking pressure: ${data.pressure}\n\nRequirement:\n${data.message}`;
    const a=document.createElement('a');
    a.href=`mailto:sulakshya.airtech@gmail.com?subject=${encodeURIComponent('Quote request — '+data.product+' ('+data.name+')')}&body=${encodeURIComponent(body)}`;
    a.click();
  }
  form.style.display='none';success.classList.add('show');
});
document.getElementById('resetForm').addEventListener('click',()=>{form.reset();form.style.display='';success.classList.remove('show');form.querySelector('button[type=submit]').innerHTML='Send inquiry <span class="arr">→</span>';});
}

/* ===== FAQ accordion (product pages) ===== */
document.querySelectorAll('.faq-item').forEach(item=>{
  const q=item.querySelector('.faq-q'), a=item.querySelector('.faq-a');
  if(!q||!a) return;
  q.addEventListener('click',()=>{
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;});
    if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
  });
});