-- Supabase Analytics Cleanup & Spam Protection Script
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- to delete the spam rows and secure the tables against future large payload injections.

BEGIN;

-- 1. Clean up existing spam data (removes mock test spam and rows with abnormally large labels)
DELETE FROM analytics_events_raw 
WHERE session_id LIKE 'spam_test_%' 
   OR length(event_label) > 1000;

DELETE FROM analytics_sessions 
WHERE session_id LIKE 'spam_test_%';

-- 2. Add CHECK constraints to prevent large payload injections (base64 data, files, etc.)
ALTER TABLE analytics_events_raw DROP CONSTRAINT IF EXISTS check_event_type_length;
ALTER TABLE analytics_events_raw ADD CONSTRAINT check_event_type_length 
    CHECK (length(event_type) <= 50);

ALTER TABLE analytics_events_raw DROP CONSTRAINT IF EXISTS check_event_label_length;
ALTER TABLE analytics_events_raw ADD CONSTRAINT check_event_label_length 
    CHECK (length(event_label) <= 1000);

ALTER TABLE analytics_events_raw DROP CONSTRAINT IF EXISTS check_page_path_length;
ALTER TABLE analytics_events_raw ADD CONSTRAINT check_page_path_length 
    CHECK (length(page_path) <= 2048);

ALTER TABLE analytics_events_raw DROP CONSTRAINT IF EXISTS check_page_title_length;
ALTER TABLE analytics_events_raw ADD CONSTRAINT check_page_title_length 
    CHECK (length(page_title) <= 500);

ALTER TABLE analytics_sessions DROP CONSTRAINT IF EXISTS check_user_agent_length;
ALTER TABLE analytics_sessions ADD CONSTRAINT check_user_agent_length 
    CHECK (length(user_agent) <= 1000);

ALTER TABLE analytics_sessions DROP CONSTRAINT IF EXISTS check_ip_address_length;
ALTER TABLE analytics_sessions ADD CONSTRAINT check_ip_address_length 
    CHECK (length(ip_address) <= 45);

ALTER TABLE analytics_sessions DROP CONSTRAINT IF EXISTS check_location_lengths;
ALTER TABLE analytics_sessions ADD CONSTRAINT check_location_lengths 
    CHECK (length(country) <= 100 AND length(region) <= 100 AND length(city) <= 100);

-- 3. Re-create the view with substring safeguards (ensures the dashboard client never receives massive strings)
CREATE OR REPLACE VIEW analytics_events AS
SELECT 
    e.id,
    e.session_id,
    e.created_at,
    e.event_type,
    substring(e.event_label from 1 for 1000) AS event_label,
    substring(e.page_path from 1 for 2048) AS page_path,
    substring(e.page_title from 1 for 500) AS page_title,
    substring(s.user_agent from 1 for 1000) AS user_agent,
    s.ip_address,
    s.country,
    s.region,
    s.city,
    s.zip_code,
    s.latitude,
    s.longitude,
    s.screen_resolution,
    s.language,
    s.referrer
FROM analytics_events_raw e
LEFT JOIN analytics_sessions s ON e.session_id = s.session_id;

-- 4. Re-grant select/insert permissions on the view and underlying tables
GRANT SELECT, INSERT ON analytics_events TO anon, authenticated;
GRANT SELECT, INSERT ON analytics_sessions TO anon, authenticated;
GRANT SELECT, INSERT ON analytics_events_raw TO anon, authenticated;

COMMIT;
