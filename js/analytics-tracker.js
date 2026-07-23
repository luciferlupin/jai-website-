/**
 * Curious Kaizer Website Analytics Tracker
 * Connects directly to Supabase for serverless event tracking.
 */

(function () {
    try {
        // Disable tracker on localhost / loopback / local IPs / dev ports / file protocol
        const hostname = window.location.hostname || '';
        const port = window.location.port || '';
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

        // 1. Configuration - Fallback pattern (Global config -> LocalStorage -> Placeholder)
        const SUPABASE_URL = window.SUPABASE_URL || safeGetLocalStorage('supabase_url') || "https://umuetoqaoaqlhelgoyfx.supabase.co";
        const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || safeGetLocalStorage('supabase_anon_key') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdWV0b3Fhb2FxbGhlbGdveWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMzk5MzcsImV4cCI6MjA5NzcxNTkzN30.PCgA5s8nlK_eadT3W4hUG9zzL_ISn5-zMqk2SRS2EuQ";

        // Stop if credentials are not configured yet
        if (!SUPABASE_URL || SUPABASE_URL === "YOUR_SUPABASE_URL" || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY") {
            console.warn("Curious Kaizer Analytics: Supabase credentials not found. Please set them in localStorage ('supabase_url' and 'supabase_anon_key') or hardcode them in the tracking script.");
            return;
        }

        // Supabase client initialization removed in favor of direct REST API calls

        // 3. Helper to get or create Session ID
        function getSessionId() {
            let sessionId = safeGetSessionStorage('kk_analytics_session_id');
            if (!sessionId) {
                // Generate a random ID
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

            // Skip IP API fetch on localhost
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
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

        // Helper to truncate strings safely before database insertion
        function limitLength(str, max) {
            if (typeof str !== 'string') return str;
            return str.substring(0, max);
        }

        // 4. Send Event to Supabase
        async function trackEvent(eventType, eventLabel = null) {
            const h = window.location.hostname || '';
            const p = window.location.port || '';
            const isLocal = h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0' || h === '[::1]' ||
                            h.startsWith('192.168.') || h.startsWith('10.') || h.startsWith('172.') || h.endsWith('.local') ||
                            p === '8080' || p === '3000' || p === '8000' || p === '8085' || window.location.protocol === 'file:';

            if (isLocal) {
                return;
            }

            const loc = await getSessionLocation();
            const payload = {
                session_id: limitLength(getSessionId(), 100),
                page_path: limitLength(window.location.pathname || '/', 2048),
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
                const response = await fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    // Suppress verbose error output if response fails
                    return;
                }
            } catch (e) {
                // Silently handle network errors
            }
        }

        // 5. Initialize tracking
        function initTracker() {
            // Track the pageview event
            trackEvent('pageview');

            // Track click events on important CTAs and links
            document.body.addEventListener('click', (event) => {
                // Find closest link or button to get meaningful tracking
                const target = event.target.closest('a, button, [data-track]');
                
                if (!target) return;

                // Check if it's a high-value element we want to track
                let trackThis = false;
                let label = '';

                // Explicit tracking attribute
                if (target.hasAttribute('data-track')) {
                    trackThis = true;
                    label = target.getAttribute('data-track');
                } else {
                    // Check classes or ID of the link/button
                    const classes = target.className || '';
                    const id = target.id || '';
                    const text = (target.innerText || target.textContent || '').trim().substring(0, 50);

                    // Identify if it's a CTA button
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
        console.warn("KK Analytics tracker load failed (incompatible browser):", globalError);
    }
})();
