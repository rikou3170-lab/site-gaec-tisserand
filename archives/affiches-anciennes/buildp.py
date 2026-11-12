import qrcode, qrcode.image.svg, re, math
url="https://rikou3170-lab.github.io/site-gaec-tisserand/"
q=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q,border=0,image_factory=qrcode.image.svg.SvgPathImage); q.add_data(url); q.make(fit=True)
svg=re.sub(r'<\?xml[^>]*\?>','',q.make_image().to_string(encoding='unicode')).replace('fill="#000000"','fill="#1f1a1a"')
fr='<svg viewBox="0 0 3 2"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>'
uk='<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#012169"/><path d="M0,0 60,40M60,0 0,40" stroke="#fff" stroke-width="8"/><path d="M0,0 60,40M60,0 0,40" stroke="#C8102E" stroke-width="3"/><path d="M30,0V40M0,20H60" stroke="#fff" stroke-width="12"/><path d="M30,0V40M0,20H60" stroke="#C8102E" stroke-width="7"/></svg>'
de='<svg viewBox="0 0 5 3"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#DD0000"/><rect y="2" width="5" height="1" fill="#FFCE00"/></svg>'
rays=''.join(f'<path d="M0 0 L{140*math.cos(math.radians(a-3)):.1f} {140*math.sin(math.radians(a-3)):.1f} L{140*math.cos(math.radians(a+3)):.1f} {140*math.sin(math.radians(a+3)):.1f}Z"/>' for a in range(180,361,12))
for src in ['p_local','p_voyage']:
    t=open(src+'.html',encoding='utf-8').read().replace('__QR__',svg).replace('__FLAGS__',fr+uk+de).replace('__RAYS__',rays)
    for name,W,H,U in [('A4',210,297,1),('A3',297,420,297/210)]:
        open(f'{src}-{name}.html','w',encoding='utf-8').write(t.replace('__W__',str(W)).replace('__H__',str(H)).replace('__U__',f'{U:.5f}'))
