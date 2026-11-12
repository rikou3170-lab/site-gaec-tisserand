const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [n,w,h] of [['A4',210,297],['A3',297,420]]){
 const pxw=Math.round(w/25.4*96), pxh=Math.round(h/25.4*96); const scale=300/96;
 const p=await b.newPage({viewport:{width:pxw,height:pxh},deviceScaleFactor:scale});
 await p.goto(`file:///home/claude/affiche/v4-${n}.html`);await p.waitForTimeout(900);
 await p.screenshot({path:`Affiche-Rayon-Ferme-Tisserand-grenier-${n}.jpg`,type:'jpeg',quality:92,clip:{x:0,y:0,width:pxw,height:pxh}});
 await p.pdf({path:`Affiche-Rayon-Ferme-Tisserand-grenier-${n}.pdf`,width:`${w}mm`,height:`${h}mm`,printBackground:true,preferCSSPageSize:true});}
await b.close()})();
