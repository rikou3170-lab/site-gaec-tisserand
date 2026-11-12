const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const names={p_local:'Affiche-Rayon-Ferme-Tisserand-producteur-local',p_voyage:'Affiche-Rayon-Ferme-Tisserand-pays-du-kirsch'};
for(const src of Object.keys(names)) for(const [n,w,h] of [['A4',210,297],['A3',297,420]]){
 const pxw=Math.round(w/25.4*96), pxh=Math.round(h/25.4*96);
 const p=await b.newPage({viewport:{width:pxw,height:pxh},deviceScaleFactor:300/96});
 await p.goto(`file:///home/claude/affiche/${src}-${n}.html`);await p.waitForTimeout(900);
 await p.screenshot({path:`${names[src]}-${n}.jpg`,type:'jpeg',quality:92,clip:{x:0,y:0,width:pxw,height:pxh}});
 await p.pdf({path:`${names[src]}-${n}.pdf`,width:`${w}mm`,height:`${h}mm`,printBackground:true,preferCSSPageSize:true});await p.close();}
await b.close()})();
