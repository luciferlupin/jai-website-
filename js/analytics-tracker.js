/* Optional analytics: basic consent mode. No Google script or ping before opt-in. */
(() => {
  'use strict';
  const KEY = 'ck_privacy_v2';
  const GA = 'G-9KFQ266Z1Z';
  const hosts = ['curiouskaizer.com', 'www.curiouskaizer.com'];
  const allowed = hosts.includes(location.hostname) && !/^\/(analytics|admin)(\/|\.|$)/.test(location.pathname);
  const signalDenied = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  const get = () => { try { const c = JSON.parse(localStorage.getItem(KEY)); return c && Date.now() - c.at < 180 * 86400000 ? c.analytics : 'unset'; } catch { return 'unset'; } };
  let status = signalDenied ? 'denied' : get();
  let loaded = false;
  let pageSent = false;
  let lastFocus;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  window.gtag('consent', 'default', denied);
  window['ga-disable-' + GA] = status !== 'granted';
  const page = () => document.querySelector('link[rel="canonical"]')?.href || location.origin + location.pathname;
  const events = new Set(['page_view', 'cta_click', 'whatsapp_click', 'phone_click', 'email_click', 'form_start', 'enquiry_handoff', 'scroll_depth', 'engaged_visit', 'portfolio_view', 'case_study_view', 'service_view', 'share_click']);
  function track(name, label = '') {
    if (status !== 'granted' || !allowed || !loaded || !events.has(name)) return;
    // Labels are controlled enums/paths, never link query strings or user-entered text.
    const safeLabel = /^[a-z0-9_\/-]{0,100}$/i.test(label) ? label : '';
    window.gtag('event', name, { page_location: page(), page_referrer: '', event_label: safeLabel, send_to: GA });
  }
  function start() {
    if (status !== 'granted' || !allowed || loaded) return;
    loaded = true;
    window['ga-disable-' + GA] = false;
    window.gtag('consent', 'update', { ...denied, analytics_storage: 'granted' });
    window.gtag('js', new Date());
    let referrer = '';
    try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch { /* empty */ }
    window.gtag('config', GA, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: page(), page_referrer: referrer, cookie_expires: 15552000, cookie_update: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(script);
    if (!pageSent) { pageSent = true; track('page_view'); }
    if (/portfolio/.test(location.pathname)) track('portfolio_view');
    if (/case-study/.test(location.pathname)) track('case_study_view');
    if (/development|services/.test(location.pathname)) track('service_view');
  }
  function clearIdentifiers() {
    const domains = ['', location.hostname, '.' + location.hostname, '.curiouskaizer.com'];
    for (const entry of document.cookie.split(';')) {
      const name = entry.trim().split('=')[0];
      if (!/^(_ga|_gid|_gat)/.test(name)) continue;
      for (const domain of domains) document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
    }
    try { sessionStorage.removeItem('kk_analytics_session_id'); localStorage.removeItem('ck_analytics_consent_v1'); } catch { /* blocked storage */ }
  }
  function choose(value, persist = true) {
    const wasLoaded = loaded;
    status = signalDenied ? 'denied' : value;
    if (persist) { try { localStorage.setItem(KEY, JSON.stringify({ analytics: status, advertising: 'denied', at: Date.now() })); } catch { /* session-only choice */ } }
    window['ga-disable-' + GA] = status !== 'granted';
    if (status !== 'granted') {
      window.gtag('consent', 'update', denied);
      clearIdentifiers();
      window.dataLayer.length = 0;
    }
    document.getElementById('ck-consent-banner')?.remove();
    lastFocus?.focus();
    if (status === 'granted') start();
    // Remove already-loaded third-party listeners after withdrawal; no queued events survive.
    if (status !== 'granted' && wasLoaded) location.reload();
  }
  function show() {
    if (document.getElementById('ck-consent-banner')) return;
    lastFocus = document.activeElement;
    const panel = document.createElement('section');
    panel.id = 'ck-consent-banner';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', 'ck-consent-title');
    panel.innerHTML = '<h2 id="ck-consent-title">Your privacy choices</h2><p>Necessary storage remembers your choices. Optional Google Analytics measures visits and enquiry handoffs. Advertising is disabled. We do not send form contents or precise location.</p>' + (signalDenied ? '<p>Your browser privacy signal keeps analytics disabled.</p>' : '') + '<div><button type="button" data-choice="denied">Necessary only</button><button type="button" data-choice="granted" ' + (signalDenied ? 'disabled' : '') + '>Allow analytics</button><a href="/privacy">Privacy &amp; cookies</a><button type="button" data-close>Close</button></div>';
    panel.addEventListener('click', e => {
      const button = e.target.closest('[data-choice]');
      if (button) choose(button.dataset.choice);
      if (e.target.closest('[data-close]')) { panel.remove(); lastFocus?.focus(); }
    });
    panel.addEventListener('keydown', e => { if (e.key === 'Escape') { panel.remove(); lastFocus?.focus(); } });
    document.body.appendChild(panel);
    if (lastFocus?.id === 'ck-privacy-control') panel.querySelector('button').focus();
  }
  window.CuriousKaizerConsent = { getAnalyticsStatus: () => status, withdrawAnalytics: () => choose('denied'), open: show };
  window.CuriousKaizerAnalytics = { track };
  window.addEventListener('storage', e => { if (e.key === KEY) choose(get(), false); });
  function ready() {
    const control = document.createElement('button');
    control.id = 'ck-privacy-control'; control.type = 'button'; control.textContent = 'Privacy choices'; control.addEventListener('click', show);
    (document.querySelector('footer') || document.body).appendChild(control);
    if (status === 'unset') show();
    if (status === 'denied') clearIdentifiers();
    start();
    const started = new WeakSet();
    document.addEventListener('focusin', e => { const f = e.target.closest('form'); if (f && !started.has(f) && status === 'granted') { started.add(f); track('form_start', 'project_enquiry'); } });
    document.addEventListener('click', e => {
      const a = e.target.closest('a'); if (!a) return;
      const href = a.getAttribute('href') || '';
      if (/wa\.me|api.whatsapp.com/.test(href)) track('whatsapp_click');
      else if (href.startsWith('tel:')) track('phone_click');
      else if (href.startsWith('mailto:')) track('email_click');
      else if (/contact|portfolio|pricing/.test(href)) track('cta_click', href.split(/[?#]/)[0].replace(/\.html$/, ''));
    });
    const depths = new Set();
    window.addEventListener('scroll', () => {
      if (status !== 'granted') return;
      const height = document.documentElement.scrollHeight - innerHeight;
      if (height <= 0) return;
      const depth = Math.floor(scrollY / height * 100);
      for (const threshold of [25, 50, 75, 90]) if (depth >= threshold && !depths.has(threshold)) { depths.add(threshold); track('scroll_depth', String(threshold)); }
    }, { passive: true });
    setTimeout(() => { if (document.visibilityState === 'visible') track('engaged_visit'); }, 30000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true }); else ready();
})();
