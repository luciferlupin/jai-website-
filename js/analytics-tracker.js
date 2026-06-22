/**
 * Curious Kaizer Website Analytics Tracker
 * Connects directly to Supabase for serverless event tracking.
 */

(function () {
    try {
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

    // 2. Initialize Supabase Client
    let supabaseClient = null;
    try {
        if (typeof supabase !== 'undefined' && supabase.createClient) {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } else {
            console.error("Curious Kaizer Analytics: Supabase SDK is not loaded. Make sure to include the CDN script before this tracker.");
            return;
        }
    } catch (e) {
        console.error("Curious Kaizer Analytics: Failed to initialize Supabase client.", e);
        return;
    }

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

        try {
            const response = await fetch('https://freeipapi.com/api/json');
            if (response.ok) {
                const data = await response.json();
                const loc = {
                    country: data.countryName || null,
                    latitude: data.latitude || null,
                    longitude: data.longitude || null
                };
                safeSetSessionStorage('kk_analytics_location', JSON.stringify(loc));
                return loc;
            }
        } catch (e) {
            console.warn("KK Analytics Location Fetch Error:", e);
        }
        return { country: null, latitude: null, longitude: null };
    }

    // 4. Send Event to Supabase
    async function trackEvent(eventType, eventLabel = null) {
        const loc = await getSessionLocation();
        const payload = {
            session_id: getSessionId(),
            page_path: window.location.pathname || '/',
            event_type: eventType,
            event_label: eventLabel,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            country: loc.country,
            latitude: loc.latitude,
            longitude: loc.longitude
        };

        try {
            const { error } = await supabaseClient
                .from('analytics_events')
                .insert([payload]);

            if (error) {
                console.error("KK Analytics Error:", error.message);
            }
        } catch (e) {
            console.error("KK Analytics Network Error:", e);
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
