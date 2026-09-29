#!/usr/bin/env python3
"""Conservatively neutralize legacy public claims that lack repository evidence."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent

replacements = {
    "Web Design &amp; Custom Software Company in | Curious Kaizer": "Web Design &amp; Custom Software Company in Delhi | Curious Kaizer",
    "Best Website Designing Company in Delhi | Custom Web Development — Curious Kaizer": "Website Design &amp; Custom Development in Delhi — Curious Kaizer",
    "Delhi's #1 Web Development Agency": "Website &amp; Software Development in Delhi",
    "Best Web Development Company in Delhi - Curious Kaizer": "Website and Software Development in Delhi - Curious Kaizer",
    "Trusted by 50+ Entrepreneurs & Startups": "Selected products and platforms",
    "24+ Google Reviews": "Google Business Profile",
    "Clutch 5.0": "Clutch profile",
    "Verified Developer": "Company listing",
    "Verified Company": "Company profile",
    "Verified Google Business Profile": "Google Business Profile",
    '"50+ Products Shipped. $1M+ in Client Value."': '"Selected Work and Delivery Principles"',
    "50+ live products generating $1M+ in client value": "a varied portfolio of websites and business systems",
    "50+ Products": "Selected Products",
    "50+ Production Platforms": "Portfolio Platforms",
    "99.98% Fleet Reliability SLA": "Monitoring and Recovery Planning",
    "18+ States &amp; Metro Hubs": "Remote Delivery Across India",
    "All-India Deployment Footprint • 18+ States &amp; Metro Hubs": "Remote Project Delivery Across India",
    "PAN-INDIA CUSTOMER NETWORK": "INDIA PROJECT DELIVERY",
    "22+ active enterprise portals, custom CRMs & AI workflows deployed across Delhi, Gurgaon & Noida.": "Remote website and software project planning for organizations in Delhi, Gurgaon and Noida.",
    "22+ Deployments": "Delhi NCR",
    "7–10 Days Guaranteed Delivery": "Delivery window confirmed in the written scope",
    "10–14 Days Launch Guarantee": "Launch plan confirmed after catalog and integration review",
    "48h or 100% Refund": "Prototype scope confirmed in writing",
    "Working prototype in 48 hours or full refund": "Prototype deliverables confirmed in the written proposal",
    "30d Warranty &amp; Guarantee": "Support terms confirmed in writing",
    "24/7 SLA &amp; Cancel Anytime": "Support and cancellation terms confirmed in writing",
    "double conversion rates": "improve conversion journeys",
    "Award-winning web development agency": "Web development service",
    "Leading website design and development company": "Website design and development service",
    "Traditional agencies take 6 months and $80k to build a v1.": "Every project begins with scope, dependencies and release criteria.",
    "We ship production-grade digital infrastructure in 7 to 14 days.": "We confirm delivery milestones after reviewing the scope.",
    "Rapid 7 to 14 day production sprints engineered to outperform legacy agency timelines": "Milestone-based delivery planned around the approved scope and release checks",
    "Streak: <strong id=\"git-current-streak\">342 Days Active</strong>": "Activity: <strong id=\"git-current-streak\">View on GitHub</strong>",
    "Longest Streak: <strong>365 Days</strong>": "Source activity: <strong>Public GitHub profile</strong>",
    "Production Releases: <strong>140+</strong>": "Selected work: <strong>Portfolio</strong>",
    "Uptime SLA: <strong>99.98%</strong>": "Availability: <strong>Defined per hosting plan</strong>",
    "<span>Current Availability:</span>\n                            <span style=\"color: #2563eb; font-weight: 800;\">3 of 8 spots remaining</span>": "<span>Current availability:</span>\n                            <span style=\"color: #2563eb; font-weight: 800;\">Confirmed during discovery</span>",
    "We strictly limit production to 8 projects monthly to maintain our 48-hour delivery promise.": "Project timing and capacity are confirmed after the requirements review.",
    "<div class=\"wantace-stat-num\" style=\"font-size: clamp(2.8rem, 5vw, 3.6rem); font-weight: 500; color: #ffffff; line-height: 1; letter-spacing: -0.02em;\">94%</div>": "<div class=\"wantace-stat-num\" style=\"font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 500; color: #ffffff; line-height: 1; letter-spacing: -0.02em;\">Measured</div>",
    "83% client satisfaction rate": "Project outcomes reviewed against agreed criteria",
    "Under 4 Hours": "Confirmed after scope review",
    "24-48 hour turnaround": "Scheduled by priority and scope",
    "~1.5 Weeks to Launch": "Milestones confirmed in the proposal",
    "Rapid MVP development, product validation, and 14-day launch sprints": "MVP planning, product validation and milestone-based delivery",
    "Verified Profiles &amp; Ratings": "External profiles",
    "Sub-50ms INP Optimization": "Core Web Vitals optimization",
    "Sub-50ms Ultra-Fast ⚡": "Performance-focused delivery",
    "<div class=\"stat-number\">Sub-50ms ⚡</div>": "<div class=\"stat-number\">Measured performance</div>",
    "with unbeatable sub-50ms speed, maximum security, and zero database maintenance": "without requiring a runtime database, which can simplify performance, security and maintenance",
    "10x Launch Velocity": "Planned Delivery",
    "if (streakEl) streakEl.textContent = '342 Days Active';": "if (streakEl) streakEl.textContent = 'View on GitHub';",
    "We are a high-velocity software engineering studio based in Delhi, India. We eliminate bloat and compress traditional months of software development into 7–14 day rapid delivery sprints — with zero compromises on type safety, speed, or scalability.": "We are a software engineering studio based in Delhi, India. We plan websites and business systems around an approved scope, documented architecture and release checks.",
    "What makes Curious Kaizer the best website designing company in Delhi?": "How does Curious Kaizer approach website design projects in Delhi?",
    "<span style=\"font-size: 0.75rem; font-weight: 700; color: #10b981;\">94% Direct</span>": "<span style=\"font-size: 0.75rem; font-weight: 700; color: #10b981;\">Illustrative workflow</span>",
    "128 Staff <span style=\"font-size: 0.7rem; color: #10b981;\">100% Sync</span>": "Team access <span style=\"font-size: 0.7rem; color: #10b981;\">Illustrative</span>",
    "342 Orders <span style=\"font-size: 0.7rem; color: #10b981;\">18m SLA</span>": "Order queue <span style=\"font-size: 0.7rem; color: #10b981;\">Illustrative</span>",
    "$48,500 <span style=\"font-size: 0.85rem; color: #34c759; font-weight: 600;\"><i class=\"fas fa-arrow-up\"></i> +24.5%</span>": "Revenue dashboard <span style=\"font-size: 0.85rem; color: #34c759; font-weight: 600;\">Illustrative UI</span>",
    "$48,500 <span style=\"font-size: 0.75rem; color: #34c759; font-weight: 600;\"><i class=\"fas fa-arrow-up\"></i> +24.5%</span>": "Revenue dashboard <span style=\"font-size: 0.75rem; color: #34c759; font-weight: 600;\">Illustrative UI</span>",
    "250,000+": "Illustrative reach",
    "03. Sub-50ms INP Speed": "03. Core Web Vitals Review",
    "Verified 5.0 Google Reviews.": "Project scope is confirmed before work begins.",
    "premier website designing company": "website design and development studio",
    "the best website designing company": "a website design company",
    "100% Full Source Code &amp; IP Rights": "Source-code and IP terms confirmed in the proposal",
    "2–3 Weeks Sprint Delivery": "Delivery milestones confirmed after scope review",
    "About Curious Kaizer | Jai Goel — Delhi's Premier Web Engineering & AI Studio": "About Curious Kaizer and Jai Goel | Delhi",
    "Engineering & Tech Blog | AI, Web Dev, SaaS Architecture — Curious Kaizer": "Engineering and Product Guides | Curious Kaizer",
    "Curious CRM Pro | Enterprise Kanban CRM for Delhi Businesses — Curious Kaizer": "Curious CRM Pro | Workflow and Pipeline CRM",
}

for path in ROOT.glob('*.html'):
    source = path.read_text()
    if path.name in {
        'website-design-for-real-estate.html',
        'website-design-for-startups.html',
        'website-development-abu-dhabi.html',
        'website-development-london.html',
        'website-development-new-york.html',
        'blog-browser-ai-agent-automation.html',
        'blog-context-engineering-llm-apps.html',
        'blog-real-estate-operations-portal.html',
    }:
        # This older, overlapping draft is retained for review while the
        # reviewed service, industry and country pages remain canonical targets.
        source = re.sub(r'<meta name=["\']robots["\'] content=["\'][^"\']+["\']>', '<meta name="robots" content="noindex, follow">', source, count=1, flags=re.I)
    # Never retain fabricated or unverified review payloads in the public HTML,
    # even inside a disabled script block.
    source = re.sub(r'\s*<!-- Unverified legacy review data removed.*?<script[^>]*data-schema-status="disabled-unverified"[^>]*>.*?</script>', '', source, flags=re.S)
    if path.name == 'index.html':
        # These legacy blocks presented unsupported review, footprint, revenue,
        # ranking and office assertions. Remove them as units so their styling
        # and scripts cannot leave misleading remnants in the rendered page.
        source = re.sub(r'\s*<!-- Verified Authority & Ratings Trust Banner -->.*?<!-- Section Divider -->\s*<div class="apple-section-divider-wrapper".*?</div>\s*</div>', '', source, count=1, flags=re.S)
        source = re.sub(r'\s*<section class="testimonials-apple-section".*?</section>', '', source, count=1, flags=re.S)
        source = re.sub(r'\s*<!-- Social Proof & Results Section \(Full Width\) -->.*?</section>', '', source, count=1, flags=re.S)
        source = re.sub(r'\s*<!-- Pan-India Customer Network.*?<!-- Delhi NCR Studio Section -->.*?</section>', '', source, count=1, flags=re.S)
        source = re.sub(r'<p><strong>Yes!</strong> Every website we build includes advanced technical SEO:.*?</p>', '<p>Search visibility cannot be guaranteed. We implement crawlable HTML, appropriate metadata, canonical URLs, sitemaps and supported structured data, then validate the deployed site. Search Console and field performance data are used when the site owner provides access.</p>', source, count=1, flags=re.S)
        source = re.sub(r'<p>Our rapid agile workflow delivers working prototypes in <strong>48 hours</strong>.*?</p>', '<p>Delivery depends on catalog readiness, integrations, content approval and release testing. The written proposal confirms milestones after these inputs are reviewed.</p>', source, count=1, flags=re.S)
    if path.name == 'contact.html':
        source = re.sub(r'\s*<!-- Delhi NCR Studio Section -->.*?(?=<footer\b)', '', source, count=1, flags=re.S)
    for old, new in replacements.items():
        source = source.replace(old, new)
    source = source.replace('Yes!  Every website we build includes advanced technical SEO: Google Search Console verification, dynamic XML sitemaps, structured JSON-LD Schema (LocalBusiness, Organization, FAQPage, AggregateRating), OpenGraph social metadata, and sub-50ms Core Web Vitals optimization to help you rank in the top Google organic results and the Google Maps Local 3-Pack.', 'Search visibility cannot be guaranteed. We can implement crawlable HTML, appropriate metadata, canonical URLs, sitemaps and supported structured data, then validate the deployed site. Search Console and field performance data are used when the site owner provides access.')
    source = source.replace('Yes, we specialize in high-performance migrations!  We will preserve your existing URL rankings, migrate all your content and customer records, and rebuild your frontend into a sleek, blazing-fast web application with modern aesthetics and zero plugin bloat.', 'We can audit an existing WordPress or Wix site, preserve valuable URLs where appropriate, map necessary redirects and test the replacement before launch. Rankings cannot be guaranteed, and any customer-data migration requires an approved scope and access controls.')
    source = source.replace('so your site never goes down', 'with availability dependent on the selected hosting plan and providers')
    # Remove obsolete keyword and geographic hint metadata. These do not help
    # modern search engines and precise coordinates could imply a false office.
    source = re.sub(r'\s*<meta\s+name=["\'](?:keywords|search-query|search-intent|user-intent|lsi-keywords|geo\.region|geo\.placename|geo\.position|ICBM|business:contact_data:[^"\']+|revisit-after|rich-snippet|snippet)["\'][^>]*>', '', source, flags=re.I)
    path.write_text(source)
