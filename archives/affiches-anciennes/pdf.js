const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [n,w,h] of [['A4',210,297],['A3',297,420]]){const p=await b.newPage();await p.goto(`file:///home/claude/affiche/affiche-${n}.html`);await p.waitForTimeout(800);
await p.pdf({path:`Affiche-Ferme-Tisserand-${n}.pdf`,width:`${w}mm`,height:`${h}mm`,printBackground:true,preferCSSPageSize:true});}
await b.close()})();
