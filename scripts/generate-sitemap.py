#!/usr/bin/env python3
"""Generate a canonical-only sitemap from current indexable root HTML files."""
from pathlib import Path
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://www.curiouskaizer.com"
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
ET.register_namespace("", NS)
root = ET.Element(f"{{{NS}}}urlset")

for file in sorted(ROOT.glob("*.html")):
    source = file.read_text()
    if re.search(r'<meta[^>]*name=["\']robots["\'][^>]*content=["\'][^"\']*noindex', source, re.I):
        continue
    route = "/" if file.name == "index.html" else f"/{file.stem}"
    canonical = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)', source, re.I)
    if not canonical or canonical.group(1) != BASE + route:
        continue
    url = ET.SubElement(root, f"{{{NS}}}url")
    ET.SubElement(url, f"{{{NS}}}loc").text = BASE + route

ET.indent(root)
ET.ElementTree(root).write(ROOT / "sitemap.xml", encoding="utf-8", xml_declaration=True)
print(f"Wrote {len(root)} canonical indexable URLs.")
