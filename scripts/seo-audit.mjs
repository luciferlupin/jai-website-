#!/usr/bin/env node

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const htmlFiles = (await readdir(root)).filter((file) => file.endsWith('.html')).sort();
const issues = [];
const pages = [];

const strip = (value = '') => value.replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (html, pattern) => html.match(pattern)?.[1]?.trim() || '';
const urlForFile = (file) => file === 'index.html' ? '/' : `/${file.replace(/\.html$/, '')}`;
const utilityPages = new Set(['googledccfa22a0725d83d.html', 'analytics.html']);
const interactivePages = new Set(['project-planner.html']);

for (const file of htmlFiles) {
  const html = await readFile(path.join(root, file), 'utf8');
  const title = strip(attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const description = attr(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i)
    || attr(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["'][^>]*>/i);
  const canonical = attr(html, /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || attr(html, /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => strip(match[1]));
  const robots = attr(html, /<meta\s+name=["']robots["']\s+content=["']([^"']*)["'][^>]*>/i);
  const isNoindex = robots.toLowerCase().includes('noindex');
  const wordCount = strip(html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '')).split(/\s+/).filter(Boolean).length;
  const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let invalidJsonLd = 0;
  for (const block of jsonLdBlocks) {
    try { JSON.parse(block[1]); } catch { invalidJsonLd += 1; }
  }
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"'#?]+)[^"']*["'][^>]*>/gi)].map((match) => match[1]);
  const images = [...html.matchAll(/<img\b([^>]*)>/gi)].map((match) => ({
    src: attr(match[1], /\bsrc=["']([^"']+)["']/i),
    alt: attr(match[1], /\balt=["']([^"']*)["']/i),
    loading: attr(match[1], /\bloading=["']([^"']+)["']/i),
    width: attr(match[1], /\bwidth=["']([^"']+)["']/i),
    height: attr(match[1], /\bheight=["']([^"']+)["']/i),
  }));

  const pageIssues = [];
  if (!title && !utilityPages.has(file)) pageIssues.push(['critical', 'missing title']);
  if (title.length > 65 && !isNoindex) pageIssues.push(['medium', `long title (${title.length})`]);
  if (!description && !utilityPages.has(file)) pageIssues.push(['high', 'missing meta description']);
  if (description.length > 165 && !isNoindex) pageIssues.push(['low', `long meta description (${description.length})`]);
  if (!canonical && !utilityPages.has(file)) pageIssues.push(['high', 'missing canonical']);
  if (h1s.length !== 1 && !utilityPages.has(file)) pageIssues.push(['high', `${h1s.length} H1 elements`]);
  if (invalidJsonLd) pageIssues.push(['high', `${invalidJsonLd} invalid JSON-LD blocks`]);
  const missingAlt = images.filter((image) => image.alt === '').length;
  const missingDimensions = images.filter((image) => !image.width || !image.height).length;
  if (missingAlt) pageIssues.push(['medium', `${missingAlt} images with empty/missing alt`]);
  if (missingDimensions) pageIssues.push(['low', `${missingDimensions} images without explicit dimensions`]);
  if (wordCount < 250 && !isNoindex && file !== '404.html' && !utilityPages.has(file) && !interactivePages.has(file)) pageIssues.push(['medium', `thin page (${wordCount} words)`]);

  const record = { file, url: urlForFile(file), title, description, canonical, h1s, robots, wordCount, jsonLd: jsonLdBlocks.length, links, images, issues: pageIssues };
  pages.push(record);
  for (const [severity, issue] of pageIssues) issues.push({ severity, file, issue });
}

const knownPaths = new Set(pages.map((page) => page.url));
knownPaths.add('/');
// Non-HTML public resources are legitimate internal targets and should not be
// reported as broken pages.
const publicResources = new Set(['/sitemap.xml', '/robots.txt', '/llms.txt', '/site.webmanifest', '/favicon.ico']);
const incoming = new Map([...knownPaths].map((url) => [url, 0]));
for (const page of pages) {
  for (const href of page.links) {
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    let normalized = href.startsWith('/') ? href : `/${href}`;
    normalized = normalized.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (normalized === '/index') normalized = '/';
    if (incoming.has(normalized)) incoming.set(normalized, incoming.get(normalized) + 1);
    else if (!publicResources.has(normalized) && !normalized.startsWith('/images/') && !normalized.startsWith('/js/') && !normalized.startsWith('/css/')) {
      issues.push({ severity: 'high', file: page.file, issue: `broken internal target ${href}` });
    }
  }
}
for (const page of pages) {
  if (page.url !== '/' && !page.robots.toLowerCase().includes('noindex') && !utilityPages.has(page.file) && page.file !== '404.html' && incoming.get(page.url) === 0) issues.push({ severity: 'medium', file: page.file, issue: 'orphan page (no internal links)' });
}

const imageFiles = [];
async function walkImages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) await walkImages(full);
    else imageFiles.push({ path: path.relative(root, full), bytes: (await stat(full)).size });
  }
}
try { await walkImages(path.join(root, 'images')); } catch {}
const sourceImages = imageFiles.filter((image) => !image.path.startsWith('images/optimized/'));

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
issues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || a.file.localeCompare(b.file));
const summary = {
  generatedAt: new Date().toISOString(),
  root,
  totals: {
    htmlPages: pages.length,
    indexablePages: pages.filter((page) => !page.robots.toLowerCase().includes('noindex') && page.file !== '404.html' && !utilityPages.has(page.file)).length,
    issues: issues.length,
    critical: issues.filter((issue) => issue.severity === 'critical').length,
    high: issues.filter((issue) => issue.severity === 'high').length,
    medium: issues.filter((issue) => issue.severity === 'medium').length,
    low: issues.filter((issue) => issue.severity === 'low').length,
    sourceImages: sourceImages.length,
    sourceImageBytes: sourceImages.reduce((sum, image) => sum + image.bytes, 0),
    sourceImagesOver500KB: sourceImages.filter((image) => image.bytes > 500_000).length,
    optimizedVariants: imageFiles.length - sourceImages.length,
  },
  pages: pages.map(({ links, images, ...page }) => ({ ...page, imageCount: images.length, internalLinkCount: links.length, incomingLinks: incoming.get(page.url) || 0 })),
  largestSourceImages: sourceImages.sort((a, b) => b.bytes - a.bytes).slice(0, 20),
  issues,
};

console.log(JSON.stringify(summary, null, 2));
if (summary.totals.critical || summary.totals.high) process.exitCode = 1;
