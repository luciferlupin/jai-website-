#!/usr/bin/env python3
"""Build reviewed static content and a canonical-only sitemap. No network access."""
from pathlib import Path
from html import escape
import json,re,hashlib,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parent.parent
BASE='https://www.curiouskaizer.com'
E=lambda s:escape(str(s),quote=True)
def meta(value, limit=158):
    """Trim at a word boundary while preserving a readable SERP description."""
    value=' '.join(value.split())
    if len(value)<=limit:return value
    return value[:limit-1].rsplit(' ',1)[0].rstrip(' ,;:-')+'.'
records=json.loads((ROOT/'data/seo-content.json').read_text())
names={x['slug']:x['title'] for x in records}
names.update({'services':'All services','portfolio':'Selected work','pricing':'Published packages','contact':'Discuss your project','crm-product':'CuriousCRM product','hanboro-watches-website-case-study':'HANBORO storefront case study','website-designing-company-in-delhi':'Website design in Delhi','ecommerce-website-development-delhi':'Ecommerce development','website-redesign-services-delhi':'Website redesign','website-design-cost-calculator':'Website cost calculator','industries':'Industry solutions','guides':'Planning guides','markets':'International project planning'})
def label(slug):return names.get(slug,slug.replace('-',' ').capitalize())
def links(slugs):return ''.join('<li><a href="/'+E(s)+'">'+E(label(s))+'</a></li>' for s in slugs)
def schema(slug,title,desc,kind):
 url=BASE+'/'+slug
 org={'@type':'Organization','@id':BASE+'/#organization','name':'Curious Kaizer','url':BASE+'/','logo':BASE+'/images/logo-icon.jpg'}
 page={'@type':'WebPage','@id':url+'#webpage','url':url,'name':title,'description':desc,'isPartOf':{'@id':BASE+'/#website'},'inLanguage':'en'}
 graph=[org,{'@type':'WebSite','@id':BASE+'/#website','url':BASE+'/','name':'Curious Kaizer','publisher':{'@id':org['@id']}},page,{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':BASE+'/'},{'@type':'ListItem','position':2,'name':title,'item':url}]}]
 if kind=='service':graph.append({'@type':'Service','name':title,'url':url,'description':desc,'provider':{'@id':org['@id']}})
 return json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False).replace('<','\\u003c')
def shell(slug,title,desc,intro,body,related,kind='guide',indexable=True):
    canonical=BASE+'/'+slug
    desc=meta(desc)
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(title)} | Curious Kaizer</title><meta name="description" content="{E(desc)}">
<meta name="robots" content="{'index, follow, max-image-preview:large' if indexable else 'noindex, follow'}">
<link rel="canonical" href="{canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="Curious Kaizer"><meta property="og:title" content="{E(title)} | Curious Kaizer"><meta property="og:description" content="{E(desc)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{BASE}/images/curiouskaizer.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{E(title)}"><meta name="twitter:description" content="{E(desc)}"><meta name="twitter:image" content="{BASE}/images/curiouskaizer.png"><link rel="icon" href="/favicon.ico">
<link rel="stylesheet" href="/css/seo-pages.css?v=20260930"><link rel="stylesheet" href="/css/privacy.css?v=20260930">
<script type="application/ld+json">{schema(slug,title,desc,kind)}</script>
<script src="/js/analytics-tracker.js?v=20260930" defer></script><script src="/js/seo-tools.js?v=20260930" defer></script></head>
<body><a class="ck-skip" href="#main-content">Skip to content</a><nav class="ck-nav" aria-label="Main"><div><a class="ck-brand" href="/">Curious Kaizer</a><div class="ck-links"><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/industries">Industries</a><a href="/guides">Guides</a><a href="/markets">Markets</a><a href="/contact">Get in touch</a></div></div></nav>
<header class="ck-hero"><div class="ck-wrap"><nav class="ck-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">{E(title)}</span></nav><div class="ck-eyebrow">Curious Kaizer · {E(kind)}</div><h1>{E(title)}</h1><p class="ck-lead">{E(intro)}</p><div class="ck-actions"><a class="ck-button primary" href="/contact">Discuss your project</a><a class="ck-button" href="/portfolio">Explore selected work</a></div></div></header>
<main id="main-content"><div class="ck-wrap ck-layout"><article class="ck-copy">{body}<div class="ck-share"><button type="button" data-share="native">Share this page</button><button type="button" data-share="copy">Copy link</button><span id="share-status" role="status"></span></div></article><aside class="ck-aside"><h2>Explore the next step</h2><ul>{links(related)}</ul><p>Discuss scope, integrations and delivery requirements before requesting a quote.</p><a href="/contact">Send a project brief</a><label class="ck-region">Market planning<select id="ck-region"><option value="">Choose a market</option><option value="/website-designing-company-in-delhi">India</option><option value="/website-development-dubai">UAE</option><option value="/website-development-usa">United States</option><option value="/website-development-uk">United Kingdom</option><option value="/markets">European countries / other</option></select></label><p><small>Market selection is manual. No location lookup or automatic redirect.</small></p></aside></div></main><footer class="ck-footer"><p>Curious Kaizer · Remote website and software development</p><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy &amp; cookies</a><a href="/terms">Terms</a><a href="/sitemap.xml">Sitemap</a></footer></body></html>'''
quality=[]
seen=set()
for p in records:
 text=' '.join(s['body'] for s in p['sections']); fingerprint=hashlib.sha256(text.encode()).hexdigest()
 checks={'editorialReview':p.get('editorialReview') is True,'distinctSections':len({s['body'] for s in p['sections']})>=4,'substantiveCopy':len((text+' '+p['intro']).split())>=220,'uniqueBody':fingerprint not in seen,'relatedLinks':len(p['related'])>=3,'workingTargets':all((ROOT/(s+'.html')).exists() or s in names for s in p['related'])}
 seen.add(fingerprint);good=all(checks.values())
 body=''.join('<section><h2>'+E(s['heading'])+'</h2><p>'+E(s['body'])+'</p></section>' for s in p['sections'])
 (ROOT/(p['slug']+'.html')).write_text(shell(p['slug'],p['title'],p['description'],p['intro'],body,p['related'],p['kind'],good))
 quality.append({'url':'/'+p['slug'],'indexable':good,'checks':checks,'note':'Editorial review is mandatory. Word count alone never approves a page.'})
for slug,title,intro,kind in [('industries','Industry Solutions','Plan software around the records, decisions and customer journeys of your industry. These pages describe scoping considerations and link to relevant services; portfolio examples do not imply results that have not been measured.','industry'),('guides','Website and Software Planning Guides','Practical guides for preparing a project brief, comparing scope and evaluating what a website, store or software system needs to deliver.','guide'),('markets','International Website Project Planning','Curious Kaizer delivers remotely from India. Select the market you are planning for to review audience, collaboration and integration requirements without implying a local office.','market')]:
 selected=[x for x in records if x['kind']==kind]
 body='<section><h2>Explore '+kind+' planning</h2><div class="ck-cards">'+''.join('<a class="ck-card" href="/'+x['slug']+'"><strong>'+E(x['title'])+'</strong><p>'+E(x['description'])+'</p></a>' for x in selected)+'</div></section>'
 if slug=='markets':body+='''<section><h2>India</h2><p><a href="/website-designing-company-in-delhi">Delhi and India website services</a> cover the existing local offer. Use <a href="/website-development-cost-india">the India cost guide</a> to prepare a scope.</p></section><section><h2>European markets need separate briefs</h2><p>For Germany, plan German content review, support language and approved business disclosures. For France, identify French-language ownership, catalog terminology and service communication. For the Netherlands, validate whether Dutch or English matches the actual audience and confirm merchant payment requirements. These are planning questions, not claims of local offices, local customers or legal compliance.</p><p>Publish a country or language page only after demand, delivery capability, original local content and editorial ownership are established. Translation needs a fluent reviewer. Do not replicate one generic Europe page across country names.</p></section>'''
 if slug=='guides':body+='<section><h2>Planning tools</h2><p><a href="/project-planner">Create a requirements brief and evaluate an automation scenario</a>. Inputs remain in your browser.</p></section>'
 (ROOT/(slug+'.html')).write_text(shell(slug,title,intro,intro,body,['services','portfolio','contact'],kind))
# Rebuild sitemap from actual HTML; omit uncertain lastmod rather than refreshing every date.
ns='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',ns);root=ET.Element('{'+ns+'}urlset')
excluded={'404.html','analytics.html','googledccfa22a0725d83d.html'}
for f in sorted(ROOT.glob('*.html')):
 s=f.read_text()
 if f.name in excluded or re.search(r'<meta[^>]*name=["\x27]robots["\x27][^>]*content=["\x27][^"\x27]*noindex',s,re.I):continue
 path='/' if f.name=='index.html' else '/'+f.stem
 canonical=re.search(r'<link[^>]*rel=["\x27]canonical["\x27][^>]*href=["\x27]([^"\x27]+)',s,re.I)
 if not canonical or canonical[1]!=BASE+path:continue
 url=ET.SubElement(root,'{'+ns+'}url');ET.SubElement(url,'{'+ns+'}loc').text=BASE+path
ET.indent(root);ET.ElementTree(root).write(ROOT/'sitemap.xml',encoding='utf-8',xml_declaration=True)
(ROOT/'reports/seo/content-quality.json').write_text(json.dumps(quality,indent=2)+'\n')
print(f'Built {len(records)} reviewed pages, 3 hubs; {sum(x["indexable"] for x in quality)} pass content gates.')
