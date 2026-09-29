/**
 * Curious Kaizer — Unified Cookie & Privacy Consent Manager
 * GDPR / UK GDPR / CCPA / India DPDP Compliant
 * Google Consent Mode v2 Integrated
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
            version: '2.0',
            timestamp: new Date().toISOString(),
            essential: true,
            analytics: state.analytics === true,
            marketing: state.marketing === true,
        };
        try {
            localStorage.setItem(CK_CONSENT_KEY, JSON.stringify(record));
            localStorage.setItem('ck_analytics_consent', record.analytics ? 'granted' : 'denied');
        } catch (e) {}
        
        window.dispatchEvent(new CustomEvent('ck_consent_changed', { detail: record }));
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
        if (window._ga4_loaded) return;
        window._ga4_loaded = true;

        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'denied',
            });
        }

        if (!document.querySelector(`script[src*="${CK_GA4_ID}"]`)) {
            const s = document.createElement('script');
            s.async = true;
            s.src = `https://www.googletagmanager.com/gtag/js?id=${CK_GA4_ID}`;
            document.head.appendChild(s);

            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments); }
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', CK_GA4_ID, {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
            });
        }
    }

    function denyGA4() {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
            });
        }
    }

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
    // UI Builder — Apple Glass Consent Card & Docked Pill
    // ============================================================

    function buildBanner() {
        const banner = document.createElement('div');
        banner.id = 'ck-cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie and privacy choices');
        banner.innerHTML = `
            <div class="ck-banner-card">
                <div class="ck-banner-top">
                    <div class="ck-banner-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="ck-banner-text">
                        <h3>Privacy &amp; Cookie Choices</h3>
                        <p>We use essential cookies to secure your session and optional analytics to understand visitor journeys. No marketing trackers or personal data are sold.</p>
                    </div>
                </div>
                <div class="ck-banner-actions">
                    <button id="ck-accept-all" class="ck-btn ck-btn-primary">Accept All</button>
                    <button id="ck-accept-essential" class="ck-btn ck-btn-secondary">Essential Only</button>
                    <button id="ck-open-prefs" class="ck-btn ck-btn-ghost">Customize</button>
                </div>
            </div>`;

        const style = document.createElement('style');
        style.id = 'ck-cookie-styles';
        style.textContent = `
            #ck-cookie-banner {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 999999;
                max-width: 440px;
                font-family: 'DM Sans', -apple-system, sans-serif;
                animation: ck-fade-slide 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @media (max-width: 600px) {
                #ck-cookie-banner {
                    bottom: 12px;
                    left: 12px;
                    right: 12px;
                    max-width: none;
                }
            }
            @keyframes ck-fade-slide {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .ck-banner-card {
                background: rgba(255, 255, 255, 0.94);
                backdrop-filter: blur(24px);
                -webkit-backdrop-filter: blur(24px);
                border: 1px solid rgba(0, 0, 0, 0.08);
                border-radius: 22px;
                padding: 22px 20px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 20px 50px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95);
            }
            .ck-banner-top {
                display: flex;
                gap: 14px;
                margin-bottom: 16px;
            }
            .ck-banner-icon {
                width: 38px;
                height: 38px;
                border-radius: 10px;
                background: rgba(29, 107, 243, 0.1);
                color: #1d6bf3;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                flex-shrink: 0;
            }
            .ck-banner-text h3 {
                font-family: 'DM Sans', sans-serif;
                font-size: 1rem;
                font-weight: 700;
                color: #0f172a;
                margin: 0 0 4px;
                letter-spacing: -0.015em;
            }
            .ck-banner-text p {
                font-size: 0.84rem;
                color: #475569;
                line-height: 1.5;
                margin: 0;
            }
            .ck-banner-actions {
                display: flex;
                gap: 8px;
                align-items: center;
                flex-wrap: wrap;
            }
            .ck-btn {
                font-family: 'DM Sans', sans-serif;
                font-size: 0.84rem;
                font-weight: 600;
                padding: 9px 16px;
                border-radius: 9999px;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                border: none;
            }
            .ck-btn-primary {
                background: #1d6bf3;
                color: #ffffff;
                box-shadow: 0 4px 12px rgba(29, 107, 243, 0.3);
            }
            .ck-btn-primary:hover {
                background: #1557c0;
                transform: translateY(-1px);
                box-shadow: 0 6px 18px rgba(29, 107, 243, 0.4);
            }
            .ck-btn-secondary {
                background: #f1f5f9;
                color: #334155;
                border: 1px solid rgba(0, 0, 0, 0.06);
            }
            .ck-btn-secondary:hover {
                background: #e2e8f0;
                color: #0f172a;
            }
            .ck-btn-ghost {
                background: transparent;
                color: #64748b;
                padding: 9px 12px;
            }
            .ck-btn-ghost:hover {
                color: #1d6bf3;
            }

            /* Docked Bottom-Left Floating Manage Pill */
            #ck-manage-btn {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 9999;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                color: #334155;
                border: 1px solid rgba(0, 0, 0, 0.08);
                border-radius: 9999px;
                padding: 8px 16px;
                font-size: 0.78rem;
                font-weight: 600;
                font-family: 'DM Sans', -apple-system, sans-serif;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
                cursor: pointer;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            #ck-manage-btn:hover {
                transform: translateY(-2px);
                background: #ffffff;
                color: #1d6bf3;
                border-color: rgba(29, 107, 243, 0.35);
                box-shadow: 0 8px 24px rgba(29, 107, 243, 0.16);
            }
            #ck-manage-btn i {
                color: #1d6bf3;
                font-size: 0.85rem;
            }

            /* Centered Preferences Modal with Backdrop */
            #ck-prefs-modal {
                position: fixed;
                inset: 0;
                z-index: 1000000;
                background: rgba(15, 23, 42, 0.5);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                font-family: 'DM Sans', sans-serif;
                animation: ck-fade-in 0.25s ease;
            }
            @keyframes ck-fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .ck-modal-card {
                background: #ffffff;
                border: 1px solid rgba(0, 0, 0, 0.08);
                border-radius: 24px;
                max-width: 520px;
                width: 100%;
                padding: 32px 28px;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
                position: relative;
            }
            .ck-modal-card h2 {
                font-size: 1.25rem;
                font-weight: 800;
                color: #0f172a;
                margin: 0 0 6px;
                letter-spacing: -0.02em;
            }
            .ck-modal-card p {
                font-size: 0.88rem;
                color: #64748b;
                line-height: 1.55;
                margin: 0 0 20px;
            }
            .ck-toggle-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #f1f5f9;
            }
            .ck-toggle-row:last-of-type { border-bottom: none; }
            .ck-toggle-label { font-size: 0.92rem; font-weight: 700; color: #0f172a; }
            .ck-toggle-desc { font-size: 0.8rem; color: #64748b; margin-top: 2px; }
            .ck-toggle {
                position: relative;
                width: 44px;
                height: 24px;
                flex-shrink: 0;
            }
            .ck-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
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
            .ck-toggle input:checked + .ck-slider { background: #1d6bf3; }
            .ck-toggle input:checked + .ck-slider::before { transform: translateX(20px); }
            .ck-toggle input:disabled + .ck-slider { background: #10b981; cursor: not-allowed; }
            .ck-modal-actions {
                display: flex;
                gap: 10px;
                margin-top: 24px;
            }
            .ck-save-btn {
                flex: 1;
                background: #1d6bf3;
                color: #ffffff;
                border: none;
                padding: 12px 20px;
                border-radius: 9999px;
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                font-family: inherit;
            }
            .ck-save-btn:hover { background: #1557c0; }
            .ck-close-btn {
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #e2e8f0;
                padding: 12px 20px;
                border-radius: 9999px;
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                font-family: inherit;
            }
            .ck-close-btn:hover { background: #e2e8f0; color: #0f172a; }
        `;
        if (!document.getElementById('ck-cookie-styles')) {
            document.head.appendChild(style);
        }
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
                <h2>Privacy &amp; Cookie Preferences</h2>
                <p>Manage which data you share with Curious Kaizer. Essential cookies are necessary for core security and functionality.</p>
                
                <div class="ck-toggle-row">
                    <div>
                        <div class="ck-toggle-label">Essential Storage</div>
                        <div class="ck-toggle-desc">Security, sessions, CSRF protection. Always active.</div>
                    </div>
                    <label class="ck-toggle">
                        <input type="checkbox" id="ck-essential" checked disabled>
                        <span class="ck-slider"></span>
                    </label>
                </div>

                <div class="ck-toggle-row">
                    <div>
                        <div class="ck-toggle-label">Analytics Measurement</div>
                        <div class="ck-toggle-desc">Google Analytics 4 — anonymized page visits and error tracking.</div>
                    </div>
                    <label class="ck-toggle">
                        <input type="checkbox" id="ck-analytics" ${currentState && currentState.analytics ? 'checked' : ''}>
                        <span class="ck-slider"></span>
                    </label>
                </div>

                <div class="ck-modal-actions">
                    <button id="ck-save-prefs" class="ck-save-btn">Save Choices</button>
                    <button id="ck-close-prefs" class="ck-close-btn">Cancel</button>
                </div>
            </div>`;
        return modal;
    }

    function closeBanner(banner) {
        if (banner) {
            banner.style.transition = 'opacity 0.25s, transform 0.25s';
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(15px)';
            setTimeout(() => banner.remove(), 260);
        }
    }

    function addManageButton() {
        if (document.getElementById('ck-manage-btn')) return;
        const btn = document.createElement('button');
        btn.id = 'ck-manage-btn';
        btn.innerHTML = '<i class="fas fa-shield-alt"></i><span>Privacy Choices</span>';
        btn.setAttribute('aria-label', 'Manage privacy and cookie preferences');
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

        modal.querySelector('#ck-close-prefs').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    }

    function init() {
        applyStoredConsent();

        if (!hasConsented()) {
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

            banner.querySelector('#ck-open-prefs').addEventListener('click', () => openPrefsModal());
        } else {
            addManageButton();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.CuriousKaizerConsent = {
        open: openPrefsModal,
        getState: getConsentState,
    };
})();
