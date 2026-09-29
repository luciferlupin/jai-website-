/**
 * Curious Kaizer — Cookie Consent Manager
 * GDPR / UK GDPR / CCPA / India DPDP compliant
 * Consent-first: GA4 only loads after analytics consent
 * 
 * Consent Categories:
 *   essential  — always on (security, session, CSRF)
 *   analytics  — GA4, Google Analytics
 *   marketing  — remarketing pixels (none currently active)
 * 
 * Storage: localStorage (no cookie for consent itself — privacy-first)
 * Version: 1.0 — 2026-09-29
 */

(function () {
    'use strict';

    const CK_CONSENT_KEY = 'ck_consent_v1';
    const CK_GA4_ID = 'G-9KFQ266Z1Z';

    // ============================================================
    // Consent State Management
    // ============================================================

    function getConsentState() {
        try {
            const stored = localStorage.getItem(CK_CONSENT_KEY);
            if (stored) return JSON.parse(stored);
        } catch (e) {}
        return null;
    }

    function saveConsentState(state) {
        const record = {
            version: '1.0',
            timestamp: new Date().toISOString(),
            essential: true, // always true
            analytics: state.analytics === true,
            marketing: state.marketing === true,
        };
        try {
            localStorage.setItem(CK_CONSENT_KEY, JSON.stringify(record));
        } catch (e) {}
        return record;
    }

    function hasConsented() {
        const state = getConsentState();
        return state !== null && state.timestamp;
    }

    function analyticsAllowed() {
        const state = getConsentState();
        return state && state.analytics === true;
    }

    // ============================================================
    // GA4 Loading (consent-gated)
    // ============================================================

    function loadGA4() {
        if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
            // Already in DOM — configure consent mode
            if (typeof window.gtag === 'function') {
                window.gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'denied',
                });
            }
            return;
        }
        // Load GA4 script
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${CK_GA4_ID}`;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', CK_GA4_ID, { anonymize_ip: true });
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'denied',
        });
    }

    function denyGA4() {
        // Set consent mode denied
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
            });
        }
    }

    // ============================================================
    // Apply stored consent on page load
    // ============================================================

    function applyStoredConsent() {
        const state = getConsentState();
        if (!state) return;
        if (state.analytics) {
            loadGA4();
        } else {
            denyGA4();
        }
    }

    // ============================================================
    // Cookie Banner UI
    // ============================================================

    function buildBanner() {
        const banner = document.createElement('div');
        banner.id = 'ck-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.setAttribute('aria-live', 'polite');
        banner.innerHTML = `
            <div class="ck-banner-inner">
                <div class="ck-banner-text">
                    <p>We use cookies to improve your experience. Analytics cookies help us understand how visitors use our site. 
                    <a href="/privacy" class="ck-link">Privacy Policy</a></p>
                </div>
                <div class="ck-banner-actions">
                    <button id="ck-accept-all" class="ck-btn ck-btn-primary" aria-label="Accept all cookies">Accept All</button>
                    <button id="ck-accept-essential" class="ck-btn ck-btn-secondary" aria-label="Accept essential cookies only">Essential Only</button>
                    <button id="ck-open-prefs" class="ck-btn ck-btn-ghost" aria-label="Manage cookie preferences">Manage</button>
                </div>
            </div>`;

        const style = document.createElement('style');
        style.textContent = `
            #ck-cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 99999;
                background: rgba(15, 23, 42, 0.97);
                backdrop-filter: blur(12px);
                border-top: 1px solid rgba(255,255,255,0.08);
                padding: 1rem 1.5rem;
                font-family: "DM Sans", -apple-system, sans-serif;
                animation: ck-slide-up 0.3s ease;
            }
            @keyframes ck-slide-up {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .ck-banner-inner {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1.5rem;
                flex-wrap: wrap;
            }
            .ck-banner-text p {
                color: rgba(255,255,255,0.7);
                font-size: 0.88rem;
                margin: 0;
                line-height: 1.5;
            }
            .ck-link {
                color: #60a5fa;
                text-decoration: none;
            }
            .ck-link:hover { text-decoration: underline; }
            .ck-banner-actions {
                display: flex;
                gap: 0.6rem;
                flex-shrink: 0;
                flex-wrap: wrap;
            }
            .ck-btn {
                padding: 9px 18px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.87rem;
                cursor: pointer;
                border: none;
                font-family: inherit;
                transition: all 0.15s;
                white-space: nowrap;
            }
            .ck-btn-primary {
                background: #2563eb;
                color: #fff;
            }
            .ck-btn-primary:hover { background: #1d4ed8; }
            .ck-btn-secondary {
                background: rgba(255,255,255,0.08);
                color: rgba(255,255,255,0.85);
                border: 1px solid rgba(255,255,255,0.15);
            }
            .ck-btn-secondary:hover { background: rgba(255,255,255,0.15); }
            .ck-btn-ghost {
                background: transparent;
                color: rgba(255,255,255,0.5);
                font-weight: 500;
            }
            .ck-btn-ghost:hover { color: rgba(255,255,255,0.85); }
            @media (max-width: 640px) {
                .ck-banner-inner { flex-direction: column; align-items: flex-start; }
                .ck-banner-actions { width: 100%; }
                .ck-btn { flex: 1; text-align: center; }
            }

            /* Preferences modal */
            #ck-prefs-modal {
                position: fixed;
                inset: 0;
                z-index: 100000;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                font-family: "DM Sans", -apple-system, sans-serif;
                animation: ck-fade-in 0.2s ease;
            }
            @keyframes ck-fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .ck-modal-card {
                background: #fff;
                border-radius: 16px;
                padding: 2rem;
                max-width: 480px;
                width: 100%;
                box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            }
            .ck-modal-card h2 {
                font-size: 1.1rem;
                font-weight: 700;
                color: #0f172a;
                margin: 0 0 0.5rem;
            }
            .ck-modal-card p {
                font-size: 0.88rem;
                color: #64748b;
                margin: 0 0 1.5rem;
                line-height: 1.6;
            }
            .ck-toggle-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.9rem 0;
                border-bottom: 1px solid #f1f5f9;
            }
            .ck-toggle-row:last-of-type { border-bottom: none; }
            .ck-toggle-label { font-size: 0.92rem; font-weight: 600; color: #0f172a; }
            .ck-toggle-desc { font-size: 0.8rem; color: #64748b; margin-top: 2px; }
            .ck-toggle {
                position: relative;
                width: 44px;
                height: 24px;
                flex-shrink: 0;
            }
            .ck-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
                position: absolute;
            }
            .ck-slider {
                position: absolute;
                inset: 0;
                background: #e2e8f0;
                border-radius: 24px;
                cursor: pointer;
                transition: background 0.2s;
            }
            .ck-slider::before {
                content: '';
                position: absolute;
                width: 18px;
                height: 18px;
                background: #fff;
                border-radius: 50%;
                top: 3px;
                left: 3px;
                transition: transform 0.2s;
                box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            .ck-toggle input:checked + .ck-slider { background: #2563eb; }
            .ck-toggle input:checked + .ck-slider::before { transform: translateX(20px); }
            .ck-toggle input:disabled + .ck-slider { background: #22c55e; cursor: not-allowed; }
            .ck-modal-actions {
                display: flex;
                gap: 0.8rem;
                margin-top: 1.5rem;
            }
            .ck-save-btn {
                flex: 1;
                background: #2563eb;
                color: #fff;
                border: none;
                padding: 11px 20px;
                border-radius: 9px;
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                font-family: inherit;
            }
            .ck-save-btn:hover { background: #1d4ed8; }
            .ck-close-btn {
                background: #f8fafc;
                color: #64748b;
                border: 1px solid #e2e8f0;
                padding: 11px 20px;
                border-radius: 9px;
                font-weight: 500;
                font-size: 0.9rem;
                cursor: pointer;
                font-family: inherit;
            }

            /* Floating manage button (post-consent) */
            #ck-manage-btn {
                position: fixed;
                bottom: 1rem;
                left: 1rem;
                z-index: 9998;
                background: rgba(15,23,42,0.8);
                color: rgba(255,255,255,0.5);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 6px;
                padding: 6px 10px;
                font-size: 0.72rem;
                cursor: pointer;
                font-family: "DM Sans", -apple-system, sans-serif;
                transition: all 0.2s;
            }
            #ck-manage-btn:hover { color: rgba(255,255,255,0.9); background: rgba(15,23,42,0.95); }
        `;
        document.head.appendChild(style);
        return banner;
    }

    function buildPrefsModal(currentState) {
        const modal = document.createElement('div');
        modal.id = 'ck-prefs-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Cookie preferences');
        modal.innerHTML = `
            <div class="ck-modal-card">
                <h2>Cookie Preferences</h2>
                <p>We use cookies to enhance your experience. Choose which categories you allow. Essential cookies cannot be disabled as they are required for the website to function.</p>
                
                <div class="ck-toggle-row">
                    <div>
                        <div class="ck-toggle-label">Essential Cookies</div>
                        <div class="ck-toggle-desc">Security, session management, form protection. Always active.</div>
                    </div>
                    <label class="ck-toggle">
                        <input type="checkbox" id="ck-essential" checked disabled>
                        <span class="ck-slider"></span>
                    </label>
                </div>

                <div class="ck-toggle-row">
                    <div>
                        <div class="ck-toggle-label">Analytics Cookies</div>
                        <div class="ck-toggle-desc">Google Analytics 4 (GA4) — helps us understand site usage. No personal data shared with third parties.</div>
                    </div>
                    <label class="ck-toggle">
                        <input type="checkbox" id="ck-analytics" ${currentState && currentState.analytics ? 'checked' : ''}>
                        <span class="ck-slider"></span>
                    </label>
                </div>

                <div class="ck-toggle-row">
                    <div>
                        <div class="ck-toggle-label">Marketing Cookies</div>
                        <div class="ck-toggle-desc">Advertising and remarketing. Currently not in use on this site.</div>
                    </div>
                    <label class="ck-toggle">
                        <input type="checkbox" id="ck-marketing" disabled>
                        <span class="ck-slider"></span>
                    </label>
                </div>

                <div class="ck-modal-actions">
                    <button class="ck-save-btn" id="ck-save-prefs">Save Preferences</button>
                    <button class="ck-close-btn" id="ck-close-prefs">Cancel</button>
                </div>
                <p style="margin-top:1rem;margin-bottom:0;font-size:0.78rem">
                    <a href="/privacy" style="color:#2563eb;text-decoration:none">Privacy Policy</a> · 
                    <a href="/terms" style="color:#2563eb;text-decoration:none">Terms</a>
                </p>
            </div>`;
        return modal;
    }

    function closeBanner(banner) {
        if (banner) {
            banner.style.animation = 'none';
            banner.style.transition = 'opacity 0.2s, transform 0.2s';
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(10px)';
            setTimeout(() => banner.remove(), 250);
        }
    }

    function addManageButton() {
        if (document.getElementById('ck-manage-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'ck-manage-btn';
        btn.textContent = '🍪 Cookies';
        btn.setAttribute('aria-label', 'Manage cookie preferences');
        btn.addEventListener('click', openPrefsModal);
        document.body.appendChild(btn);
    }

    function openPrefsModal() {
        if (document.getElementById('ck-prefs-modal')) return;
        const modal = buildPrefsModal(getConsentState());
        document.body.appendChild(modal);

        modal.querySelector('#ck-save-prefs').addEventListener('click', () => {
            const analytics = modal.querySelector('#ck-analytics').checked;
            const state = saveConsentState({ analytics, marketing: false });
            if (analytics) loadGA4(); else denyGA4();
            modal.remove();
            const banner = document.getElementById('ck-cookie-banner');
            if (banner) closeBanner(banner);
            addManageButton();
        });

        modal.querySelector('#ck-close-prefs').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // ============================================================
    // Init
    // ============================================================

    function init() {
        // Set default consent mode BEFORE GA4 fires (Consent Mode v2)
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = window.gtag || gtag;
        window.gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'wait_for_update': 500,
        });

        // Apply stored consent (if user has already chosen)
        if (hasConsented()) {
            applyStoredConsent();
            addManageButton();
            return;
        }

        // Show banner on DOMContentLoaded
        function showBanner() {
            const banner = buildBanner();
            document.body.appendChild(banner);

            banner.querySelector('#ck-accept-all').addEventListener('click', () => {
                saveConsentState({ analytics: true, marketing: false });
                loadGA4();
                closeBanner(banner);
                addManageButton();
            });

            banner.querySelector('#ck-accept-essential').addEventListener('click', () => {
                saveConsentState({ analytics: false, marketing: false });
                denyGA4();
                closeBanner(banner);
                addManageButton();
            });

            banner.querySelector('#ck-open-prefs').addEventListener('click', () => {
                openPrefsModal();
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showBanner);
        } else {
            showBanner();
        }
    }

    init();

})();
