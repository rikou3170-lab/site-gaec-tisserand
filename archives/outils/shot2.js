const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [w,h,n] of [[390,844,'m'],[1280,800,'d']]){const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('file:///home/claude/final/index.html');await p.evaluate(()=>{sessionStorage.setItem('majeur','1');localStorage.setItem('langue','fr')});await p.reload();await p.waitForTimeout(900);
await p.evaluate(()=>{const e=document.getElementById('ageYes');if(e){e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}))}});await p.waitForTimeout(500);
await p.screenshot({path:`/tmp/r-${n}-0.png`});
let i=1;for(const sel of ['#collection','.spirits','footer']){await p.evaluate(s=>{const e=document.querySelector(s);const sc=document.getElementById('site-scroll');e.scrollIntoView({block:'start'});window.scrollBy(0,-120);if(sc)sc.scrollBy(0,-120)},sel);await p.waitForTimeout(500);await p.screenshot({path:`/tmp/r-${n}-${i++}.png`});}
await p.close()}await b.close()})();
