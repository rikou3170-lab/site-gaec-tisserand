const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///home/claude/final/index.html');await p.evaluate(()=>{sessionStorage.setItem('majeur','1');localStorage.setItem('langue','fr')});await p.reload();await p.waitForTimeout(900);
await p.evaluate(()=>{const e=document.getElementById('ageYes');if(e){e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}))}});
await p.evaluate(()=>{const sc=document.getElementById('site-scroll');sc.scrollTop=0;sc.scrollTop=document.querySelector('.product-stage').getBoundingClientRect().top-150});
let i=0;for(const k of ['cerise','mirabelle','poire']){await p.click(`[data-product=${k}]`);await p.waitForTimeout(300);await p.evaluate(()=>{const sc=document.getElementById('site-scroll');sc.scrollTop+=document.querySelector('.product-stage').getBoundingClientRect().top-135});await p.waitForTimeout(400);await p.screenshot({path:`/tmp/p-${i++}.png`});}
await b.close()})();
