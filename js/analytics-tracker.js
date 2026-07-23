/**
 * Curious Kaizer Website Analytics Tracker
 * Connects directly to Supabase for serverless event tracking.
 * Filters bots, automated scrapers, admin views, and local dev environments to ensure only real visitor data is recorded.
 */

(function () {
    try {
        const hostname = window.location.hostname || '';
        const port = window.location.port || '';
        const pathname = window.location.pathname || '';

        // 1. Disable tracker on localhost / loopback / local IPs / dev ports / file protocol
        const isLocal = hostname === 'localhost' || 
                        hostname === '127.0.0.1' || 
                        hostname === '0.0.0.0' ||
                        hostname === '[::1]' ||
                        hostname.startsWith('192.168.') ||
                        hostname.startsWith('10.') ||
                        hostname.startsWith('172.') ||
                        hostname.endsWith('.local') ||
                        port === '8080' ||
                        port === '3000' ||
                        port === '8000' ||
                        port === '8085' ||
                        window.location.protocol === 'file:';
        if (isLocal) {
            return;
        }

        // 2. Disable tracking on analytics dashboard pages
        if (pathname.includes('analytics.html') || pathname.includes('analytics-deploy')) {
            return;
        }

        // 3. Disable tracking for Bots, Crawlers, Automated Webdrivers & Headless Browsers
        const ua = (navigator.userAgent || '').toLowerCase();
        const isBot = navigator.webdriver ||
                      /bot|crawler|spider|headless|lighthouse|slurp|seek|python|curl|wget|bytespider|gptbot|claudebot|meta-externalagent|facebookexternalhit|yandex|baidu|pingdom|uptime|checker/i.test(ua);
        if (isBot) {
            return;
        }

        // Safe storage helpers to avoid SecurityError crashes in Safari Private Mode or blocked third-party storage on mobile
        function safeGetLocalStorage(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                return null;
            }
        }

        const memorySessionStorage = {};
        function safeGetSessionStorage(key) {
            try {
                return sessionStorage.getItem(key);
            } catch (e) {
                return memorySessionStorage[key] || null;
            }
        }
        function safeSetSessionStorage(key, value) {
            try {
                sessionStorage.setItem(key, value);
            } catch (e) {
                memorySessionStorage[key] = value;
            }
        }

        // Configuration - Fallback pattern (Global config -> LocalStorage -> Default)
        const SUPABASE_URL = window.SUPABASE_URL || safeGetLocalStorage('supabase_url') || "https://umuetoqaoaqlhelgoyfx.supabase.co";
        const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || safeGetLocalStorage('supabase_anon_key') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdWV0b3Fhb2FxbGhlbGdveWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMzk5MzcsImV4cCI6MjA5NzcxNTkzN30.PCgA5s8nlK_eadT3W4hUG9zzL_ISn5-zMqk2SRS2EuQ";

        if (!SUPABASE_URL || SUPABASE_URL === "YOUR_SUPABASE_URL" || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY") {
            return;
        }

        // Helper to get or create Session ID
        function getSessionId() {
            let sessionId = safeGetSessionStorage('kk_analytics_session_id');
            if (!sessionId) {
                sessionId = 'session_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now().toString(36);
                safeSetSessionStorage('kk_analytics_session_id', sessionId);
            }
            return sessionId;
        }

        // Helper to get location once per session
        async function getSessionLocation() {
            const cached = safeGetSessionStorage('kk_analytics_location');
            if (cached) {
                try { return JSON.parse(cached); } catch (e) {}
            }

            if (isLocal) {
                return { ipAddress: null, country: null, region: null, city: null, zipCode: null, latitude: null, longitude: null };
            }

            try {
                const response = await fetch('https://free.freeipapi.com/api/json');
                if (response.ok) {
                    const data = await response.json();
                    const loc = {
                        ipAddress: data.ipAddress || null,
                        country: data.countryName || null,
                        region: data.regionName || null,
                        city: data.cityName || null,
                        zipCode: data.zipCode || null,
                        latitude: data.latitude || null,
                        longitude: data.longitude || null
                    };
                    safeSetSessionStorage('kk_analytics_location', JSON.stringify(loc));
                    return loc;
                }
            } catch (e) {
                // Silently handle location fetch errors
            }
            return { ipAddress: null, country: null, region: null, city: null, zipCode: null, latitude: null, longitude: null };
        }

        function limitLength(str, max) {
            if (typeof str !== 'string') return str;
            return str.substring(0, max);
        }

        // Send Event to Supabase
        async function trackEvent(eventType, eventLabel = null) {
            const currentPath = window.location.pathname || '/';
            if (currentPath.includes('analytics.html') || currentPath.includes('analytics-deploy')) {
                return;
            }

            const loc = await getSessionLocation();
            const payload = {
                session_id: limitLength(getSessionId(), 100),
                page_path: limitLength(currentPath, 2048),
                page_title: limitLength(document.title || null, 500),
                event_type: limitLength(eventType, 50),
                event_label: limitLength(eventLabel, 1000),
                referrer: limitLength(document.referrer || null, 1024),
                user_agent: limitLength(navigator.userAgent, 1000),
                screen_resolution: limitLength(`${window.screen.width}x${window.screen.height}`, 50),
                language: limitLength(navigator.language || null, 50),
                ip_address: limitLength(loc.ipAddress, 45),
                country: limitLength(loc.country, 100),
                region: limitLength(loc.region, 100),
                city: limitLength(loc.city, 100),
                zip_code: limitLength(loc.zipCode, 20),
                latitude: loc.latitude,
                longitude: loc.longitude
            };

            try {
                await fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(payload)
                });
            } catch (e) {
                // Silently handle network errors
            }
        }

        // Initialize tracking
        function initTracker() {
            // Track the pageview event
            trackEvent('pageview');

            // Track click events on CTAs and interactive elements
            document.body.addEventListener('click', (event) => {
                const target = event.target.closest('a, button, [data-track]');
                if (!target) return;

                let trackThis = false;
                let label = '';

                if (target.hasAttribute('data-track')) {
                    trackThis = true;
                    label = target.getAttribute('data-track');
                } else {
                    const classes = target.className || '';
                    const id = target.id || '';
                    const rawText = (target.innerText || target.textContent || '').replace(/\s+/g, ' ').trim();
                    const text = rawText.substring(0, 60);

                    if (
                        classes.includes('cta') || 
                        classes.includes('btn') || 
                        id.includes('book') || 
                        id.includes('cta') ||
                        target.closest('.hero') || 
                        target.closest('.navbar') ||
                        target.closest('.site-header')
                    ) {
                        trackThis = true;
                        label = text ? `Click: ${text}` : `Click: ${target.tagName} (${id || classes})`;
                    }
                }

                if (trackThis) {
                    trackEvent('click', label);
                }
            });
        }

        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', initTracker);
        } else {
            initTracker();
        }
    } catch (globalError) {
        console.warn("KK Analytics tracker load failed:", globalError);
    }
})();
