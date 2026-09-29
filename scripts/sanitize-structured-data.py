#!/usr/bin/env python3
"""Remove unsupported local/review/FAQ claims from public JSON-LD."""
from pathlib import Path
import json, re

ROOT = Path(__file__).resolve().parent.parent

def clean(value):
    if isinstance(value, list):
        return [clean(item) for item in value]
    if not isinstance(value, dict):
        return value
    value = {key: clean(item) for key, item in value.items()}
    kind = value.get('@type')
    if kind in ('LocalBusiness', 'ProfessionalService'):
        value['@type'] = 'Organization'
    for key in ('address', 'geo', 'openingHours', 'openingHoursSpecification', 'aggregateRating', 'review', 'sameAs'):
        value.pop(key, None)
    return value

for path in ROOT.glob('*.html'):
    source = path.read_text()
    def replace(match):
        attributes, body = match.group(1), match.group(2)
        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            return match.group(0)
        kinds = payload.get('@type') if isinstance(payload, dict) else None
        if kinds in ('FAQPage', 'HowTo'):
            return ''
        payload = clean(payload)
        # Speakable is a limited publisher feature and is unsupported here.
        def strip_speakable(node):
            if isinstance(node, dict):
                node.pop('speakable', None)
                for item in node.values(): strip_speakable(item)
            elif isinstance(node, list):
                for item in node: strip_speakable(item)
        strip_speakable(payload)
        return '<script' + attributes + '>' + json.dumps(payload, ensure_ascii=False, indent=2).replace('<', '\\u003c') + '</script>'
    updated = re.sub(r'<script([^>]*type=["\']application/ld\+json["\'][^>]*)>(.*?)</script>', replace, source, flags=re.S | re.I)
    # Keep visible commercial FAQs as ordinary HTML without claiming FAQ rich
    # result eligibility.
    updated = re.sub(r'\s+itemscope(?=\s|>)', '', updated, flags=re.I)
    updated = re.sub(r'\s+itemtype=["\']https://schema\.org/(?:FAQPage|Question|Answer)["\']', '', updated, flags=re.I)
    updated = re.sub(r'\s+itemprop=["\'](?:mainEntity|acceptedAnswer|text)["\']', '', updated, flags=re.I)
    updated = updated.replace('<!-- JSON-LD LocalBusiness & ProfessionalService Schema -->', '<!-- Organization structured data -->')
    updated = updated.replace("<!-- JSON-LD HowTo Schema - Featured Snippet Targeting for 'How to make a website' -->", '<!-- Unsupported HowTo markup removed -->')
    updated = updated.replace('<!-- JSON-LD FAQ Schema -->', '<!-- FAQ content is rendered as standard HTML -->')
    path.write_text(updated)
