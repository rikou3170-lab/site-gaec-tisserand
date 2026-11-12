import qrcode, qrcode.image.svg, re
url="https://rikou3170-lab.github.io/site-gaec-tisserand/"
q=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q,border=0,image_factory=qrcode.image.svg.SvgPathImage); q.add_data(url); q.make(fit=True)
svg=re.sub(r'<\?xml[^>]*\?>','',q.make_image().to_string(encoding='unicode')).replace('fill="#000000"','fill="#2e1418"')
t=open('v2.html',encoding='utf-8').read().replace('__QR__',svg)
for name,W,H,U in [('A4',210,297,1),('A3',297,420,297/210)]:
    open(f'v2-{name}.html','w',encoding='utf-8').write(t.replace('__W__',str(W)).replace('__H__',str(H)).replace('__U__',f'{U:.5f}'))
