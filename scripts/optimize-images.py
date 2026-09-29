#!/usr/bin/env python3
"""Create delivery variants; keep original brand/project images intact."""
from pathlib import Path
from PIL import Image
import re,json
root=Path(__file__).resolve().parent.parent
out=root/'images/optimized';out.mkdir(exist_ok=True)
manifest={}
for p in (root/'images').glob('*'):
 if p.suffix.lower() not in ('.png','.jpg','.jpeg','.webp') or p.stat().st_size<100000:continue
 with Image.open(p) as im:
  w,h=im.size
  sizes=sorted(set([min(w,640),min(w,960),min(w,1600),w]))
  variants=[]
  for width in sizes:
   target=out/f'{p.stem}-{width}.webp'; resized=im.copy();resized.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);resized.save(target,'WEBP',quality=82,method=6)
   variants.append({'src':target.relative_to(root).as_posix(),'width':resized.width,'height':resized.height,'bytes':target.stat().st_size})
  manifest[p.relative_to(root).as_posix()]={'width':w,'height':h,'originalBytes':p.stat().st_size,'variants':variants}
for p in root.glob('*.html'):
 text=p.read_text()
 def img(m):
  tag=m[0];src=re.search(r'\bsrc=["\x27]([^"\x27]+)',tag)
  if not src:return tag
  key=src[1].lstrip('/').split('?')[0]
  info=manifest.get(key)
  local=root/key
  if not info and local.is_file():
   try:
    with Image.open(local) as im:info={'width':im.width,'height':im.height}
   except:return tag
  if not info:return tag
  if 'width=' not in tag:tag=tag.replace('<img','<img width="'+str(info['width'])+'" height="'+str(info['height'])+'"',1)
  if 'variants' in info and 'srcset=' not in tag:
   best=next((v for v in info['variants'] if v['width']>=min(1600,info['width'])),info['variants'][-1])
   tag=tag.replace(src[0],'src="/'+best['src']) if src[0].startswith('src="') else tag.replace(src[1],'/'+best['src'])
   tag=tag.replace('<img','<img srcset="'+', '.join('/'+v['src']+' '+str(v['width'])+'w' for v in info['variants'])+'" sizes="(max-width: 760px) 100vw, 60vw"',1)
  if 'decoding=' not in tag:tag=tag.replace('<img','<img decoding="async"',1)
  return tag
 text=re.sub(r'<img\b[^>]*>',img,text,flags=re.I)
 p.write_text(text)
(root/'reports/seo/image-delivery.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({'images':len(manifest),'originalBytes':sum(x['originalBytes'] for x in manifest.values()),'largestVariantBytes':sum(x['variants'][-1]['bytes'] for x in manifest.values())}))
