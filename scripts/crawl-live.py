import concurrent.futures,json,re,time,urllib.request,urllib.error,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urljoin,urlsplit
BASE='https://www.curiouskaizer.com'
seed={BASE+'/',BASE+'/robots.txt',BASE+'/sitemap.xml',BASE+'/seo-audit-missing-page-20260930',BASE+'/analytics'}
seed.update(BASE+'/'+p.stem for p in Path('.').glob('*.html') if p.stem not in ['index','analytics','googledccfa22a0725d83d'])
seen={}; todo=seed
class Redirects(urllib.request.HTTPRedirectHandler):
 def __init__(self): self.chain=[]
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  self.chain.append({'status':code,'from':req.full_url,'to':newurl}); return super().redirect_request(req,fp,code,msg,headers,newurl)
def get(url):
 red=Redirects(); start=time.time()
 try:
  op=urllib.request.build_opener(red)
  try:r=op.open(urllib.request.Request(url,headers={'User-Agent':'CuriousKaizer-SEO-Audit/1.0'}),timeout=25)
  except urllib.error.HTTPError as e:r=e
  data=r.read().decode('utf-8','replace'); status=r.code; final=r.url; headers=dict(r.headers)
  links=[]
  for h in re.findall(r'href=[\"\x27]([^\"\x27]+)',data):
   u=urlsplit(urljoin(final,h))
   if u.hostname in ('www.curiouskaizer.com','curiouskaizer.com') and not u.query and not re.search(r'\.(css|js|png|webp|jpg|ico|pdf|xml|woff2?)$',u.path):links.append(BASE+(u.path.rstrip('/') or '/'))
  if '/sitemap' in url:
   try:links.extend(n.text for n in ET.fromstring(data).iter() if n.tag.endswith('}loc') and n.text.startswith(BASE) and '/images/' not in n.text)
   except:pass
  Path('/tmp/ck-live').mkdir(exist_ok=True)
  Path('/tmp/ck-live/'+(urlsplit(url).path.strip('/').replace('/','_') or 'index')+'.txt').write_text(data)
  return {'url':url,'status':status,'final':final,'redirects':red.chain,'ms':round((time.time()-start)*1000),'bytes':len(data),'headers':headers,'links':links,'title':re.findall(r'<title[^>]*>(.*?)</title>',data,re.S),'canonical':re.findall(r'rel="canonical"[^>]*href="([^"]+)',data),'h1_count':len(re.findall(r'<h1\b',data)),'robots':re.findall(r'name="robots"[^>]*content="([^"]+)',data)}
 except Exception as e:return {'url':url,'error':str(e),'links':[]}
while todo and len(seen)<200:
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
  for row in pool.map(get,sorted(todo)):
   seen[row['url']]=row
 todo={u for row in seen.values() for u in row['links'] if u not in seen}
Path('/tmp/ck-live-audit.json').write_text(json.dumps(list(seen.values()),indent=2))
print(json.dumps({'crawled':len(seen),'status_counts':{str(s):sum(r.get('status')==s for r in seen.values()) for s in set(r.get('status') for r in seen.values())},'errors':[r for r in seen.values() if r.get('error')],'non200':[(r['url'],r.get('status')) for r in seen.values() if r.get('status')!=200]},indent=2))
